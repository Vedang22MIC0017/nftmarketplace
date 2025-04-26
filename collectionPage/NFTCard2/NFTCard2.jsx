import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { BsImage } from 'react-icons/bs';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { MdVerified, MdTimer } from 'react-icons/md';
import { LikeProfile } from '../../components/componentIndex';
import Style from './NFTCard2.module.css';
import { NFTMarketPlaceContext } from '../../Context/NFTMarketPlaceContext';
import { ethers } from 'ethers';
import Link from 'next/link';

const NFTCard2 = ({NFTData}) => {
  const { fetchMyNftsOrListedNfts, currentAccount } = useContext(NFTMarketPlaceContext);
  const [nftArray, setNftArray] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentAccount) {
      loadUserNFTs();
    }
  }, [currentAccount]);

  const loadUserNFTs = async () => {
    try {
      setLoading(true);
      const items = await fetchMyNftsOrListedNfts("fetchNFTs");
      setNftArray(items || []);
    } catch (error) {
      console.error("Error loading NFTs:", error);
      setNftArray([]);
    } finally {
      setLoading(false);
    }
  };
  
  // Initialize like states for each NFT
  const [likes, setLikes] = useState(new Array(nftArray.length).fill(false));
  const [likeCounts, setLikeCounts] = useState(
    nftArray.map(nft => nft?.likes || Math.floor(Math.random() * 300) + 50)
  );

  useEffect(() => {
    // Update states when NFTData changes
    setLikes(new Array(nftArray.length).fill(false));
    setLikeCounts(nftArray.map(nft => nft?.likes || Math.floor(Math.random() * 300) + 50));
  }, [nftArray.length]);

  const likeNFT = (index) => {
    const updatedLikes = [...likes];
    const updatedCounts = [...likeCounts];

    updatedLikes[index] = !updatedLikes[index];
    updatedCounts[index] += updatedLikes[index] ? 1 : -1;

    setLikes(updatedLikes);
    setLikeCounts(updatedCounts);
  };

  return (
    <div className={Style.NFTCard2}>
      {loading ? (
        <p>Loading your NFTs...</p>
      ) : NFTData.length === 0 ? (
        <p>No NFTs found in your collection</p>
      ) : NFTData.map((el, i) => (
        <Link href={{pathname:"/nft-details",query: el}} key={i+1}>
        <div className={Style.NFTCard2_box} key={i} style={{ cursor: 'pointer' }}>
          <div className={Style.NFTCard2_box_like}>
            <div className={Style.NFTCard2_box_like_box}>
              <div className={Style.NFTCard2_box_like_box_box}>
                <BsImage className={Style.NFTCard2_box_like_box_box_icon} />
                <p onClick={() => likeNFT(i)}>
                  {likes[i] ? <AiFillHeart /> : <AiOutlineHeart />}
                  <span>{likeCounts[i]}</span>
                </p>
              </div>
            </div>
          </div>

          <div className={Style.NFTCard2_box_img}>
            <Image
              src={el.image}
              alt="NFT"
              width={500}
              height={500}
              style={{ objectFit: 'cover' }}
              className={Style.NFTCard2_box_img_img}
            />
          </div>

          <div className={Style.NFTCard2_box_info}>
            <div className={Style.NFTCard2_box_info_left}>
              <LikeProfile />
              <p>{el.name}</p>
              {el.category && <small className={Style.NFTCard2_box_info_category}>{el.category}</small>}
            </div>
            <small>{likeCounts[i]} likes</small>
          </div>

          <div className={Style.NFTCard2_box_price}>
            <div className={Style.NFTCard2_box_price_box}>
              <small>Price</small>
              <p>{el.price} ETH</p>
            </div>
            {el.website && (
              <a 
                href={el.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className={Style.NFTCard2_box_website}
              >
                View Website
              </a>
            )}
          </div>
        </div>
        </Link>
      ))}
    </div>
  );
};

export default NFTCard2;