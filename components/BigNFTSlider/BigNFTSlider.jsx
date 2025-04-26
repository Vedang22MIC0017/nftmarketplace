import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { AiFillFire, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { MdVerified, MdTimer } from 'react-icons/md';
import { TbArrowBigLeftLines, TbArrowBigRightLines } from 'react-icons/tb';
import Style from './BigNFTSlider.module.css';
import images from '../../img';
import Button from '../Button/Button';

const BigNFTSlider = () => {
  const [idNumber, setIdNumber] = useState(0);

  const sliderData = [
    {
      title: "Hello NFT",
      id: 1,
      name: "Vedang Mishrra",
      collection: "Gym",
      price: "00664 ETH",
      like: 147,
      image: images.user1,
      nftImage: images.nft_image_1,
      time: {
        days: 21,
        hours: 40,
        minutes: 81,
        seconds: 15,
      },
    },
    {
      title: "Buddy NFT",
      id: 2,
      name: "Arya Kharwadkar",
      collection: "Home",
      price: "0000004 ETH",
      like: 243,
      image: images.user2,
      nftImage: images.nft_image_2,
      time: {
        days: 77,
        hours: 11,
        minutes: 21,
        seconds: 45,
      },
    },
    {
      title: "Gym NFT",
      id: 3,
      name: "Sumit Mishra",
      collection: "GYm",
      price: "0000064 ETH",
      like: 864,
      image: images.user3,
      nftImage: images.nft_image_3,
      time: {
        days: 37,
        hours: 20,
        minutes: 11,
        seconds: 55,
      },
    },
  ];

  const inc = useCallback(() => {
    if (idNumber + 1 < sliderData.length) {
      setIdNumber(idNumber + 1);
    }
  }, [idNumber, sliderData.length]);

  const dec = useCallback(() => {
    if (idNumber > 0) {
      setIdNumber(idNumber - 1);
    }
  }, [idNumber]);

  return (
    <div className={Style.bigNFTSlider}>
      <div className={Style.bigNFTSlider_box}>
        <div className={Style.bigNFTSlider_box_left}>
          <h2>{sliderData[idNumber].title}</h2>
          <div className={Style.bigNFTSlider_box_left_creator}>
            <div className={Style.bigNFTSlider_box_left_creator_profile}>
              <Image
                className={Style.bigNFTSlider_box_left_creator_profile_img}
                src={sliderData[idNumber].image}
                alt="profile image"
                width={50}
                height={50}
              />
              <div className={Style.bigNFTSlider_box_left_creator_profile_info}>
                <p>Creator</p>
                <h4>{sliderData[idNumber].name}</h4>
              </div>
            </div>

            <div className={Style.bigNFTSlider_box_left_creator_collection}>
              <AiFillFire
                className={Style.bigNFTSlider_box_left_creator_collection_icon}
              />
              <div className={Style.bigNFTSlider_box_left_creator_collection_info}>
                <p>Collection</p>
                <h4>{sliderData[idNumber].collection}</h4>
              </div>
            </div>
          </div>

          <div className={Style.bigNFTSlider_box_left_bidding}>
            <div className={Style.bigNFTSlider_box_left_bidding_box}>
              <small>Current Bid</small>
              <p>{sliderData[idNumber].price} <span>$221,21</span></p>
            </div>

            <div className={Style.bigNFTSlider_box_left_bidding_box}>
              <small>Auction ending in</small>
              <div className={Style.bigNFTSlider_box_left_bidding_box_timer}>
                <MdTimer />
                <span>{sliderData[idNumber].time.days}d  </span>
                <span>{sliderData[idNumber].time.hours}h  </span>
                <span>{sliderData[idNumber].time.minutes}m  </span>
                <span>{sliderData[idNumber].time.seconds}s </span>
              </div>
            </div>
          </div>

          <div className={Style.bigNFTSlider_box_left_button}>
            <Button btnName="Place" handleClick={() => {}} />
            <Button btnName="View" handleClick={() => {}} />
          </div>
        </div>

        <div className={Style.bigNFTSlider_box_right}>
          <Image
            src={sliderData[idNumber].nftImage}
            alt="NFT image"
            className={Style.bigNFTSlider_box_right_img}
          />

          <div className={Style.bigNFTSlider_box_right_like}>
            <AiFillHeart />
            <span>{sliderData[idNumber].like}</span>
          </div>
        </div>
      </div>

      <div className={Style.sliderButton}>
        <TbArrowBigLeftLines
          className={Style.sliderButton_icon}
          onClick={() => dec()}
        />
        <TbArrowBigRightLines
          className={Style.sliderButton_icon}
          onClick={() => inc()}
        />
      </div>
    </div>
  );
};

export default BigNFTSlider;