import React from 'react'
import Image from 'next/image'
import Style from './Banner.module.css';
const Banner = ({bannerImage}) => {
  return (
    <div className={Style.banner}>
        <div className={Style.banner_img}>
            <Image src={bannerImage}
            objectFit="cover"
            alt="background"
            width={1600}
            height={600}
            />
        </div>
        <div className={Style.banner_img_mobile}>
        <Image src={bannerImage}
            objectFit="cover"
            alt="background"
            width={1600}
            height={1200}
            />
        </div>

    </div>
  )
}

export default Banner