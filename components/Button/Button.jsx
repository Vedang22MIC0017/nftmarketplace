import React from 'react';
import Style from './Button.module.css';

const Button = ({ btnName, handleClick, icon, classStyle }) => {
  return (
    <div className={Style.box}>
      <button
        className={`${Style.button} ${classStyle}`}
        onClick={(e) => handleClick(e)}
      >
        {icon} {btnName}
      </button>
    </div>
  );
};

export default Button;