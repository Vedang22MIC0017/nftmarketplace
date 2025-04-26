import React from 'react'
import Image from 'next/image';
import images from "../../img";
import Style from "./Video.module.css";
const Video = () => {
  return (
    <div className={Style.Video}>
        <div className={Style.Video_box}>
            <h1><span></span> The Video</h1>
            <p>Checkout the most trending videos on your beloved topic</p>
            <div className={Style.Video_box_frame}>
                <div className={Style.Video_box_frame_left}>
                    <Image src={images.creatorbackground8}
                    className={Style.Video_box_frame_left_img}
                    alt="Video image"
                    width={1930}
                    height={1080}
                    objectFit="cover"/>
                </div>
                <div className={Style.Video_box_frame_right}>Hey</div>
            </div>
        </div>

    </div>
  )
}

export default Video