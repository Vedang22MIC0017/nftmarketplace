import React, {useState, useEffect,useContext} from 'react';
import Image from "next/image";
import Link from "next/link"; 
import {MdNotifications} from 'react-icons/md';
import {BsSearch} from "react-icons/bs";
import {CgMenuRight} from "react-icons/cg";
import {BiWallet} from "react-icons/bi";

import Style from "./NavBar.module.css";
import {Discover, HelpCentre, Notification, Profile, SideBar} from './index';
import {Button} from "../componentIndex";
import images from "../../img";

import {NFTMarketPlaceContext,connectWallet} from "../../Context/NFTMarketPlaceContext";



const NavBar = () => {
  const [discover, setDiscover] = useState(false);
  const [help, setHelp] = useState(false);
  const [notification, setNotification] = useState(false);
  const [profile, setProfile] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openMenu = (e) => {
    const btnText=e.target.innerText.trim();
    if(btnText=="Discover"){
      setDiscover(!discover);
      setHelp(false);
      setNotification(false);
      setProfile(false);
    }
    else if(btnText=="HelpCentre"){
      setDiscover(false);
      setHelp(!help);
      setNotification(false);
      setProfile(false);
    }
    else{
      setDiscover(false);
      setHelp(false);
      setNotification(false);
      setProfile(false);
    }
  }

  const openNotification=()=>{
    if(!notification){
      setNotification(true);
      setDiscover(false);
      setHelp(false);
      setProfile(false);
    }
    else{
      setNotification(false);
    }
  }

  const openProfile=()=>{
    if(!profile){
      setProfile(true);
      setDiscover(false);
      setNotification(false);
      setHelp(false);
    }else{
      setProfile(false);
    }
  }

  const openSideBar =()=>{
    if(!openSideMenu){
      setOpenSideMenu(true);
    }else{
      setOpenSideMenu(false);
    }
  }

  //smart contract section 
  const{currentAccount} =useContext(NFTMarketPlaceContext);


  return (
    <div className={`${Style.navbar} ${isScrolled ? Style.scrolled : ''}`}>
      <div className={Style.navbar_container}>
        <div className={Style.navbar_container_left}>
          <Link href="/">
            <div className={Style.logo}>
              <Image 
                src={images.logo} 
                alt="NFT MARKET PLACE"
                width={100}
                height={100}
                className={Style.logo_img}
              />
            </div>
          </Link>
          <div className={Style.navbar_container_left_box_input}>
            <div className={Style.navbar_container_left_box_input_box}>
              <input type='text' placeholder="Search NFTs, collections, and accounts"/>
              <BsSearch onClick={() => {}} className={Style.search_icon}/>
            </div>
          </div>
        </div>
        <div className={Style.navbar_container_right}>
          <div className={Style.navbar_container_right_discover}>
            <p onClick={(e)=>openMenu(e)}>Discover</p>
            {discover && (
              <div className={Style.navbar_container_right_discover_box}>
                <Discover/>
              </div>
            )}


          </div>
          <div className={Style.navbar_container_right_help}>
            <p onClick={(e)=>openMenu(e)}>HelpCentre</p>
            {help &&(
              <div className={Style.navbar_container_right_help_box}>
                <HelpCentre />
              </div>
            )}
          </div>
          <div className={Style.navbar_container_right_notify}>
            <MdNotifications 
            className={Style.notify} 
            onClick={()=>openNotification()}
            />
            {notification && <Notification/>}
          </div>
          
          <div className={Style.navbar_container_right_button}>
            {currentAccount == "" ? (
              <Button btnName= "Connect" handleClick={()=>connectWallet()} />

            ):(
              <a href="/uploadNFT">
                <Button btnName="Create" handleClick={()=>{}}/>
              </a>
                
            )
          } 
            
          </div>

          {/*user profile*/}
          <div className={Style.navbar_container_right_profile_box}>
            <div className={Style.navbar_container_right_profile}>
              <Image 
                src={images.user1} 
                alt="Profile" 
                width={40} 
                height={40} 
                onClick ={()=>openProfile()}
                className={Style.navbar_container_right_profile}
              />
              {profile && <Profile/>}
            </div>
          </div>
          {/*menu button*/}
          <div className={Style.navbar_container_right_menuBtn}>
            <CgMenuRight
              className={Style.menuIcon}
              onClick={()=>openSideBar()}
            ></CgMenuRight>
          </div>
        </div>
      </div>
      {/*sidebar component mobile only*/}
      {
        openSideMenu && (
          <SideBar setOpenSideMenu={setOpenSideMenu} openSideMenu={openSideMenu} 
          currentAccount={currentAccount} 
          connectWallet={connectWallet}
          />
        )
      }
    </div>
  )
}

export default NavBar