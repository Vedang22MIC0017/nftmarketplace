import React from 'react';
import { ConnectWallet } from '../components/componentIndex';
import Style from '../styles/connectWallet.module.css';

const connectWallet = () => {
  return (
    <div className={Style.connectWallet_page}>
      <div className={Style.connectWallet_page_box}>
        <ConnectWallet />
      </div>
    </div>
  );
};

export default connectWallet;