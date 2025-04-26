import React, { useEffect, useRef } from 'react';
import Style from './Title.module.css';

const Title = ({ heading, paragraph }) => {
  const titleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          titleRef.current.classList.add(Style.animate);
        }
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  return (
    <div className={Style.title} ref={titleRef}>
      <div className={Style.title_box}>
        {heading && <h2>{heading}</h2>}
        {paragraph && <p>{paragraph}</p>}
      </div>
    </div>
  );
};

export default Title;