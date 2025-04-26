import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './Category.module.css';
import images from '../../img';

const categories = [
  { id: 1, name: 'Art', image: images.creatorbackground1 },
  { id: 2, name: 'Music', image: images.creatorbackground2 },
  { id: 3, name: 'Gaming', image: images.creatorbackground3 },
  { id: 4, name: 'Photography', image: images.creatorbackground4 },
  { id: 5, name: 'Virtual Worlds', image: images.creatorbackground7 },
  { id: 6, name: 'Collectibles', image: images.creatorbackground10 },
];

const Category = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sliderRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % categories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.category_container}>
      <div className={styles.category_title}>
        <h2>Browse by Category</h2>
        <p>Explore the NFTs in the most featured categories.</p>
      </div>

      <div
        className={styles.category_slider}
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {categories.map((category, index) => (
          <div
            key={category.id}
            className={`${styles.category_card} ${index === activeIndex ? styles.active : ''}`}
          >
            <div className={styles.category_image_container}>
              <Image
                src={category.image}
                alt={category.name}
                width={280}
                height={280}
                className={styles.category_image}
              />
              <div className={styles.category_overlay}>
                <h3>{category.name}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.category_indicators}>
        {categories.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${index === activeIndex ? styles.active : ''}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Category;