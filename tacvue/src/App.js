import { useState, useEffect } from 'react';
import './App.css';

// styles
import './App.css';

// components
import LoadingWheel from './components/LoadingWheel';
import BalanceInfo from './components/BalanceInfo';

const address = '0xFB9288e34e8516424c3b39DDeC4ca4A0ef4af3ce';

function App() {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function getBalance() {
      const response = await fetch(
        `https://api.covalenthq.com/v1/43113/address/${address}/balances_v2/?key=${process.env.REACT_APP_API_KEY}`
      );
      const data = await response.json();
      const contract = data.data.items.find(
        (token) =>
          token.contract_address ===
          '0x9ec401a74553e8e27b8f5e5fd1a2829cfd0c6230'
      );
      setLoading(false);
      setBalance(contract);
    }
    setTimeout(getBalance, 500);
  }, []);

  const shortenAddr = (addr) => {
    const prefix = addr.slice(0, 5);
    const suffix = addr.slice(-5);
    return `${prefix}...${suffix}`;
  };

  const formatNumber = (num) => {
    const formattedNum = new Intl.NumberFormat('en-us', {
      minimumFractionDigits: 3,
    }).format(num);
    return formattedNum;
  };

  return (
    <div>
      <nav className="nav">
        <div className="btn">
          <img src="../avalanche.png" alt="avax logo" width="20px" />{' '}
          <div>Fuji Test Net</div>
        </div>
        <div className="btn">{shortenAddr(address)}</div>
      </nav>
      <div className="container">
        <div className="info-card">
          {loading === true ? (
            <div className="loading">
              <LoadingWheel />
            </div>
          ) : (
            <BalanceInfo
              balance={balance}
              formatNumber={formatNumber}
              shortenAddr={shortenAddr}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
