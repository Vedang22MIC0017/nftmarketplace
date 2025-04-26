import '../styles/globals.css';
import {NFTMarketPlaceProvider} from "../Context/NFTMarketPlaceContext";
//internal import 
import {NavBar,Footer} from "../components/componentIndex";
const MyApp= ({Component,pageProps})=>(
    <div>
        <NFTMarketPlaceProvider>
            <NavBar/>
            <Component {...pageProps}/>
            <Footer/>
        </NFTMarketPlaceProvider>

    </div>
);
export default MyApp;