import './styles/App.css';
import animationLoop from './assets/animation_loop.gif';
import React from "react";


const App = () => {
  return (
    <div className="App">
      <div className="container">
        <div className='mintInformation'>
          <div className='title'>
            <svg className='svgLine' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 10">
              <g fill="#61DAFB">
                <path d="m0 0h1120" fill="#01a09e" stroke="#01a09e" strokeWidth="20"/>
              </g>
            </svg>
            <h3 className='callActionText'>What are you waiting for?</h3>
          </div>
          <h2 className='titleText'>The most creative NFT collection according to my mom</h2>
          <a className='mintButton webVersion'>Mint now</a>
        </div>
        <div className='imgContainer'>
          <img id='loopAnimation' alt='Walking animation' src={animationLoop}></img>
          <a className="mintButton mobileVersion">Mint now</a>
        </div>
      </div>
    </div>
  );
};

export default App;
