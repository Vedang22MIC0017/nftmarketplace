import React from 'react';
import Image from 'next/image';
import Form from '../account/Form/Form';
import Style from '../styles/account.module.css';
import images from '../img';

const Account = () => {
  return (
    <div className={Style.account}>
      <div className={Style.account_info}>
        <h1>Profile Settings</h1>
        <p>You can set preferred display name, create your profile URL and manage other personal settings.</p>
      </div>
      
      <div className={Style.account_box}>
        <div className={Style.account_box_img}>
          <Image
            src={images.user1}
            alt="profile image"
            width={150}
            height={150}
            className={Style.account_box_img_img}
          />
          <p className={Style.account_box_img_para}>
            Change your profile photo
          </p>
        </div>

        <Form />
      </div>
    </div>
  );
};

export default Account;