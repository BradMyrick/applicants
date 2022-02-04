import React, { useState, useEffect } from 'react';
import token_abi from '../contracts/token_abi.json';
import { ethers } from 'ethers';

export default function Wallet() {
    const contractAddress = '0x9eC401A74553E8E27B8f5E5fd1A2829cfD0C6230';
    const userAddress = '0xFB9288e34e8516424c3b39DDeC4ca4A0ef4af3ce';

    const [contract, setContract] = useState(null);
    const [balance, setBalance] = useState(null);
    const [tokenName, setTokenName] = useState(null)
    const [symbol, setSymbol] = useState(null);

    useEffect(() => {
       const provider = new ethers.providers.Web3Provider(window.ethereum);
	    const signer = provider.getSigner();
	    const contract = new ethers.Contract(contractAddress, token_abi, signer);
	    setContract(contract);	 
    }, [])

    useEffect(() => {
		if (contract) {
			updateBalance();
            retrieveName();
            retrieveSymbol();
		}
	}, [contract]);

    const updateBalance = async () => {
		const balance = await contract.balanceOf(userAddress);
		const balanceToString = balance.toString();
		const tokenDecimals = await contract.decimals();
        const formattedBalance = balanceToString.slice(0, -tokenDecimals)
		setBalance(formattedBalance);	
	}

    const retrieveName = async () => {
        setTokenName(await contract.name())
    }

    const retrieveSymbol = async () => {
        setSymbol(await contract.symbol())
    }

    return (
        <>
            <div>
                <div>
			    	<h3>User Address: {userAddress}</h3>
			    </div>
			    <div>
			    	<h3>{tokenName} Balance: {balance} {symbol}</h3>
			    </div>
            </div>
        </>
    )
}