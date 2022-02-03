import React from 'react';

const divisor = 1000000000000000000000;

export default function BalanceInfo({ balance, shortenAddr, formatNumber }) {
  return (
    <div>
      <div className="header">
        <div className="text-glow">{balance && balance.contract_name} </div>
        <div className="contract">
          {balance && shortenAddr(balance.contract_address)}
        </div>
      </div>
      <div className="balance-info">
        <div className="balance">Balance:</div>
        <div>
          {balance && formatNumber(balance.balance / divisor)}{' '}
          {balance && balance.contract_ticker_symbol}
        </div>
      </div>
    </div>
  );
}
