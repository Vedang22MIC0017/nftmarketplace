import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaEthereum, FaWallet } from 'react-icons/fa';
import { MdContentCopy, MdOutlineAccountBalanceWallet, MdRefresh } from 'react-icons/md';
import { TbPlugConnected } from 'react-icons/tb';
import { SiCoinbase, SiWalletconnect } from 'react-icons/si';
import Style from './ConnectWallet.module.css';
import images from '../../img';

const ConnectWallet = () => {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('0.0');
  const [copied, setCopied] = useState(false);
  const [connected, setConnected] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async (provider = 'metamask') => {
    if (isConnecting) {
      return; // Prevent multiple connection attempts
    }

    setLoading(true);
    setIsConnecting(true);
    setError('');

    try {
      switch (provider) {
        case 'metamask':
          if (typeof window.ethereum !== 'undefined') {
            try {
              const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
              });
              const account = accounts[0];
              setAddress(account);
              setConnected(true);

              const balance = await window.ethereum.request({
                method: 'eth_getBalance',
                params: [account, 'latest']
              });
              setBalance((parseInt(balance, 16) / 1e18).toFixed(4));

              // Get recent transactions
              const mockTransactions = [
                { type: 'Send', amount: '0.1 ETH', to: '0x1234...5678', date: '2024-01-20' },
                { type: 'Receive', amount: '0.5 ETH', from: '0x8765...4321', date: '2024-01-19' },
              ];
              setTransactions(mockTransactions);
            } catch (err) {
              if (err.code === -32002) {
                setError('Connection request already pending. Please check MetaMask.');
              } else {
                setError(err.message || 'Failed to connect wallet');
              }
            }
          } else {
            setError('Please install MetaMask!');
          }
          break;

        case 'coinbase':
          setError('Coinbase Wallet integration coming soon!');
          break;

        case 'walletconnect':
          setError('WalletConnect integration coming soon!');
          break;

        default:
          setError('Unknown wallet provider');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setError(error.message || 'Failed to connect wallet');
    } finally {
      setLoading(false);
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={Style.connectWallet}>
      <div className={Style.connectWallet_box}>
        <div className={Style.connectWallet_box_heading}>
          <h2>Connect Your Wallet</h2>
          <p>Connect with one of our available wallet providers or create a new one</p>
        </div>

        {error && (
          <div className={Style.error_message}>
            {error}
            <button onClick={() => setError('')} className={Style.dismiss_button}>
              ×
            </button>
          </div>
        )}

        {!connected ? (
          <div className={Style.connectWallet_box_provider}>
            <div 
              className={`${Style.connectWallet_box_provider_item} ${loading || isConnecting ? Style.loading : ''}`} 
              onClick={() => connectWallet('metamask')}
              style={{ opacity: isConnecting ? 0.7 : 1, cursor: isConnecting ? 'not-allowed' : 'pointer' }}
            >
              <Image src={images.metamask} alt="MetaMask" width={50} height={50} className={Style.metamask_logo} />
              <p>{isConnecting ? 'Connecting...' : 'MetaMask'}</p>
              <span className={Style.connectWallet_box_provider_item_connect}>
                {(loading || isConnecting) ? <MdRefresh className={Style.loading_icon} /> : <TbPlugConnected />}
              </span>
            </div>

            <div 
              className={Style.connectWallet_box_provider_item} 
              onClick={() => connectWallet('coinbase')}
            >
              <SiCoinbase size={50} />
              <p>Coinbase Wallet</p>
              <span className={Style.connectWallet_box_provider_item_connect}>
                <TbPlugConnected />
              </span>
            </div>

            <div 
              className={Style.connectWallet_box_provider_item} 
              onClick={() => connectWallet('walletconnect')}
            >
              <SiWalletconnect size={50} />
              <p>WalletConnect</p>
              <span className={Style.connectWallet_box_provider_item_connect}>
                <TbPlugConnected />
              </span>
            </div>
          </div>
        ) : (
          <div className={Style.connectWallet_box_connected}>
            <div className={Style.connectWallet_box_connected_info}>
              <div className={Style.connectWallet_box_connected_info_address}>
                <MdOutlineAccountBalanceWallet />
                <p>{address.slice(0, 6)}...{address.slice(-4)}</p>
                <button onClick={copyAddress}>
                  <MdContentCopy />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className={Style.connectWallet_box_connected_info_balance}>
                <FaEthereum />
                <p>{balance} ETH</p>
              </div>
            </div>

            <div className={Style.connectWallet_box_connected_transactions}>
              <h3>Recent Transactions</h3>
              <div className={Style.connectWallet_box_connected_transactions_list}>
                {transactions.map((tx, i) => (
                  <div key={i} className={Style.transaction_item}>
                    <div className={Style.transaction_type}>
                      <span className={tx.type === 'Send' ? Style.send : Style.receive}>
                        {tx.type}
                      </span>
                    </div>
                    <div className={Style.transaction_details}>
                      <p className={Style.transaction_amount}>{tx.amount}</p>
                      <p className={Style.transaction_address}>
                        {tx.type === 'Send' ? 'To: ' + tx.to : 'From: ' + tx.from}
                      </p>
                      <p className={Style.transaction_date}>{tx.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectWallet;