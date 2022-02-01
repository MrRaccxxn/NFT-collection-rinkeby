import myEpicNft from '../utils/MyEpicNfts.json';
import { ethers } from "ethers";
import setupEventListener from './setupEventListeners';

const askContractToMint = async () => {
  const CONTRACT_ADDRESS = "0xf944Fa2557a4DfCd1e90D5B511981aE33a2Eb2eF";

  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        myEpicNft.abi,
        signer
      );

      console.log("Going to pop wallet now to pay gas...");
      let nftTxn = await connectedContract.makeAnEpicNFT();

      console.log("Mining...please wait.");
      await nftTxn.wait();

      console.log(
        `Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
      );

      setupEventListener() ;
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error);
  }
};

export default askContractToMint;
