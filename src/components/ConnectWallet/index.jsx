import { useAccount } from "../../hooks/useAccount";
import MintSection from "../MintSection";

const ConnectWallet = () => {
    const { connectWallet, loading, account } = useAccount();

    return <>
        {!account ? (
            <button
                className="mintButton webVersion button--loading"
                onClick={connectWallet}
            >
                {loading ?
                    <div className="lds-dual-ring"></div>
                    :
                    <>Connect to wallet</>
                }
            </button>
        ) : (
            <MintSection />
        )}
    </>
}

export default ConnectWallet
