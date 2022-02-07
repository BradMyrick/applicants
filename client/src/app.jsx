import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

const App = (props) => {

  const [balance, setBalance] = useState(null);

  const handleClick = () => {
    axios.get('http://localhost:8080/getBalance')
    .then((data) => {
      const amount = data.data / 100000000;
      setBalance(amount)
    })
  };

  return (
    <div className="app">
      <div className="window">
        <h1>Your balance is: {balance}</h1>
        <button onClick={handleClick}>Get Balance</button>
      </div>

    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));