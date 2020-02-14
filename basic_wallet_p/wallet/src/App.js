import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Wallet from './components/Wallet.js'
import WalletImg from './images/wallet_img.jpeg'
import './App.css';

function App() {
  const [user, setUser] = useState('');
  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [blockchain, setBlockchain] = useState(null);
  const [userTx, setUserTx] = useState(null);
  const [inte, setInte] = useState(0);
  let balance = null;

  const userHandler = e => {
    e.preventDefault();
    setUser(e.target.value)
  }

  const sendHandler = e => {
    e.preventDefault();
    setSender(e.target.value)
  }

  const recipientHandler = e => {
    e.preventDefault();
    setRecipient(e.target.value)
  }

  const amountHandler = e => {
    e.preventDefault();
    setAmount(e.target.value)
  }

  let checkIfSignedIn = null;
  
//   useEffect(() => {
//     checkIfSignedIn = () => {
//     console.log("called it!")
//       return (
//         <h3>Current balance is: {balance}</h3>
//       )
// }
// }, [userTx])

const walletHandler = e => {
  e.preventDefault();
  if (balance === null) {
    balance = 0;
  }
  setUserTx({'sender': sender, 'recipient': recipient, 'amount': amount})
  // callApi();
}

  useEffect(() => {
    setInte(inte+1);
    // const callApi = () => {
      console.log(blockchain);
      console.log(userTx);
      axios
          .post('http://localhost:5000/transaction/new', userTx, userTx)
          .then(res => {
            console.log(res);
          })
          .then(res => {
            axios
            .get('http://localhost:5000/chain')
            .then(res => {
              setBlockchain(res.data.chain);
              // console.log(res.data.chain);
              return res.data.chain
            })
            .then(res => {
              // console.log(res);
              res.forEach(i => {
                // console.log(i);
                if (i.transactions != null) {
                  // console.log(i);
                  i.transactions.forEach(j => {
                    // console.log(j);
                    if (user === j.sender) {
                      balance -= j.amount
                    } 
                    if (user === j.recipient) {
                      balance += j.amount
                    }
                    if (sender === user) {
                      balance -= amount
                    }
                  })
                }
              })
              console.log("Balance is: ", balance);
            })
            .catch(err => {
              console.log(err);
            })
          })
          .catch(err => {
            console.log(err);
          })
    // }
  }, [userTx]);



  return (
    <div className="App">
      <h1>LambdaCoin Wallet</h1>
        <div className="wallet-container" style={{
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(${WalletImg})`,
        }}>
          <Wallet balance={balance} inte={inte}/>
          <div className="wallet-form-container">
            <h2>Welcome back, {user}!</h2>
            {checkIfSignedIn}
          <form>
          <label>User: 
              <input type="text" name="user" value={user} onChange={userHandler}></input>
            </label>

            <label>Sender: 
              <input type="text" name="sender" value={sender} onChange={sendHandler}></input>
            </label>

              <label>Receiver: 
              <input type="text" name="recipient" value={recipient} onChange={recipientHandler}></input>
            </label>

            <label>Amount: 
            <input type="text" name="amount" value={amount} onChange={amountHandler}></input>
            </label>

            <button onClick={walletHandler}>Send Coins</button>
          </form>
        </div>
        </div>

    </div>
  );
}

export default App;
