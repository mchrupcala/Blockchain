import React from 'react';
// import Wallet from './components/Wallet.js'
import WalletImg from './images/wallet_img.jpeg'
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>LambdaCoin Wallet</h1>
        <div className="wallet-container" style={{
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(${WalletImg})`,
        }}>
          {/* <Wallet /> */}
          <div className="wallet-form-container">
          <form>
            <label>Sender: 
              <input type="text"></input>
            </label>

              <label>Receiver: 
              <input type="text"></input>
            </label>

            <label>Amount: 
            <input type="text"></input>
            </label>

            <button>Send Coins</button>
          </form>
        </div>
        </div>

    </div>
  );
}

export default App;
