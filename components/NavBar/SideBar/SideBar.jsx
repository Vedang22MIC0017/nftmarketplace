import React,{useState} from 'react';
import Image from "next/image";
import Link from "next/link";
import {GrClose} from 'react-icons/gr';
import {TiSocialFacebook,TiSocialLinkedin,TiSocialInstagram,TiSocialTwitter,TiSocialYoutube,TiArrowSortedDown,TiArrowSortedUp} from "react-icons/ti";
import Style from "./SideBar.module.css";
import images from "../../../img";
import Button from "../../Button/Button";
const sideBar = ({setOpenSideMenu, openSideMenu,currentAccount,connectWallet}) => {
  const[openDiscover,setOpenDiscover]=useState(false);
  const[openhelp,setopenhelp]=useState(false);
  const discover=[
    {
      name:"Collection",
      link:"collection"
    },
    {
      name:"Search",
      link:"search"
    },
    {
      name:"Author Profile",
      link:"author-profile"
    },
    {
      name:"NFT Details",
      link:"NFT-details"
    },
    {
      name:"Account-Setting",
      link:"account-setting"
    },
    {
      name:"Connect-Wallet",
      link:"ConnectWallet"
    },
    {
      name:"Blog",
      link:"blog"
    }
  ]
  const helpcenter=[
    {
      name:"About",
      link:"about",
    },
    {
      name:"Contact Us",
      link:"contact-us",
    },
    {
      name:"Sign Up",
      link:"sign-up",
    },
    {
      name:"Sign In",
      link:"sign-in",
    },
    {
      name:"Subscription",
      link:"subscription",
    },
  ]
  const openDiscoverMenu=()=>{
    if(!openDiscover){
      setOpenDiscover(true);
    }else{
      setOpenDiscover(false);
    }
  }
  const openHelpMenu=()=>{
    if(!openhelp){
      setopenhelp(true);
    }else{
      setopenhelp(false);
    }
  }

  const closeSideBar=()=>{
    setOpenSideMenu(false);
  }

  


  return (
    <div className={`${Style.sideBar} ${openSideMenu ? Style.active : ""}`}>
      <GrClose className ={Style.sideBar_closeBtn} 
      onClick={()=>closeSideBar()}/>
      <div className={Style.sidebar_box}>
        <Image src={images.logo} alt="logo" width={150} height={150}/>
        <p>Discover new articles on NFT and share them</p>
        <div className={Style.sidebar_social}>
          <a href="#">
            <TiSocialFacebook/>
          </a>
          <a href="#">
            <TiSocialLinkedin/>
          </a>
          <a href="#">
            <TiSocialTwitter/>
          </a>
          <a href="#">
            <TiSocialYoutube/>
          </a>
          <a href="#">
            <TiSocialInstagram/>
          </a>
        </div>
      </div>
      <div className={Style.sidebar_menu}>
        <div>
          <div className={Style.sidebar_menu_box}
          onClick={()=>openDiscoverMenu()}>
            <p>Discover</p>
            <TiArrowSortedDown/>
          </div>
          {
            openDiscover &&(
              <div className={Style.sidebar_discover}>
                {discover.map((el,i)=>(
                  <p key={i+1}>
                    <Link href={{pathname: `/${el.link}`}}>{el.name}</Link>
                  </p>
                ))}
              </div>
            )
          }
        </div>
        <div>
          <div className={Style.sidebar_menu_box}
          onClick={()=>openHelpMenu()}>
            <p>Help Center</p>
            <TiArrowSortedDown/>
          </div>
          {
            openhelp &&(
              <div className={Style.sidebar_discover}>
                {helpcenter.map((el,i)=>(
                  <p key={i+1}>
                    <Link href={{pathname: `/${el.link}`}}>{el.name}</Link>
                  </p>
                ))}
              </div>
            )
          }
        </div>
      </div>


      <div className={Style.sideBar_button}>
        {
          currentAccount=="" ? (<Button btnName="connect" handleClick={()=>connectWallet()} />)
          :(
          <a href="/uploadNFT">
            <Button btnName="Create" handleClick={()=>{}}/>

          </a>
          )
        }
        <Button btnName="Connect Wallet" handleClick={() => {}}/>

      </div>
    </div>
  )
}

export default sideBar