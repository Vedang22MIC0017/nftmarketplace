import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsImages } from 'react-icons/bs';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

import Style from '../styles/nft-details.module.css';
import images from '../img';
import { NFTMarketPlaceContext} from '../Context/NFTMarketPlaceContext';
import { ethers } from 'ethers';

const NFTDetails = () => {
  const router = useRouter();
  const { fetchNFTs, currentAccount, buyNFT } = useContext(NFTMarketPlaceContext);
  const nftInfo = router.query;
  
  const [nftData, setNftData] = useState(null);
  const [liked, setLiked] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showBidModal, setShowBidModal] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [bidError, setBidError] = useState('');

  useEffect(() => {
    const loadNFTData = async () => {
      if (nftInfo && Object.keys(nftInfo).length > 0) {
        try {
          const formattedData = {
            ...nftInfo,
            name: nftInfo.name || 'Untitled',
            description: nftInfo.description || 'No description available',
            image: nftInfo.image || '',
            seller: nftInfo.seller || 'Unknown',
            owner: nftInfo.owner || 'Unknown',
            tokenId: nftInfo.tokenId || '',
            price: typeof nftInfo.price === 'string' ? nftInfo.price : (nftInfo.price ? ethers.utils.formatEther(nftInfo.price.toString()) : '0'),
            category: nftInfo.category || 'Other',
            website: nftInfo.website || ''
          };
          setNftData(formattedData);
        } catch (error) {
          console.error('Error formatting NFT data:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    loadNFTData();
  }, [nftInfo]);


  return (
    <div className={Style.nftDetails}>
      <div className={Style.nftDetails_box}>
        {/* Left Section - NFT Image */}
        <div className={Style.nftDetails_box_left}>
          <div className={Style.nftDetails_box_left_img}>
            {loading ? (
              <div>Loading...</div>
            ) : nftData ? (
              <Image
                src={nftData.image}
                alt={nftData.name}
                width={700}
                height={800}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  maxHeight: '800px'
                }}
                className={Style.nftDetails_box_left_img_img}
              />
            ) : (
              <div>NFT not found</div>
            )}
          </div>
        </div>

        {/* Right Section - NFT Information */}
        <div className={Style.nftDetails_box_right}>
          <h1>{nftData ? nftData.name : 'Loading...'}</h1>
          
          {/* Creator Info */}
          <div className={Style.nftDetails_box_right_creator}>
            <div className={Style.nftDetails_box_right_creator_profile}>
              <Image
                src={images.user1}
                alt="Creator"
                width={50}
                height={50}
                style={{
                  borderRadius: '50%',
                  border: '2px solid #1a73e8'
                }}
                className={Style.nftDetails_box_right_creator_profile_img}
              />
              <div className={Style.nftDetails_box_right_creator_profile_info}>
                <p>Creator</p>
                <Link href={{pathname:"/Author"}}>
                <h4>{nftData ? nftData.seller : 'Loading...'}</h4>
                </Link>
              </div>
            </div>
          </div>

          {/* Price Info */}
          <div className={Style.nftDetails_box_right_price}>
            <div className={Style.nftDetails_box_right_price_box}>
              <h4>Current Price</h4>
              <div className={Style.nftDetails_box_right_price_box_info}>
                <h1>{nftData ? `${nftData.price} ETH` : 'Loading...'}</h1>
              </div>
            </div>
          </div>

          {/* Timer */}
          <div className={Style.nftDetails_box_right_timer}>
            <h3>Auction ending in:</h3>
            <div className={Style.nftDetails_box_right_timer_time}>
              <p style={{ color: '#ff3366', fontSize: '1.5rem', fontWeight: 'bold' }}>2d : 15h : 45m : 30s</p>
            </div>
          </div>

          {/* Buttons */}
          <div className={Style.nftDetails_box_right_buttons}>
            <button 
              className={Style.button}
              onClick={() => setShowBidModal(true)}
            >
              Place Bid
            </button>
            <button
              className={`${Style.button} ${Style.light}`}
              onClick={() => setLiked(!liked)}
            >
              {liked ? <AiFillHeart /> : <AiOutlineHeart />}
              <span>{liked ? '1,024' : '1,023'}</span>
            </button>
          </div>

          {/* Bid Modal */}
          {showBidModal && (
            <div className={Style.bidModal}>
              <div className={Style.bidModal_content}>
                <h3>Place Your Bid</h3>
                <input
                  type="number"
                  step="0.01"
                  value={bidAmount}
                  onChange={(e) => {
                    setBidAmount(e.target.value);
                    setBidError('');
                  }}
                  placeholder="Enter bid amount in ETH"
                  className={Style.bidInput}
                />
                {bidError && <p className={Style.error}>{bidError}</p>}
                <div className={Style.bidModal_buttons}>
                  <button
                    className={Style.button}
                    onClick={async () => {
                      if (!bidAmount || parseFloat(bidAmount) <= 0) {
                        setBidError('Please enter a valid bid amount');
                        return;
                      }
                      try {
                        await buyNFT(nftData.tokenId, bidAmount);
                        setShowBidModal(false);
                        router.push('/searchPage');
                      } catch (error) {
                        setBidError(error.message || 'Failed to place bid');
                      }
                    }}
                  >
                    Confirm Bid
                  </button>
                  <button
                    className={`${Style.button} ${Style.light}`}
                    onClick={() => setShowBidModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* History */}
          <div className={Style.nftDetails_box_right_history}>
            <div
              className={Style.nftDetails_box_right_history_header}
              onClick={() => setShowHistory(!showHistory)}
            >
              <h3>Item History</h3>
              {showHistory ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
            </div>
            
            {showHistory && (
              <div className={Style.nftDetails_box_right_history_content}>
                <div className={Style.history_item}>
                  <p>Listed by <span>Alice</span></p>
                  <p>4.5 ETH</p>
                  <p>2 hours ago</p>
                </div>
                <div className={Style.history_item}>
                  <p>Bid placed by <span>Bob</span></p>
                  <p>4.2 ETH</p>
                  <p>5 hours ago</p>
                </div>
                <div className={Style.history_item}>
                  <p>Listed by <span>Charlie</span></p>
                  <p>4.0 ETH</p>
                  <p>1 day ago</p>
                </div>
              </div>
            )}
          </div>

          {/* Properties */}
          <div className={Style.nftDetails_box_right_properties}>
            <h3>Properties</h3>
            <div className={Style.nftDetails_box_right_properties_box}>
              {nftData && (
                <>
                  <div className={Style.property_item}>
                    <p className={Style.property_type}>Category</p>
                    <p className={Style.property_value}>{nftData.category}</p>
                  </div>
                  {nftData.website && (
                    <div className={Style.property_item}>
                      <p className={Style.property_type}>Website</p>
                      <p className={Style.property_value}>
                        <a href={nftData.website} target="_blank" rel="noopener noreferrer">
                          Visit Website
                        </a>
                      </p>
                    </div>
                  )}
                  <div className={Style.property_item}>
                    <p className={Style.property_type}>Token ID</p>
                    <p className={Style.property_value}>{nftData.tokenId}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          <div className={Style.nftDetails_box_right_description}>
            <h3>Description</h3>
            <p>{nftData ? nftData.description : 'Loading...'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDetails;