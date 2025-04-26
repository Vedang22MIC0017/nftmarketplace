import React, { useState, useEffect, useContext } from 'react';
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import Router from "next/router";
import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";

const pinataApiKey = "fe2fbdb4ad982cf2511a";
const pinataSecretApiKey = "0cc7fc4b0ef634db617ae2e45eeb609d8b97b28fda8bb7a262990030cd6dc921";



//internal import
import {NFTMarketPlaceAddress,NFTMarketPlaceABI} from "./constants";
import { Category } from '@/components/componentIndex';

const fetchContract=(signerOrProvider)=> new ethers.Contract(
    NFTMarketPlaceAddress,
    NFTMarketPlaceABI,
    signerOrProvider
);

//communication of wallet with smartcontract
const connectingWithSmartContract = async () => {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.BrowserProvider(connection);
        const signer = await provider.getSigner();
        const contract = fetchContract(signer);
        return contract;
    } catch (error) {
        console.log("Something went wrong while connecting with the contract", error);
        throw error;
    }
}

const NFTMarketPlaceContext = React.createContext();
const NFTMarketPlaceProvider = ({children}) => {
    const titleData="Discover,Collect and Sell NFT ";

    const [currentAccount,setCurrentAccount]=useState("");
    const router=useRouter();
    
    const checkIfWalletIsConnected =async()=>{
        try{
            if(!window.ethereum) return console.log("Install metamask");
            const accounts=await window.ethereum.request({method: "eth_accounts"});
            if(accounts.length){
                setCurrentAccount(accounts[0]);
            }else{
                console.log("No account found");
            }
        }catch(error){
            console.log("Something went wrong while checking for wallet connection",error);
        }
    }

    useEffect(()=>{
        checkIfWalletIsConnected();
    },[]);

    const connectWallet=async()=>{
        try{
            if(!window.ethereum) return console.log("Install metamask");
            const accounts=await window.ethereum.request({method: "eth_requestAccounts"});
            setCurrentAccount(accounts[0]);
        }catch(error){
            console.log("Something went wrong while using the connect button",error);
        }
    };

    const uploadToIPFS = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            
            const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
                headers: {
                    'pinata_api_key': pinataApiKey,
                    'pinata_secret_api_key': pinataSecretApiKey
                }
            });
            
            return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
        } catch (error) {
            console.log("Error uploading to IPFS via Pinata", error);
            throw error;
        }
    };

    const createNFT = async (formInput, fileUrl, router) => {
        try {
            const { name, description, price } = formInput;
            if (!name || !description || !price || !fileUrl) {
                throw new Error("Please fill all the fields and upload an image");
            }

            const data = JSON.stringify({
                name,
                description,
                image: fileUrl,
                attributes: [
                    {
                        trait_type: "Category",
                        value: formInput.category || "Other"
                    },
                    {
                        trait_type: "Website",
                        value: formInput.website || ""
                    }
                ]
            });

            const res = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", data, {
                headers: {
                    'Content-Type': 'application/json',
                    'pinata_api_key': pinataApiKey,
                    'pinata_secret_api_key': pinataSecretApiKey
                }
            });

            const tokenURI = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
            await createSale(tokenURI, price);
            router.push("/searchPage");
        } catch (error) {
            console.error("Error creating NFT:", error);
            throw error;
        }
    };

    const createSale = async (url, formInputPrice, isReselling, id) => {
        try {
            if (!window.ethereum) throw new Error("Please install MetaMask");
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            const price = ethers.parseUnits(formInputPrice.toString(), 'ether');
            const contract = await connectingWithSmartContract();
            const listingPrice = await contract.getlistingPrice();
            
            if (!listingPrice) throw new Error("Failed to get listing price from contract");

            const transaction = !isReselling
                ? await contract.createToken(url, price, {
                    value: listingPrice,
                })
                : await contract.reSellToken(id, price, {
                    value: listingPrice,
                });

            await transaction.wait();
            router.push("/searchPage");
        } catch (error) {
            console.error("Error in create sale function:", error);
            throw error;
        }
    };

    const fetchNFTs = async () => {
        try {
            const provider = new ethers.JsonRpcProvider("http://localhost:8545");
            const contract = fetchContract(provider);

            let data;
            try {
                data = await contract.fetchmarketItem();
            } catch (error) {
                console.log("No NFTs found or contract error:", error);
                return [];
            }

            if (!data || !Array.isArray(data) || data.length === 0) {
                console.log("No NFTs available in the marketplace");
                return [];
            }
            
            const items = await Promise.all(
                data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
                    try {
                        const tokenURI = await contract.tokenURI(tokenId);
                        const response = await axios.get(tokenURI);
                        const { image, name, description, attributes = [] } = response.data;
                        
                        const category = attributes.find(attr => attr.trait_type === "Category")?.value || "Other";
                        const website = attributes.find(attr => attr.trait_type === "Website")?.value || "";
                        
                        const price = ethers.formatUnits(
                            unformattedPrice.toString(),
                            "ether"
                        );

                        return {
                            price,
                            tokenId: tokenId.toString(),
                            seller,
                            owner,
                            image,
                            name,
                            description,
                            category,
                            website,
                            tokenURI
                        };
                    } catch (error) {
                        console.error("Error processing NFT:", error);
                        return null;
                    }
                })
            );
            const validItems = items.filter(item => item !== null);
            console.log(`Successfully fetched ${validItems.length} NFTs`);
            return validItems;
        } catch(error) {
            console.log("Error while fetching the nft", error);
            return [];
        }
    };

    useEffect(()=>{
        fetchNFTs();
    },[])

    const fetchMyNftsOrListedNfts=async(type)=>{
        try{
            const contract=await connectingWithSmartContract();
            const data=type == "fetchItemsListed"? await contract.fetchItemsListed() :
            await contract.fetchMyNFT();

            const items=await Promise.all(
                data.map(async({tokenId,seller,owner,price: unformattedPrice})=>{
                    const tokenURI=await contract.tokenURI(tokenId);
                    const{
                        data: {image,name,description},
                    }=await axios.get(tokenURI);
                    const price=ethers.utils.formatUnits(
                        unformattedPrice.toString(),
                        "ether"
                    );

                    return {
                        price,
                        tokenid: tokenId.toNumber(),
                        seller,
                        owner,
                        image,
                        name,
                        description,
                        tokenURI
                    };
                })
            )
            return items;
        }catch(error){
            console.log("Error while fetching my nfts or listed nfts",error);
        }
    };

    const buyNFT = async (tokenId, bidAmount) => {
        try {
            if (!tokenId || !bidAmount || parseFloat(bidAmount) <= 0) {
                throw new Error("Please enter a valid bid amount");
            }

            const contract = await connectingWithSmartContract();
            const priceInWei = ethers.parseUnits(bidAmount.toString(), "ether");
            const transaction = await contract.createMarketSale(tokenId, {
                value: priceInWei,
            });

            await transaction.wait();
            return true;
        } catch (error) {
            console.error("Error while buying NFT:", error);
            throw error;
        }
    }

    return (
        <NFTMarketPlaceContext.Provider value={{
            checkIfWalletIsConnected,
            connectWallet,
            uploadToIPFS,
            createNFT,
            fetchNFTs,
            fetchMyNftsOrListedNfts,
            buyNFT,
            currentAccount,
            titleData
        }}>
            {children}
        </NFTMarketPlaceContext.Provider>
    )
}

export { NFTMarketPlaceContext, NFTMarketPlaceProvider }