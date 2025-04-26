import React,{useState,useEffect,useContext} from 'react';
import { HeroSection, Service ,BigNFTSlider,Subscriber,Title, Category,Filter,Collection,FollowerTab,AudioLive,Slider,Video} from '../components/componentIndex';
import { NFTMarketPlaceContext } from '../Context/NFTMarketPlaceContext';

const Home = () => {
    const {checkIfWalletIsConnected }=useContext(NFTMarketPlaceContext);
    useEffect(()=>{
        checkIfWalletIsConnected();
    },[]);
    return (
        <div>
            <HeroSection />
            <Service />
            <BigNFTSlider/>
            <Title
                heading="Audio Collections"
                paragraph="Discover most unique audios "
            ></Title>
            <AudioLive/>
            <FollowerTab/>
            <Slider/>
            <Video/>
            <Collection/>
            <Title
                heading="Find Your Favorite NFTS"
                paragraph="Discover most outstanding NFTS in all topics of life and filter them by your interest "
            ></Title>
            <Filter/>
            <Category/>
            <Subscriber/>
            
        </div>
    );
};

export default Home;