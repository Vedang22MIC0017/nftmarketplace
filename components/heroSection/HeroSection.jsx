import React,{useState,useEffect,useContext} from 'react';
import Image from 'next/image';
import Style from './HeroSection.module.css';
import { Button } from '../componentIndex';
import images from '../../img';
//smart contract import 
import { NFTMarketPlaceContext } from '../../Context/NFTMarketPlaceContext';
const HeroSection = () => {
  const {titleData}=useContext(NFTMarketPlaceContext);
  return (
    <div className={Style.heroSection}>
      <div className={Style.heroSection_box}>
        <div className={Style.heroSection_box_left}>
          <h1 className={Style.heroSection_box_left_title}>
             {titleData}🖼️
          </h1>
          <p className={Style.heroSection_box_left_description}>
            Discover the most outstanding NFTs in all topics of life. Creative
            artwork is the future of the digital economy.
          </p>
          <div className={Style.heroSection_box_left_buttons}>
            <Button 
              btnName="Explore" 
              handleClick={() => {}} 
              classStyle={Style.button}
            />
            <Button 
              btnName="Create" 
              handleClick={() => {}} 
              classStyle={Style.button_outline}
            />
          </div>
          <div className={Style.heroSection_box_left_stats}>
            <div className={Style.heroSection_box_left_stats_box}>
              <h3>200k+</h3>
              <p>Collections</p>
            </div>
            <div className={Style.heroSection_box_left_stats_box}>
              <h3>10k+</h3>
              <p>Artists</p>
            </div>
            <div className={Style.heroSection_box_left_stats_box}>
              <h3>423k+</h3>
              <p>Community</p>
            </div>
          </div>
        </div>
        <div className={Style.heroSection_box_right}>
          <div className={Style.heroSection_box_right_image_container}>
            <div className={Style.heroSection_box_right_image}>
              <Image
                src={images.hero}
                alt="Hero section"
                width={600}
                height={600}
                className={Style.heroSection_box_right_img}
              />
            </div>
            <div className={Style.heroSection_box_right_bg_gradient}></div>
            <div className={Style.heroSection_box_right_box}>
              <div className={Style.heroSection_box_right_box_info}>
                <h3>Futuristic NFT</h3>
                <p>Current Bid</p>
                <div className={Style.heroSection_box_right_box_price}>
                  <div className={Style.heroSection_box_right_box_price_box}>
                    <small>ETH</small>
                    <p>3.45</p>
                  </div>
                  <div className={Style.heroSection_box_right_box_price_time}>
                    <small>Ending in</small>
                    <p>2h 30m 20s</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={Style.heroSection_particles}>
        <div className={Style.heroSection_particles_item}></div>
        <div className={Style.heroSection_particles_item}></div>
        <div className={Style.heroSection_particles_item}></div>
        <div className={Style.heroSection_particles_item}></div>
        <div className={Style.heroSection_particles_item}></div>
        <div className={Style.heroSection_particles_item}></div>
      </div>
    </div>
  );
};

export default HeroSection;