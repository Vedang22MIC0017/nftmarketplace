import React, { useState, useEffect } from 'react';
import styles from './Days.module.css';

const Days = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2024-12-31'); // Set your target date here

    const calculateTimeLeft = () => {
      const difference = targetDate - new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: 'Days', description: 'Remaining until launch' },
    { value: timeLeft.hours, label: 'Hours', description: 'Time to prepare' },
    { value: timeLeft.minutes, label: 'Minutes', description: 'Getting closer' },
    { value: timeLeft.seconds, label: 'Seconds', description: 'Every moment counts' }
  ];

  return (
    <div className={styles.days_container}>
      <h2 className={styles.days_title}>NFT Drop Countdown</h2>
      <div className={styles.days_grid}>
        {timeUnits.map((unit, index) => (
          <div key={index} className={styles.days_card}>
            <div className={styles.days_number}>
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className={styles.days_label}>{unit.label}</div>
            <p className={styles.days_description}>{unit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Days;