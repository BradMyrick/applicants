import React from 'react';
import axios from 'axios';
import Wallet from './wallet.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userWallet: 0,
    }
  }

  componentDidMount() {
    axios({
      url: 'http://127.0.0.1:3000/wallet',
    })
    .then(res => { this.setState({userWallet: res.data}) })
    .catch(err => { console.log(err) })
  }

  render() {
    return (
      <div>
        <Wallet wallet={this.state.userWallet} />
      </div>
    )
  }
}

export default App;