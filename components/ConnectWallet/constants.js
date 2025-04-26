// Contract deployment addresses
export const NFTMarketplaceTrackerAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"; // Deployed contract address

// IPFS Configuration
export const IPFS_GATEWAY = "https://ipfs.io/ipfs/";

// Network Configuration
export const NETWORK_CONFIG = {
    chainId: 1337,
    chainName: "Localhost",
    rpcUrls: ["http://127.0.0.1:8545"],
    nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18
    }
};

// Transaction Types
export const TRANSACTION_TYPES = {
    MINT: "mint",
    LIST: "list",
    SALE: "sale",
    TRANSFER: "transfer"
};

// Event Names
export const EVENTS = {
    MARKET_ITEM_CREATED: "MarketItemCreated",
    TRANSACTION_RECORDED: "TransactionRecorded"
};