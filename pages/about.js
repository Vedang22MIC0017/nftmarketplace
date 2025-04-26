import React from 'react';
import Image from 'next/image';
import styles from '../styles/about.module.css';
import { Title } from '../components/componentIndex';
import images from '../img';

const About = () => {
  const teamMembers = [
    {
      name: 'Vedang Mishrra',
      role: 'Founder & CEO',
      image: images.user1,
      description: 'Blockchain enthusiast with 10+ years of experience in digital assets.'
    },
    {
      name: 'Arya kharwadkar',
      role: 'Head of Operations',
      image: images.user2,
      description: 'Expert in NFT curation and digital art marketplace management.'
    },
    {
      name: 'Mike Johnson',
      role: 'Lead Developer',
      image: images.user3,
      description: 'Full-stack developer specialized in blockchain technologies.'
    },
    {
      name: 'Sarah Wilson',
      role: 'Creative Director',
      image:images.user4,
      description: 'Award-winning digital artist and NFT collection curator.'
    },
    {
      name: 'David Chen',
      role: 'Marketing Manager',
      image: images.user5,
      description: 'Digital marketing specialist with focus on crypto and NFT markets.'
    },
    {
      name: 'Emily Blunt',
      role: 'Community Manager',
      image: images.user10,
      description: 'Building and nurturing our vibrant NFT community.'
    }
  ];

  return (
    <div className={styles.about}>
      <div className={styles.about_container}>
        <Title
          heading="About NFT Marketplace"
          paragraph="Discover the story behind our revolutionary NFT platform"
        />

        <div className={styles.about_content}>
          <div className={styles.about_mission}>
            <h2>Our Mission</h2>
            <p>
              We are dedicated to revolutionizing the digital art world by providing
              a secure, transparent, and accessible platform for creators and collectors.
              Our marketplace empowers artists to tokenize their work while offering
              collectors unique opportunities to own authentic digital assets.
            </p>
          </div>

          <div className={styles.about_vision}>
            <div className={styles.vision_content}>
              <h2>Our Vision</h2>
              <p>
                To become the world's leading NFT marketplace, fostering a vibrant
                community where creativity thrives and digital ownership is seamlessly
                integrated into everyday life.
              </p>
            </div>
            <div className={styles.vision_image}>
              <Image
                src="/img/hero.png"
                alt="Vision"
                width={500}
                height={400}
                className={styles.image}
              />
            </div>
          </div>

          <div className={styles.about_team}>
            <h2>Meet Our Team</h2>
            <div className={styles.team_grid}>
              {teamMembers.map((member, index) => (
                <div key={index} className={styles.team_member}>
                  <div className={styles.member_image}>
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={200}
                      height={200}
                      className={styles.image}
                    />
                  </div>
                  <h3>{member.name}</h3>
                  <span>{member.role}</span>
                  <p>{member.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.about_achievements}>
            <h2>Our Achievements</h2>
            <div className={styles.achievements_grid}>
              <div className={styles.achievement_card}>
                <h3>100K+</h3>
                <p>Active Users</p>
              </div>
              <div className={styles.achievement_card}>
                <h3>50K+</h3>
                <p>NFTs Created</p>
              </div>
              <div className={styles.achievement_card}>
                <h3>$10M+</h3>
                <p>Trading Volume</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;