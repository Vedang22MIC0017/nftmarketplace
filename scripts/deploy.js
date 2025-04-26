const hre = require("hardhat");

async function main() {
    const NFTMarketPlace = await hre.ethers.getContractFactory("NFTMarketPlace");
    const nftMarketPlace = await NFTMarketPlace.deploy();

    await nftMarketPlace.waitForDeployment();
    const nftMarketPlaceAddress = await nftMarketPlace.getAddress();

    console.log(`Deployed contract Address: ${nftMarketPlaceAddress}`);
}

main().catch((error)=>{
    console.error(error);
    process.exitCode=1;

});
 