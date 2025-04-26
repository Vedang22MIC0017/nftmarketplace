import React from 'react';
import Style from './SearchHistory.module.css';
import { MdHistory, MdClose } from 'react-icons/md';

const SearchHistory = ({ history = [], onHistoryItemClick, onClearHistory }) => {
  if (history.length === 0) return null;

  return (
    <div className={Style.searchHistory}>
      <div className={Style.header}>
        <h4><MdHistory /> Recent Searches</h4>
        <button onClick={onClearHistory} className={Style.clearButton}>
          Clear All
        </button>
      </div>
      <div className={Style.historyList}>
        {history.map((item, index) => (
          <div key={index} className={Style.historyItem}>
            <span onClick={() => onHistoryItemClick(item)}>{item}</span>
            <MdClose
              className={Style.removeIcon}
              onClick={() => onClearHistory(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;