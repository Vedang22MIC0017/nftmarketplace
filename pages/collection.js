import React from 'react'
import Style from "../styles/collection.module.css";
import images from '../img';
import { Banner,CollectionProfile} from '../collectionPage/collectionindex';
import {Slider} from '../components/componentIndex.js';
import Filter from '../components/Filter/Filter';
import { NFTCard2 } from '../collectionPage/collectionindex';
const collection = () => {
  const collectionArray=[
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
  ];
  return (
    <div className={Style.collection}>
        <Banner bannerImage={images.creatorbackground1}/>
        <CollectionProfile NFTData={collectionArray} />
        <Filter />
        <NFTCard2 NFTData={collectionArray}/>
        <Slider />
    </div>
  )
}

export default collection