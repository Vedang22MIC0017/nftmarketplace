import React, { useState } from 'react';
import { RiUserFollowFill, RiUserUnfollowFill, RiAwardLine } from 'react-icons/ri';
import Image from 'next/image';
import Style from './FollowerTab.module.css';
import images from '../../img';

const FollowerTab = () => {
    const [activeTab, setActiveTab] = useState('Popular');
    const [followingStatus, setFollowingStatus] = useState({});

    const CardArray = [
        { id: 1, name: 'Vedang Mishrra', followers: '15.5K', image: images.user1 },
        { id: 2, name: 'Arya Kharwadkar', followers: '12.2K', image: images.user2 },
        { id: 3, name: 'David Brown', followers: '9.8K', image: images.user3 },
        { id: 4, name: 'Sarah Davis', followers: '8.5K', image: images.user4 },
        { id: 5, name: 'Michael Lee', followers: '7.2K', image: images.user5 },
        { id: 6, name: 'Lisa Anderson', followers: '6.8K', image: images.user6 },
        { id: 7, name: 'Robert Taylor', followers: '5.9K', image: images.user7 },
        { id: 8, name: 'Jennifer White', followers: '5.2K', image: images.user8 }
    ];

    const FollowingArray = CardArray.slice(0, 6);
    const NewArray = CardArray.slice(0, 5);

    const toggleFollow = (id) => {
        setFollowingStatus(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const renderCards = (array) => {
        return array.map((el) => (
            <div key={el.id} className={Style.followerTab_card}>
                <div className={Style.followerTab_card_img}>
                    <Image
                        src={el.image}
                        alt={el.name}
                        width={50}
                        height={50}
                        className={Style.followerTab_card_img_img}
                    />
                </div>
                
                <div className={Style.followerTab_card_info}>
                    <div className={Style.followerTab_card_info_name}>
                        <h4>{el.name}</h4>
                        <RiAwardLine className={Style.verified_icon} />
                    </div>
                    <p>{el.followers} followers</p>
                </div>

                <button
                    className={`${Style.followButton} ${followingStatus[el.id] ? Style.following : ''}`}
                    onClick={() => toggleFollow(el.id)}
                >
                    {followingStatus[el.id] ? (
                        <>
                            <RiUserUnfollowFill /> Unfollow
                        </>
                    ) : (
                        <>
                            <RiUserFollowFill /> Follow
                        </>
                    )}
                </button>
            </div>
        ));
    };

    return (
        <div className={Style.followerTab}>
            <div className={Style.followerTab_title}>
                <h2>Top Creator List</h2>
                <div className={Style.followerTab_tabs}>
                    {['Popular', 'Following', 'New'].map((tab) => (
                        <button
                            key={tab}
                            className={`${Style.tab_button} ${activeTab === tab ? Style.active : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className={Style.followerTab_box}>
                {activeTab === 'Popular' && renderCards(CardArray)}
                {activeTab === 'Following' && renderCards(FollowingArray)}
                {activeTab === 'New' && renderCards(NewArray)}
            </div>
        </div>
    );
};

export default FollowerTab;