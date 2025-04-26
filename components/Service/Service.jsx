import React from 'react';
import Image from 'next/image';
import Style from './Service.module.css';
import images from '../../img/index';

const ServiceCard = ({ step, title, description, image }) => {
  return (
    <div className={Style.service_card}>
      <div className={Style.service_card_image_container}>
        <Image
          src={image}
          alt={title}
          width={100}
          height={100}
          className={Style.service_card_image}
        />
      </div>
      <div className={Style.service_card_step}>
        <span>Step {step}</span>
      </div>
      <h3 className={Style.service_card_title}>{title}</h3>
      <p className={Style.service_card_description}>{description}</p>
    </div>
  );
};

const Service = () => {
  const serviceData = [
    {
      step: 1,
      title: 'Filter & Discover',
      description: 'Connect with wallet, discover, buy NFTs, sell your NFTs and earn money',
      image: images.service1,
    },
    {
      step: 2,
      title: 'Connect wallet',
      description: 'Connect with wallet, discover, buy NFTs, sell your NFTs and earn money',
      image: images.service2,
    },
    {
      step: 3,
      title: 'Start trading',
      description: 'Connect with wallet, discover, buy NFTs, sell your NFTs and earn money',
      image: images.service3,
    },
    {
      step: 4,
      title: 'Earn money',
      description: 'Connect with wallet, discover, buy NFTs, sell your NFTs and earn money',
      image: images.service4,
    },
  ];

  return (
    <div className={Style.service}>
      <div className={Style.service_container}>
        <div className={Style.service_title_container}>
          <h2 className={Style.service_title}>How It Works</h2>
          <p className={Style.service_description}>
            Find out how to get started with our NFT marketplace
          </p>
        </div>

        <div className={Style.service_cards_container}>
          {serviceData.map((service, i) => (
            <ServiceCard
              key={i + 1}
              step={service.step}
              title={service.title}
              description={service.description}
              image={service.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;