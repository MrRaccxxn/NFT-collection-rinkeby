import { ethers } from 'ethers';
import Config from '../config';
import LabPunks from '../utils/LabPunks.json';

export const useContract = () => {
  const setupEventListener = async () => {
    let CONTRACT_ADDRESS = Config.CONTRACT_ADDRESS;

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, LabPunks.abi, signer);

        connectedContract.on('NewMint', (from, tokenId) => {
          console.log(
            `Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`
          );
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const askContractToMint = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          Config.CONTRACT_ADDRESS,
          LabPunks.abi,
          signer
        );

        let price = Config.PRICE_PER_NFT;
        const quantity = 1;
        const options = { value: ethers.utils.parseEther(price.toString()) };
        let nftTxn = await connectedContract.mint(quantity, options);

        console.log("Mining...please wait.");
        await nftTxn.wait();

        console.log(`Mined, see transaction: https://goerli.etherscan.io/tx/${nftTxn.hash}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { setupEventListener, askContractToMint };
};
