//SPDX-License-Identifier:MIT
pragma solidity ^0.8.4;
// importing openzepplin
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

contract NFTMarketPlace is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;
    uint256 listingPrice = 0.0015 ether;
    address payable owner; // payable so it can receive Items

    mapping(uint256 => MarketItem) private idMarketItem;

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }
    //trigerring event
    event idMarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );
    modifier onlyOwner() {
        require(msg.sender == owner, "only owner can change the listing price");
        _; // if succesful then continue
    }

    constructor() ERC721("NFT Metaverse Token", "ARYVED") {
        owner = payable(msg.sender);
    }

    function updateListingPrice(
        uint256 _listingprice
    ) public payable onlyOwner {}

    function getlistingPrice() public view returns (uint256) {
        require(listingPrice > 0, "Listing price not set");
        return listingPrice;
    }

    //create nft token function

    function createToken(
        string memory tokenURI,
        uint256 price
    ) public payable returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        createMarketItem(newTokenId, price);
        return newTokenId;
    }

    //creating market item and assigning token id
    function createMarketItem(uint256 tokenId, uint256 price) private {
        require(price > 0, "price must be atleast 1");
        require(
            msg.value == listingPrice,
            "Prime must be equal to listing price"
        );
        idMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false
        );
        _transfer(msg.sender, address(this), tokenId);

        emit idMarketItemCreated(
            tokenId,
            msg.sender,
            address(this),
            price,
            false
        );
    }

    //resale function
    function reSellToken(uint256 tokenId, uint256 price) public payable {
        require(
            idMarketItem[tokenId].owner == msg.sender,
            "only item owner can resell"
        );
        require(
            msg.value == listingPrice,
            "Pricing must be atleast equal to listing price"
        );
        idMarketItem[tokenId].sold = false;
        idMarketItem[tokenId].price = price;
        idMarketItem[tokenId].seller = payable(msg.sender);
        idMarketItem[tokenId].owner = payable(address(this));

        _itemsSold.decrement();
        _transfer(msg.sender, address(this), tokenId);
    }

    //create sales
    function createMarketSale(uint256 tokenId) public payable {
        uint price = idMarketItem[tokenId].price;
        require(msg.value == price, "please submit the asking price ");
        idMarketItem[tokenId].owner = payable(msg.sender);
        idMarketItem[tokenId].sold = true;
        idMarketItem[tokenId].owner = payable(address(0));
        _itemsSold.increment();
        _transfer(address(this), msg.sender, tokenId);

        payable(owner).transfer(listingPrice);
        payable(idMarketItem[tokenId].seller).transfer(msg.value);
    }

    //getting unsold nft data
    function fetchmarketItem() public view returns (MarketItem[] memory) {
        uint256 itemCount = _tokenIds.current();
        uint256 unSoldItemCount = _tokenIds.current() - _itemsSold.current();
        uint256 currentIndex = 0;

        // Return empty array if no items exist
        if (itemCount == 0) {
            return new MarketItem[](0);
        }

        MarketItem[] memory items = new MarketItem[](itemCount);

        for (uint256 i = 0; i < itemCount; i++) {
            uint256 currentId = i + 1;
            if (idMarketItem[currentId].owner == address(this)) {
                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        // If no unsold items were found, return empty array
        if (currentIndex == 0) {
            return new MarketItem[](0);
        }

        // Create a new array with the correct size
        MarketItem[] memory unsoldItems = new MarketItem[](currentIndex);
        for (uint256 i = 0; i < currentIndex; i++) {
            unsoldItems[i] = items[i];
        }

        return unsoldItems;
    }

    //purchase items
    function fetchMyNFT() public view returns (MarketItem[] memory) {
        uint256 totalCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;
        for (uint256 i = 0; i < totalCount; i++) {
            if (idMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalCount; i++) {
            if (idMarketItem[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    //single user item
    function fetchItemsListed() public view returns (MarketItem[] memory) {
        uint256 totalCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;
        for (uint256 i = 0; i < totalCount; i++) {
            if (idMarketItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (idMarketItem[i + 1].seller == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}
