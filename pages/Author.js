import React from 'react';
import Style from "../styles/Author.module.css";
import { Banner } from "../collectionPage/collectionindex";
import AuthorProfileCard from "../authorpage/authorProfileCard/authorprofileCard";
import AuthorTabs from "../authorpage/authorTabs/authorTabs";
import images from "../img";

const Author = () => {
  return (
    <div className={Style.author}>
      <Banner bannerImage={images.creatorbackground2} />
      <AuthorProfileCard />
      <AuthorTabs />
    </div>
  );
};

export default Author;