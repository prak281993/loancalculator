import React from 'react';

function Result(props) {
    const { result } = props;
    return (
        <div id="results" className="pt-4">
            <h5>Results</h5>
            <div className="form-group">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Monthly Payment (USD)</span>
                    </div>
                    <input type="number" className="form-control" id="monthly-payment" value={result.monthlyPayment.amount} disabled />
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Total Interest (%)</span>
                    </div>
                    <input type="number" className="form-control" id="total-interest" value={result.interestRate} disabled />
                </div>
            </div>
        </div>
    )
}

export default Result;
