import React,{useEffect,useState,useContext} from 'react'
import Style from "../styles/uploadNFT.module.css";
import { UploadNFT } from '../UploadNFT/uploadNFTIndex.js';
import {NFTMarketPlaceContext} from '../Context/NFTMarketPlaceContext'
const uploadNFT = () => {
    const {uploadToIPFS,createNFT}=useContext(NFTMarketPlaceContext);
  return (
    <div className={Style.uploadNFT}>
        <div className={Style.uploadNFT_box}>
            <div className={Style.uploadNFT_box_heading}>
                <h1>Create a new NFT</h1>
                <p>You can create any NFT you want based upon your preference</p>
            </div>
            <div className={Style.uploadNFT_box_title}>
                <h2>Image, Video, Audio, 3D Items</h2>
                <p>All types of files are supported here, MAX SIZE=100MB</p>
            </div>
            <div className={Style.uploadNFT_box_form}>
                <UploadNFT uploadToIPFS={uploadToIPFS} createNFT={createNFT}/>
            </div>
        </div>
    </div>
  )
}

export default uploadNFT;