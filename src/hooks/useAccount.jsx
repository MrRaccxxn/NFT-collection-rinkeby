import { useState, useEffect } from 'react';
import Config from '../config';
import { useContract } from './useContract';

export const useAccount = () => {
  const { setupEventListener } = useContract();
  const [account, setCurrentAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [blockMinting, setBlockMinting] = useState(false);
  const { ethereum } = window;

  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      if (!ethereum) {
        console.log('Make sure you have metamask!');
        setBlockMinting(true);
        return;
      }

      const accounts = await ethereum.request({
        method: 'eth_accounts'
      });

      let chainId = await ethereum.request({
        method: 'eth_chainId'
      });

      if (chainId !== Config.NETWORK_ID) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: Config.NETWORK_ID }]
          });
        } catch (err) {
          if (err.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainName: 'Sepolia Testnet',
                  chainId: Config.NETWORK_ID,
                  nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
                  rpcUrls: [Config.RPC_URL]
                }
              ]
            });
          }
        }
      }

      if (accounts.length !== 0) {
        const account = accounts[0];
        setCurrentAccount(account);
      }
    };

    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    try {
      setLoading(true);
      const { ethereum } = window;

      if (!ethereum) {
        setBlockMinting(true);
        setLoading(false);
        return;
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
      });
      setCurrentAccount(accounts[0]);
      setupEventListener();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return {
    account,
    connectWallet,
    blockMinting,
    loading
  };
};
