import "./App.css";
import React, { useState } from "react";
import { ethers } from "ethers";
import token_abi from "./abi.json";

function App() {
  const [userAddress, setUserAddress] = useState(
    "0xFB9288e34e8516424c3b39DDeC4ca4A0ef4af3ce"
  );
  const [contractAddress, setContractAddress] = useState(
    "0x9eC401A74553E8E27B8f5E5fd1A2829cfD0C6230"
  );
  const [balance, setBalance] = useState("");
  const [symbol, setSymbol] = useState("");

  const handleSubmit = async (e) => {
      e.preventDefault();
    try {
      //Check for metamask extension
      if (!window.ethereum)
        throw new Error(
          "Please install Metamask to your browser extension to use this application"
        );
      //requesting access/permission to metamask wallet
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, token_abi, signer);
      getBalance(contract);
    } catch (err) {
      console.log(err);
    }
  };
  const getBalance = async (contract) => {
    //getting balance of account
    const balance = await contract.balanceOf(userAddress);
    const balanceToString = balance.toString();
    const formattedBalance = ethers.utils.formatUnits(balanceToString, 6)
    setBalance(formattedBalance);
    //getting symbol of account
    const symbol = await contract.symbol();
    setSymbol(symbol);
  };
  return (
    <div className="container">
      <div className="sub-container">
          <h2>Balance Checker</h2>
        <label for="userAddress">User Address: </label>
        <input
          type="text"
          id="userAddress"
          name="userAddress"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
        ></input>
        <br></br>
        <label for="contractAddress">Contract Address: </label>
        <input
          type="text"
          id="contractAddress"
          name="contractAddress"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
        ></input>
        <br></br>
        <button onClick={(e) => handleSubmit(e)}> Submit </button>
        <div>
          <p>Your balance is: </p>
          <h1>
            {balance} {symbol}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default App;
