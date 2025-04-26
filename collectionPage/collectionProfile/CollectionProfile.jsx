import React from 'react'
import Images from "next/image";
import Style from "./collectionProfile.module.css";
import {TiSocialFacebook,TiSocialLinkedin,TiSocialInstagram,TiSocialTwitter,TiSocialYoutube} from "react-icons/ti";
import images from '../../img';
const collectionProfile = () => {
    const cardArray=[1,2,3,4];
  return (
    <div className={Style.collectionProfile}>
        <div className={Style.collectionProfile_box}>
            <div classname={Style.collectionProfile_box_left}>
                <Images src={images.nft_image_1}
                alt="nft image"
                width={800}
                height={800}
                classname={Style.collectionProfile_box_left_img}
                />
                <div className={Style.collectionProfile_box_left_social}>
                    <a href='#'>
                        <TiSocialFacebook/>
                    </a>
                    <a href='#'>
                        <TiSocialInstagram/>
                    </a>
                    <a href='#'>
                        <TiSocialYoutube/>
                    </a>
                    <a href='#'>
                        <TiSocialTwitter/>
                    </a>
                    <a href='#'>
                        <TiSocialLinkedin/>
                    </a>
                </div>
            </div>
            <div className={Style.collectionProfile_box_middle}>
                <h1>Awesome NFTs Collections</h1>
                <p>Tattooed Kitty Gang (“TKG”) is a collection of 666 badass kitty gangsters, with symbol of tattoos, living in the Proud Kitty Gang (“PKG”) metaverse. Each TKG is an 1/1 ID as gangster member & all the joint rights.</p>
                <div className={Style.collectionProfile_box_middle_box}>
                    {cardArray.map((el,i)=>(
                        <div className={Style.collectionProfile_box_middle_box_item} key={i+1}>
                            <small>Floor Price</small>
                            <p>${i+1}75,432</p>
                            <span>+ {i+2}.11%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default collectionProfile