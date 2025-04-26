import React from 'react';
import Image from 'next/image';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import Style from './authorprofileCard.module.css';
import images from '../../img';

const AuthorProfileCard = () => {
  const cardArray = [
    {
      name: 'Total NFTs',
      value: '128',
    },
    {
      name: 'Total Value',
      value: '12.4 ETH',
    },
    {
      name: 'Followers',
      value: '1.8K',
    },
  ];

  return (
    <div className={Style.authorCard}>
      <div className={Style.authorCard_box}>
        <div className={Style.authorCard_box_img}>
          <Image
            src={images.creatorbackground1}
            className={Style.authorCard_box_img_img}
            alt="NFT background"
            width={1600}
            height={300}
            style={{ objectFit: 'cover', width: '100%', height: '300px' }}
          />
        </div>

        <div className={Style.authorCard_box_profile}>
          <Image
            src={images.user1}
            alt="profile picture"
            width={150}
            height={150}
            className={Style.authorCard_box_profile_img}
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div className={Style.authorCard_box_info}>
          <h2>Vedang Mishrra</h2>
          <div className={Style.authorCard_box_info_address}>
            <span>0x2E3F...067d</span>
          </div>
          <p>
            Photographer & Digital Artist, capturing life's moments in unique NFTs.
          </p>
          <div className={Style.authorCard_box_info_social}>
            <a href="#">
              <FaFacebookF />
            </a>
            <a href="#">
              <FaTwitter />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        <div className={Style.authorCard_box_stats}>
          {cardArray.map((el, i) => (
            <div className={Style.authorCard_box_stats_box} key={i + 1}>
              <h4>{el.value}</h4>
              <p>{el.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorProfileCard;