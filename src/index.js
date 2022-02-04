import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import Web3 from "web3/dist/web3.min";
import "./app.css"
// let tokenAddress = "0x9eC401A74553E8E27B8f5E5fd1A2829cfD0C6230";
// let walletAddress = "0xFB9288e34e8516424c3b39DDeC4ca4A0ef4af3ce";


const provider = "https://api.avax-test.network/ext/bc/C/rpc"


const Web3Client = new Web3(new Web3.providers.HttpProvider(provider));
// The minimum ABI to get ERC20 Token balance


const App = () => {

    const [balance, setBalance] = useState(0);
    const [walletAddress, setWalletAddress] = useState('');
    const [contractAddress, setContractAddress] = useState('');

    const minABI = [
        // balanceO
        {
          constant: true,
          inputs: [{ name: "_owner", type: "address" }],
          name: "balanceOf",
          outputs: [{ name: "balance", type: "uint256" }],
          type: "function",
        },
      ];
    // Get ERC20 Token contract instance
    const contract = new Web3Client.eth.Contract(minABI, contractAddress);
    async function getBalance() {
        const result = await contract.methods.balanceOf(walletAddress).call(); // 29803630997051883414242659
        const format = Web3Client.utils.fromWei(result); // 29803630.997051883414242659
        setBalance(format);
      }

 return (<>
 <hr></hr>
 <h1 className='app-heading'>AVAX Balance Getter</h1>
 <p className="sub-heading">wallet address</p>
 <p className='examples'>example: 0xFB9288e34e8516424c3b39DDeC4ca4A0ef4af3ce</p>
 <input className='inputs' onChange={(e) => {
     setWalletAddress(e.target.value)
 }}></input>
 <p className="sub-heading">contract address</p>
 <p  className='examples'>example: 0x9eC401A74553E8E27B8f5E5fd1A2829cfD0C6230</p>
 <input className='inputs'
 onChange={(e) => {
     setContractAddress(e.target.value)
 }}></input>
 <hr></hr>
 <button className='sub-button' onClick={getBalance}>Submit</button>
 <p className="sub-heading">Total Balance:</p><p className="totals"> {balance} Wei</p>
 <p className="sub-heading">Total Balance Rounded:</p><p className="totals"> {(balance * (10 * 1e-18))} AVAX</p>
 <hr></hr>
 </>)
 }
ReactDOM.render(<App />, document.getElementById('app'));