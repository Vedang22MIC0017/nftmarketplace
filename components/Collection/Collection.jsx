import React, { useState } from 'react';
import Image from 'next/image';
import { BsImage } from 'react-icons/bs';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { MdVerified } from 'react-icons/md';
import styles from './Collection.module.css';
import Days from "./Days/Days";
import images from "../../img";
const Collection = () => {
  const [like, setLike] = useState(false);
  const [collections] = useState([
    {
      id: 1,
      name: 'Cyberpunk Collection',
      creator: 'Vedang',
      price: '1.25 ETH',
      image: images.creatorbackground3,
      creatorImg:images.user1,
      verified: true,
      likes: 243,
      items: 12,
    },
    {
      id: 2,
      name: 'Abstract Art',
      creator: 'CryptoArtist',
      price: '2.5 ETH',
      image: images.creatorbackground11,
      creatorImg: images.user10,
      verified: true,
      likes: 187,
      items: 8,
    },
    {
      id: 3,
      name: 'Digital Dreams',
      creator: 'NFTMaster',
      price: '0.85 ETH',
      image: images.creatorbackground4,
      creatorImg: images.user7,
      verified: false,
      likes: 156,
      items: 15,
    },
  ]);

  return (
    <div className={styles.collection_container}>
      <h2 className={styles.collection_title}>Top Collections</h2>
      <div className={styles.collection_grid}>
        {collections.map((collection) => (
          <div key={collection.id} className={styles.collection_card}>
            <div className={styles.collection_image_container}>
              <Image
                src={collection.image}
                alt={collection.name}
                width={300}
                height={300}
                className={styles.collection_image}
              />
              <div className={styles.collection_overlay}>
                <button className={styles.bid_button}>Place Bid</button>
              </div>
            </div>
            
            <div className={styles.collection_info}>
              <div className={styles.collection_header}>
                <div className={styles.creator_info}>
                  <Image
                    src={collection.creatorImg}
                    alt={collection.creator}
                    width={40}
                    height={40}
                    className={styles.creator_image}
                  />
                  <div>
                    <h3>{collection.name}</h3>
                    <p className={styles.creator_name}>
                      {collection.creator}
                      {collection.verified && (
                        <MdVerified className={styles.verified_icon} />
                      )}
                    </p>
                  </div>
                </div>
                <button
                  className={styles.like_button}
                  onClick={() => setLike(!like)}
                >
                  {like ? (
                    <AiFillHeart className={styles.heart_icon_filled} />
                  ) : (
                    <AiOutlineHeart className={styles.heart_icon} />
                  )}
                  <span>{collection.likes}</span>
                </button>
              </div>
              
              <div className={styles.collection_footer}>
                <div className={styles.price_info}>
                  <p>Price</p>
                  <h4>{collection.price}</h4>
                </div>
                <div className={styles.items_info}>
                  <p>Items</p>
                  <h4>{collection.items}</h4>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection;