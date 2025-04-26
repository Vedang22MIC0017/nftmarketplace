import React, { useState } from 'react';
import Image from 'next/image';
import { BsSearch, BsArrowRight } from 'react-icons/bs';
import Style from './searchBar.module.css';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [searchItem, setSearchItem] = useState(true);

  return (
    <div className={Style.SearchBar}>
      <div className={Style.SearchBar_box}>
        <BsSearch className={Style.SearchBar_box_icon} />
        <input 
          type="text" 
          placeholder="Search NFT" 
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <BsArrowRight className={Style.SearchBar_box_icon} />
      </div>
    </div>
  );
};

export default SearchBar;