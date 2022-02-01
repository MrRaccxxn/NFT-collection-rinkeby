import "./styles/App.css";
import animationLoop from "./assets/animation_loop.gif";
import React, { useState, useEffect } from "react";
import askContractToMint from './functions/mintFunctions';
import setupEventListener from './functions/setupEventListeners';

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [loading, setLoading] = useState(true);

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      setLoading(false);
      return;
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      setCurrentAccount(account);
    }
    setLoading(false);
  };

  const connectWallet = async () => {
    try {
      setLoading(true);
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        setLoading(false);
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      setupEventListener() ;
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="mintInformation">
          <div className="title">
            <svg
              className="svgLine"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 841.9 10"
            >
              <g fill="#61DAFB">
                <path
                  d="m0 0h1120"
                  fill="#01a09e"
                  stroke="#01a09e"
                  strokeWidth="20"
                />
              </g>
            </svg>
            <h3 className="callActionText">What are you waiting for?</h3>
          </div>
          <h2 className="titleText">
            The most creative NFT collection according to my mom
          </h2>
          {currentAccount === "" ? (
            <a className="mintButton webVersion" onClick={connectWallet}>
              {loading ? (
                <>Getting data...</>
              ) : (
                <>Connect to wallet</>
              )}
            </a>
          ) : (
            <a className="mintButton webVersion" onClick={askContractToMint}>Mint now</a>
          )}
        </div>
        <div className="imgContainer">
          <img
            id="loopAnimation"
            alt="Walking animation"
            src={animationLoop}
          ></img>
          <a className="mintButton mobileVersion">Mint now</a>
        </div>
      </div>
    </div>
  );
};

export default App;
