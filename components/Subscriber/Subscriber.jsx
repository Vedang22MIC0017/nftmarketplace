import React, { useState } from 'react';
import styles from './Subscriber.module.css';
import Image from 'next/image';
import images from '../../img';

const Subscriber = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle subscription logic here
        console.log('Subscribing email:', email);
        setEmail('');
    };

    return (
        <div className={`${styles.subscriber} ${styles.animate}`}>
            <div className={styles.subscriber_container}>
                <div className={styles.subscriber_grid}>
                    <div className={styles.subscriber_content}>
                    <h2>Never miss a drop</h2>
                    <p>Subscribe to our super-exclusive drop list and be the first to know about upcoming drops</p>
                    
                    <div className={styles.benefits}>
                        <div className={styles.benefit_item}>
                            <span className={styles.benefit_number}>01</span>
                            <span>Get more discount</span>
                        </div>
                        <div className={styles.benefit_item}>
                            <span className={styles.benefit_number}>02</span>
                            <span>Get premium magazines</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.subscribe_form}>
                        <div className={styles.input_group}>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                            <button type="submit">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5 12H19M19 12L12 5M19 12L12 19"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>
                    </form>
                    </div>
                    <div className={styles.subscriber_right}>
                        <Image
                            src={images.update}
                            alt="Subscribe"
                            className={styles.subscriber_image}
                            width={400}
                            height={400}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subscriber;