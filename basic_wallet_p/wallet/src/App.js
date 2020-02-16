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

  const eventHandler = e => {
    e.preventDefault();
    if (e.target.name === "user") {
      setUser(e.target.value)
    } 
    else if (e.target.name === 'sender') {
      setSender(e.target.value)
    }
    else if (e.target.name === 'recipient') {
      setRecipient(e.target.value)
    } 
    else if(e.target.name === 'amount') {
      setAmount(e.target.value)
    }

  }

  // const sendHandler = e => {
  //   e.preventDefault();

  // }

  // const recipientHandler = e => {
  //   e.preventDefault();

  // }

  // const amountHandler = e => {
  //   e.preventDefault();
  // }

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
      axios
          .post('http://localhost:5000/transaction/new', userTx, userTx)
          .then(res => {
            console.log(res);
          })
          .then(res => {
            axios
            .get('http://localhost:5000/chain')
            .then(res => {
              console.log(res.data.chain)
              setBlockchain(res.data.chain);
              return res.data.chain
            })
            .then(res => {
              res.forEach(i => {
                if (i.transactions != null) {
                  i.transactions.forEach(j => {
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
              <input type="text" name="user" value={user} onChange={eventHandler}></input>
            </label>

            <label>Sender: 
              <input type="text" name="sender" value={sender} onChange={eventHandler}></input>
            </label>

              <label>Receiver: 
              <input type="text" name="recipient" value={recipient} onChange={eventHandler}></input>
            </label>

            <label>Amount: 
            <input type="text" name="amount" value={amount} onChange={eventHandler}></input>
            </label>

            <button onClick={walletHandler}>Send Coins</button>
          </form>
        </div>
        </div>

    </div>
  );
}

export default App;
