import React, { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { TiSocialFacebook, TiSocialLinkedin, TiSocialInstagram, TiSocialTwitter, TiSocialYoutube } from "react-icons/ti";
import { RiSendPlaneFill, RiArrowRightSLine } from 'react-icons/ri';
import { MdOutlineEmail } from 'react-icons/md';
import { FaDiscord, FaTelegramPlane } from 'react-icons/fa';
import Style from "./Footer.module.css";
import images from '../../img';
import { Discover, HelpCentre } from "../NavBar/index";

const Footer = () => {
  const [activeBtn, setActiveBtn] = useState(1);
  const [emailValue, setEmailValue] = useState("");

  const handleEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const handleSubscribe = () => {
    if (emailValue) {
      // Handle subscription logic here
      alert(`Subscribed with email: ${emailValue}`);
      setEmailValue("");
    }
  };

  return (
    <div className={Style.footer}>
      <div className={Style.footer_container}>
        {/* FOOTER TOP SECTION */}
        <div className={Style.footer_top}>
          <div className={Style.footer_box_info}>
            <div className={Style.footer_logo}>
              <Image src={images.logo} alt="footer logo" height={100} width={100} />
            </div>
            <p>
              The world's first and largest digital marketplace for crypto collectibles and NFTs.
              Buy, sell, and discover exclusive digital items.
            </p>
            <div className={Style.footer_social}>
              <a href="#" className={Style.footer_social_icon}>
                <TiSocialFacebook />
              </a>
              <a href="#" className={Style.footer_social_icon}>
                <TiSocialLinkedin />
              </a>
              <a href="#" className={Style.footer_social_icon}>
                <TiSocialInstagram />
              </a>
              <a href="#" className={Style.footer_social_icon}>
                <TiSocialYoutube />
              </a>
              <a href="#" className={Style.footer_social_icon}>
                <TiSocialTwitter />
              </a>
              <a href="#" className={Style.footer_social_icon}>
                <FaDiscord />
              </a>
              <a href="#" className={Style.footer_social_icon}>
                <FaTelegramPlane />
              </a>
            </div>
          </div>

          {/* DISCOVER SECTION */}
          <div className={Style.footer_box_discover}>
            <h3>Discover</h3>
            <div className={Style.footer_box_discover_box}>
              <Discover />
            </div>
          </div>

          {/* HELP CENTER SECTION */}
          <div className={Style.footer_box_help}>
            <h3>Help Center</h3>
            <div className={Style.footer_box_help_box}>
              <HelpCentre isFooter={true} />
            </div>
          </div>

          {/* SUBSCRIBE SECTION */}
          <div className={Style.footer_box_subscribe}>
            <h3>Subscribe</h3>
            <div className={Style.footer_box_subscribe_box}>
              <p>Get the latest NFT updates</p>
              <div className={Style.footer_box_subscribe_input}>
                <MdOutlineEmail className={Style.subscribe_icon} />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={emailValue}
                  onChange={handleEmailChange}
                />
                <RiSendPlaneFill 
                  className={Style.subscribe_btn} 
                  onClick={handleSubscribe}
                />
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER BOTTOM SECTION */}
        <div className={Style.footer_bottom}>
          <div className={Style.footer_bottom_box}>
            <div className={Style.footer_bottom_links}>
              <Link href="/terms">Terms</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/security">Security</Link>
            </div>
            <div className={Style.footer_bottom_copyright}>
              <p>© 2025 NFT Marketplace. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;