import React, { useState, useEffect, createContext } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { NFTMarketplaceTrackerAddress } from './constants';
import NFTMarketplaceTracker from '../../contracts/artifacts/contracts/NFTMarketplaceTracker.sol/NFTMarketplaceTracker.json';

export const NFTMarketplaceContext = createContext();

export const NFTMarketplaceProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [error, setError] = useState('');
    const [transactionHistory, setTransactionHistory] = useState([]);

    const checkIfWalletIsConnected = async () => {
        if (!window.ethereum) return setError('Please install MetaMask');

        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length) {
            setCurrentAccount(accounts[0]);
        }
    };

    const connectWallet = async () => {
        if (!window.ethereum) return setError('Please install MetaMask');

        try {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            setCurrentAccount(accounts[0]);
        } catch (error) {
            setError('Error connecting to MetaMask');
            console.error(error);
        }
    };

    const createNFT = async (tokenURI, price) => {
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();

            const contract = new ethers.Contract(
                NFTMarketplaceTrackerAddress,
                NFTMarketplaceTracker.abi,
                signer
            );

            const listingPrice = await contract.getListingPrice();
            const transaction = await contract.createToken(tokenURI, price, {
                value: listingPrice.toString(),
            });

            await transaction.wait();
            return transaction;
        } catch (error) {
            setError('Error creating NFT');
            console.error(error);
        }
    };

    const fetchTransactionHistory = async (tokenId) => {
        try {
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = new ethers.Contract(
                NFTMarketplaceTrackerAddress,
                NFTMarketplaceTracker.abi,
                provider
            );

            const history = await contract.getItemHistory(tokenId);
            const formattedHistory = history.map(item => ({
                timestamp: new Date(item.timestamp.toNumber() * 1000).toISOString(),
                from: item.from,
                to: item.to,
                price: ethers.utils.formatEther(item.price),
                transactionType: item.transactionType,
                ipfsHash: item.ipfsHash
            }));

            setTransactionHistory(formattedHistory);
            return formattedHistory;
        } catch (error) {
            setError('Error fetching transaction history');
            console.error(error);
        }
    };

    const fetchUserTransactions = async (userAddress) => {
        try {
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = new ethers.Contract(
                NFTMarketplaceTrackerAddress,
                NFTMarketplaceTracker.abi,
                provider
            );

            const transactions = await contract.getUserTransactions(userAddress);
            return transactions;
        } catch (error) {
            setError('Error fetching user transactions');
            console.error(error);
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();

        window.ethereum?.on('accountsChanged', (accounts) => {
            if (accounts.length > 0) {
                setCurrentAccount(accounts[0]);
            } else {
                setCurrentAccount('');
            }
        });

        return () => {
            window.ethereum?.removeListener('accountsChanged', () => {});
        };
    }, []);

    return (
        <NFTMarketplaceContext.Provider
            value={{
                connectWallet,
                currentAccount,
                createNFT,
                error,
                fetchTransactionHistory,
                fetchUserTransactions,
                transactionHistory
            }}
        >
            {children}
        </NFTMarketplaceContext.Provider>
    );
};