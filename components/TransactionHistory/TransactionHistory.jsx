import React, { useContext, useEffect, useState } from 'react';
import { NFTMarketplaceContext } from '../ConnectWallet/NFTMarketplaceContext';
import styles from './TransactionHistory.module.css';

const TransactionHistory = ({ tokenId }) => {
    const { fetchTransactionHistory, error } = useContext(NFTMarketplaceContext);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTransactionHistory = async () => {
            try {
                const history = await fetchTransactionHistory(tokenId);
                const enrichedHistory = await Promise.all(history.map(async (tx) => {
                    // Get location data based on IP (in a production environment)
                    const locationData = {
                        city: 'Local Network',
                        country: 'Development',
                        timestamp: new Date(tx.timestamp).toLocaleString()
                    };

                    return {
                        ...tx,
                        location: locationData
                    };
                }));
                setTransactions(enrichedHistory);
            } catch (err) {
                console.error('Error loading transaction history:', err);
            } finally {
                setLoading(false);
            }
        };

        if (tokenId) {
            loadTransactionHistory();
        }
    }, [tokenId, fetchTransactionHistory]);

    if (loading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Loading transaction history...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.error}>
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <div className={styles.transactionHistory}>
            <h2>Transaction History</h2>
            <div className={styles.transactionList}>
                {transactions.map((tx, index) => (
                    <div key={index} className={styles.transactionCard}>
                        <div className={styles.transactionHeader}>
                            <span className={styles.transactionType}>{tx.transactionType}</span>
                            <span className={styles.timestamp}>{tx.location.timestamp}</span>
                        </div>
                        <div className={styles.transactionDetails}>
                            <div className={styles.addressInfo}>
                                <p>
                                    <strong>From:</strong> 
                                    <span className={styles.address}>{tx.from || 'N/A'}</span>
                                </p>
                                <p>
                                    <strong>To:</strong> 
                                    <span className={styles.address}>{tx.to || 'N/A'}</span>
                                </p>
                            </div>
                            <div className={styles.locationInfo}>
                                <p>
                                    <strong>Location:</strong> 
                                    {tx.location.city}, {tx.location.country}
                                </p>
                            </div>
                            <div className={styles.priceInfo}>
                                <p>
                                    <strong>Price:</strong> 
                                    <span className={styles.price}>{tx.price} ETH</span>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TransactionHistory;