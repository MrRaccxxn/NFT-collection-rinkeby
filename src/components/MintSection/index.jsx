import React from 'react';
import { useContract } from '../../hooks/useContract';
import { useAccount } from '../../hooks/useAccount';
import ConnectWallet from '../ConnectWallet';

export default function MintSection() {
  const { account, blockMinting } = useAccount();
  const { askContractToMint } = useContract();

  return (
    <>
      {
        !account ? (
          <ConnectWallet />
        ) : (
          <div className="mint__container">
            <button
              className="mintButton webVersion"
              onClick={askContractToMint}
              disabled={blockMinting}
            >
              Mint now
            </button>
          </div>
        )
      }
    </>
  );
}
