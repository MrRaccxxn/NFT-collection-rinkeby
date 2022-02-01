export default checkIfWalletIsConnected = async () => {
  const {
    ethereum
  } = window;

  if (!ethereum) {
    console.log("Make sure you have metamask!");
    return;
  } else {
    console.log("We have the ethereum object", ethereum);
  }

  const accounts = await ethereum.request({
    method: "eth_accounts"
  });

  let chainId = await ethereum.request({
    method: 'eth_chainId'
  });
  console.log("Connected to chain " + chainId);

  // String, hex code of the chainId of the Rinkebey test network
  const rinkebyChainId = "0x4";
  if (chainId !== rinkebyChainId) {
    alert("You are not connected to the Rinkeby Test Network!");
  }

  if (accounts.length !== 0) {
    const account = accounts[0];
    console.log("Found an authorized account:", account);
    setCurrentAccount(account);
  } else {
    console.log("No authorized account found");
  }
};