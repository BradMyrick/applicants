const React = require('react');

const Wallet = (props) => {
  return (
    <div>
      Your Avax Balance: {props.wallet / 1000000000}
    </div>
  )
}

export default Wallet;