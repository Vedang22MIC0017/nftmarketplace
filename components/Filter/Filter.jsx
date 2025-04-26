import React, { useState } from 'react';
import Style from './Filter.module.css';
import { FaFilter, FaAngleDown, FaAngleUp, FaWallet, FaMusic, FaVideo, FaImages, FaUserAlt } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';
import { MdVerified } from 'react-icons/md';
import { TiTick } from 'react-icons/ti';

const Filter = () => {
  const [filter, setFilter] = useState(true);
  const [showMediaFilter, setShowMediaFilter] = useState(true);
  const [showPriceFilter, setShowPriceFilter] = useState(true);
  const [showVerifiedFilter, setShowVerifiedFilter] = useState(true);
  
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [selectedMedia, setSelectedMedia] = useState({
    image: true,
    video: true,
    audio: true
  });
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const toggleMediaType = (type) => {
    setSelectedMedia(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handlePriceChange = (type, value) => {
    setPriceRange(prev => ({
      ...prev,
      [type]: Number(value)
    }));
  };

  const clearAllFilters = () => {
    setSelectedMedia({ image: true, video: true, audio: true });
    setPriceRange({ min: 0, max: 100 });
    setVerifiedOnly(false);
  };

  return (
    <div className={Style.filter}>
      <div className={Style.filter_box}>
        <div className={Style.filter_box_left}>
          <button onClick={() => setFilter(!filter)}>
            <FaFilter />
            <span>Filter</span> {filter ? <FaAngleDown /> : <FaAngleUp />}
          </button>
        </div>

        <div className={Style.filter_box_right}>
          <button onClick={clearAllFilters}>
            <AiFillCloseCircle />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      {filter && (
        <div className={Style.filter_categories}>
          {/* Media Type Filter */}
          <div className={Style.filter_category}>
            <div 
              className={Style.filter_category_title}
              onClick={() => setShowMediaFilter(!showMediaFilter)}
            >
              <h4>Media Type</h4>
              {showMediaFilter ? <FaAngleUp /> : <FaAngleDown />}
            </div>

            {showMediaFilter && (
              <div className={Style.filter_category_items}>
                <div className={`${Style.filter_category_item} ${selectedMedia.image ? Style.active : ''}`}
                  onClick={() => toggleMediaType('image')}
                >
                  <FaImages /> <span>Images</span>
                  {selectedMedia.image && <TiTick />}
                </div>

                <div className={`${Style.filter_category_item} ${selectedMedia.video ? Style.active : ''}`}
                  onClick={() => toggleMediaType('video')}
                >
                  <FaVideo /> <span>Videos</span>
                  {selectedMedia.video && <TiTick />}
                </div>

                <div className={`${Style.filter_category_item} ${selectedMedia.audio ? Style.active : ''}`}
                  onClick={() => toggleMediaType('audio')}
                >
                  <FaMusic /> <span>Audio</span>
                  {selectedMedia.audio && <TiTick />}
                </div>
              </div>
            )}
          </div>

          {/* Price Range Filter */}
          <div className={Style.filter_category}>
            <div 
              className={Style.filter_category_title}
              onClick={() => setShowPriceFilter(!showPriceFilter)}
            >
              <h4>Price Range</h4>
              {showPriceFilter ? <FaAngleUp /> : <FaAngleDown />}
            </div>

            {showPriceFilter && (
              <div className={Style.filter_category_items}>
                <div className={Style.price_range_inputs}>
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => handlePriceChange('min', e.target.value)}
                  />
                  <span>to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => handlePriceChange('max', e.target.value)}
                  />
                  <FaWallet />
                </div>
              </div>
            )}
          </div>

          {/* Verified Filter */}
          <div className={Style.filter_category}>
            <div 
              className={Style.filter_category_title}
              onClick={() => setShowVerifiedFilter(!showVerifiedFilter)}
            >
              <h4>Verification</h4>
              {showVerifiedFilter ? <FaAngleUp /> : <FaAngleDown />}
            </div>

            {showVerifiedFilter && (
              <div className={Style.filter_category_items}>
                <div 
                  className={`${Style.filter_category_item} ${verifiedOnly ? Style.active : ''}`}
                  onClick={() => setVerifiedOnly(!verifiedOnly)}
                >
                  <MdVerified /> <span>Verified Only</span>
                  {verifiedOnly && <TiTick />}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;