import React, { useState, useEffect } from 'react';
import './App.css';
import Result from './Result';
import SideBar from './SideBar';

function App() {
  const [amount, setAmount] = useState(0);
  const [numMonths, setNumMonths] = useState(0);
  const [result, setResult] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [totalInputs, setTotalInputs] = useState([]);

  useEffect(() => {
    setTotalInputs(JSON.parse(localStorage.getItem('inputComb')));
  }, [])

  const calculateResult = (e) => {
    e.preventDefault();
    setCalculatedResult();
  }

  const handleSlider = (e) => {
    setAmount(e.target.value);
    setCalculatedResult();
  }

  const setCalculatedResult = () => {
    if (amount < 500 || amount > 5000) {
      setErrorMessage('Loan amount must be between 500 USD and 5000 USD');
      setResult(0);
      return;
    }
    if (numMonths < 6 || numMonths > 24) {
      setErrorMessage('Number of months must be between 6 and 24');
      setResult(0);
      return;
    }

    if (checkFromLocalStorage()) {
      return;
    }

    fetch(`https://ftl-frontend-test.herokuapp.com/interest?amount=${amount}&numMonths=${numMonths}`)
      .then(res => {
        return res.json();
      })
      .then(res => {
        setResult(res);
        setErrorMessage('');
        storeCombinations(res.monthlyPayment.amount, res.interestRate)
      })
      .catch(err => {
        console.log(err);
      })
  }

  const checkFromLocalStorage = (amt, month) => {
    let items = JSON.parse(localStorage.getItem('inputComb'));
    if (items && items.length > 0) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].amount === amt && items[i].numMonths === month) {
          setResult({
            monthlyPayment: {
              amount: items[i].monthlyPayment
            },
            interestRate: items[i].interest
          })
          setErrorMessage('');
          return true;
        }
      }
    }
    return false;
  }

  const updateFromHistory = (data) => {
    checkFromLocalStorage(data.amount, data.numMonths);
    setAmount(data.amount);
    setNumMonths(data.numMonths);
  }

  const storeCombinations = (monthlyPayment, interest) => {
    let inp = {
      amount,
      numMonths,
      monthlyPayment,
      interest
    };

    let inputCombinations = JSON.parse(localStorage.getItem('inputComb'));
    if (inputCombinations) {
      inputCombinations.push(inp);
      setTotalInputs(inputCombinations);
      localStorage.setItem('inputComb', JSON.stringify(inputCombinations));
    }
    else {
      let arr = [];
      arr.push(inp);
      localStorage.setItem('inputComb', JSON.stringify(arr));
    }
  }


  return (
    <div className="App">
      <div className="row">
        <div className="col-md-4 mx-left">
          <SideBar totalInputs={totalInputs} updateFromHistory={(data) => updateFromHistory(data)} />
        </div>
        <div className="col-md-6 mx-right">
          <div className="card card-body text-center mt-5">
            <h1 className="heading display-5 pb-3">Loan Calculator</h1>
            <form id="loan-form">
              <div className="form-group">
                <label htmlFor="customRange1">Change Amount</label>
                <input
                  type="range"
                  className="custom-range"
                  min="500"
                  max="5000"
                  onChange={handleSlider} />
              </div>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">$</span>
                  </div>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Loan Amount"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount} />
                </div>
              </div>
              <div className="form-group">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Loan Duration in months"
                  onChange={(e) => setNumMonths(e.target.value)}
                  value={numMonths} />
              </div>
              <div className="form-group">
                <button
                  onClick={calculateResult}
                  className="btn btn-primary btn-block">
                  Calculate</button>
              </div>
            </form>
            {result ? <Result result={result} /> : null}
            {errorMessage ?
              <div
                className="alert alert-danger"
              >
                {errorMessage}
              </div>
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
