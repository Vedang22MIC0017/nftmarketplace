import React, { useState } from 'react';
import Style from './authortabs.module.css';
import { NFTCard2 } from '../../collectionPage/collectionindex';
import images from '../../img';

const AuthorTabs = () => {
  const [activeTab, setActiveTab] = useState('Created');

  const tabList = ['Created', 'Collected', 'Liked', 'On Sale'];

  // NFT data for different tabs
  const createdNFTs = [
    { image: images.nft_image_1, name: 'Cyber Art #1', price: '1.5 ETH', likes: 243 },
    { image: images.nft_image_2, name: 'Abstract Dreams', price: '2.1 ETH', likes: 156 },
    { image: images.nft_image_3, name: 'Digital Wave', price: '0.8 ETH', likes: 189 },
    { image: images.nft_image_1, name: 'Digital Realm', price: '1.8 ETH', likes: 210 },
    { image: images.nft_image_2, name: 'Neon Future', price: '2.5 ETH', likes: 178 },
    { image: images.nft_image_3, name: 'Crypto Punk', price: '3.2 ETH', likes: 345 },
    { image: images.nft_image_1, name: 'Meta World', price: '1.2 ETH', likes: 167 },
    { image: images.nft_image_3, name: 'Virtual Reality', price: '2.8 ETH', likes: 289 }
  ];

  const collectedNFTs = [
    { image: images.nft_image_3, name: 'Collected Art #1', price: '2.3 ETH', likes: 198 },
    { image: images.nft_image_2, name: 'Collected Dreams', price: '1.7 ETH', likes: 145 },
    { image: images.nft_image_1, name: 'Digital Collection', price: '3.1 ETH', likes: 267 },
    { image: images.nft_image_2, name: 'NFT Treasure', price: '2.0 ETH', likes: 189 },
    { image: images.nft_image_3, name: 'Crypto Collection', price: '1.9 ETH', likes: 234 },
    { image: images.nft_image_1, name: 'Meta Collection', price: '2.4 ETH', likes: 178 },
    { image: images.nft_image_3, name: 'Virtual Gems', price: '1.6 ETH', likes: 156 },
    { image: images.nft_image_2, name: 'Digital Assets', price: '2.2 ETH', likes: 223 }
  ];

  const likedNFTs = [
    { image: images.nft_image_2, name: 'Favorite Art #1', price: '1.8 ETH', likes: 312 },
    { image: images.nft_image_3, name: 'Liked Creation', price: '2.5 ETH', likes: 245 },
    { image: images.nft_image_1, name: 'Heart NFT', price: '1.4 ETH', likes: 189 },
    { image: images.nft_image_2, name: 'Loved Piece', price: '3.0 ETH', likes: 278 },
    { image: images.nft_image_3, name: 'Admired Token', price: '2.1 ETH', likes: 198 },
    { image: images.nft_image_1, name: 'Cherished NFT', price: '1.9 ETH', likes: 167 },
    { image: images.nft_image_2, name: 'Favorite Token', price: '2.3 ETH', likes: 234 },
    { image: images.nft_image_3, name: 'Liked Asset', price: '1.7 ETH', likes: 189 }
  ];

  const onSaleNFTs = [
    { image: images.nft_image_3, name: 'For Sale #1', price: '2.0 ETH', likes: 178 },
    { image: images.nft_image_2, name: 'Market NFT', price: '1.5 ETH', likes: 156 },
    { image: images.nft_image_1, name: 'Available Art', price: '2.8 ETH', likes: 289 },
    { image: images.nft_image_2, name: 'Listed Token', price: '1.6 ETH', likes: 198 },
    { image: images.nft_image_3, name: 'Sale Piece', price: '3.2 ETH', likes: 267 },
    { image: images.nft_image_1, name: 'Market Item', price: '2.4 ETH', likes: 223 },
    { image: images.nft_image_2, name: 'Available NFT', price: '1.9 ETH', likes: 145 },
    { image: images.nft_image_3, name: 'Listed Art', price: '2.2 ETH', likes: 234 }
  ];

  return (
    <div className={Style.AuthorTabs}>
      <div className={Style.AuthorTabs_box}>
        <div className={Style.AuthorTabs_box_tabs}>
          {tabList.map((tab, i) => (
            <button
              key={i + 1}
              className={`${Style.AuthorTabs_box_tabs_btn} ${
                activeTab === tab ? Style.active : ''
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className={Style.AuthorTabs_box_content}>
          {activeTab === 'Created' && createdNFTs.map((nft, i) => (
            <NFTCard2 key={i + 1} NFTData={nft} />
          ))}
          {activeTab === 'Collected' && collectedNFTs.map((nft, i) => (
            <NFTCard2 key={i + 1} NFTData={nft} />
          ))}
          {activeTab === 'Liked' && likedNFTs.map((nft, i) => (
            <NFTCard2 key={i + 1} NFTData={nft} />
          ))}
          {activeTab === 'On Sale' && onSaleNFTs.map((nft, i) => (
            <NFTCard2 key={i + 1} NFTData={nft} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorTabs;