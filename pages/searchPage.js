import React, { useState, useEffect ,useContext} from 'react';
import { Slider } from '../components/componentIndex';
import SearchBar from '../searchPage/searchBar/SearchBar';
import Style from "../styles/searchPage.module.css";
import { Filter } from '../components/componentIndex';
import { NFTCard2, Banner } from '../collectionPage/collectionindex';
import images from '../img';
import AdvancedFilter from '../searchPage/AdvancedFilter/AdvancedFilter';
import SearchHistory from '../searchPage/SearchHistory/SearchHistory';


import {NFTMarketPlaceContext} from "../Context/NFTMarketPlaceContext";




const searchPage = () => {
  const {fetchNFTs}=useContext(NFTMarketPlaceContext);
  const[nfts,setNfts]=useState([]);
  const [nftsCopy,setNftsCopy]=useState([]);

  useEffect(() => {
    fetchNFTs().then((items) => {
      if (items && items.length > 0) {
        const reversedItems = [...items].reverse();
        setNfts(reversedItems);
        setNftsCopy(items);
      } else {
        setNfts([]);
        setNftsCopy([]);
      }
    }).catch(error => {
      console.error('Error fetching NFTs:', error);
      setNfts([]);
      setNftsCopy([]);
    });
  }, []);

  const [searchResults, setSearchResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleSearch = (query) => {
    if (query.trim()) {
      const newHistory = [query, ...searchHistory.filter(item => item !== query)].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    }
  };

  const handleHistoryItemClick = (query) => {
    // Implement search functionality with the selected query
    handleSearch(query);
  };

  const handleClearHistory = (index) => {
    if (typeof index === 'number') {
      const newHistory = searchHistory.filter((_, i) => i !== index);
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    } else {
      setSearchHistory([]);
      localStorage.removeItem('searchHistory');
    }
  };

  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.creatorbackground2}/>
      <SearchBar onSearch={handleSearch} />
      <SearchHistory
        history={searchHistory}
        onHistoryItemClick={handleHistoryItemClick}
        onClearHistory={handleClearHistory}
      />
      <AdvancedFilter />
      <Filter/>
      <NFTCard2 NFTData={nfts} />
      <Slider/>
      
      
    </div>
  )
}

export default searchPage