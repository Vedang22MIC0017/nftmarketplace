import React from 'react';
import Link from 'next/link';
import { RiNftLine, RiUserSearchLine, RiSettings4Line, RiWalletLine } from 'react-icons/ri';
import { BiCollection, BiSearch, BiBlog } from 'react-icons/bi';

import Style from './Discover.module.css';

const discover = () => {
  const discover = [
    {
      name: "Collection",
      link: "collection",
    },
    {
      name: "Search NFTs",
      link: "searchPage",
    },
    {
      name: "Creator Profile",
      link: "Author",
    },
    {
      name: "NFT Details",
      link: "nft-details",
    },
    {
      name: "Account Settings",
      link: "account",

    },
    {
      name:"Upload NFT",
      link:"uploadNFT",
    },
    {
      name: "Connect Wallet",
      link: "ConnectWallet",

    },
    {
      name: "NFT Blog",
      link: "blog",
    }
  ];

  return (
    <div>
      {discover.map((el,i)=>(
        <div key={i+1} className={Style.discover}>
          <Link href={{pathname: `/${el.link}`}}>{el.name}</Link>
        </div>
      ))}
    </div>
  )
   
};

export default discover;17