import React, { useState } from 'react';
import styles from '../styles/subscription.module.css';
import Link from 'next/link';

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState('standard');

  const plans = {
    basic: {
      name: 'Basic',
      price: '9.99',
      features: [
        'Access to basic NFT drops',
        'Community forum access',
        'Email notifications',
        'Basic support'
      ]
    },
    standard: {
      name: 'Standard',
      price: '19.99',
      features: [
        'Early access to NFT drops',
        'Premium community access',
        'Monthly exclusive NFTs',
        'Priority support',
        'NFT creation tools'
      ]
    },
    premium: {
      name: 'Premium',
      price: '29.99',
      features: [
        'VIP access to all NFT drops',
        'Exclusive community events',
        'Weekly exclusive NFTs',
        '24/7 dedicated support',
        'Advanced NFT creation tools',
        'Custom profile badge'
      ]
    }
  };

  return (
    <div className={styles.subscription}>
      <div className={styles.subscription_container}>
        <div className={styles.subscription_content}>
          <h1>Choose Your Plan</h1>
          <p>Select a subscription plan that best fits your needs</p>

          <div className={styles.pricing_container}>
            {Object.entries(plans).map(([planKey, plan]) => (
              <div
                key={planKey}
                className={`${styles.pricing_card} ${selectedPlan === planKey ? styles.selected : ''}`}
                onClick={() => setSelectedPlan(planKey)}
              >
                <h2>{plan.name}</h2>
                <div className={styles.price}>
                  <span>$</span>
                  {plan.price}
                  <span>/month</span>
                </div>
                <ul className={styles.features_list}>
                  {plan.features.map((feature, index) => (
                    <li key={index}>✓ {feature}</li>
                  ))}
                </ul>
                <Link href={`/signup?plan=${planKey}`}>
                  <button className={styles.subscribe_button}>
                    {selectedPlan === planKey ? 'Get Started' : 'Select Plan'}
                  </button>
                </Link>
              </div>
            ))}
          </div>

          <div className={styles.guarantee}>
            <span>🔒</span>
            <p>30-day money-back guarantee • Cancel anytime • Secure payment</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;