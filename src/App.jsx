import React from 'react';
import animationLoop from './assets/animation_loop.gif';
import ConnectWallet from './components/ConnectWallet';
import './styles/App.scss';

const App = () => {
  return (
    <div className="App">
      <div className="container">
        <div className="mintInformation">
          <div className="title">
            <svg className="svgLine" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 10">
              <g fill="#61DAFB">
                <path d="m0 0h1120" fill="#01a09e" stroke="#01a09e" strokeWidth="20" />
              </g>
            </svg>
            <h3 className="callActionText">What are you waiting for?</h3>
          </div>
          <h2 className="titleText">The most creative NFT collection according to my mom</h2>
          <ConnectWallet />
        </div>
        <div className="imgContainer">
          <img id="loopAnimation" alt="Walking animation" src={animationLoop}></img>
          <button className="mintButton mobileVersion">Mint now</button>
        </div>
      </div>
    </div>
  );
};

export default App;
