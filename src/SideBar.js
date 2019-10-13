import React from 'react';
import './SideBar.css';

function SideBar(props) {
    const { totalInputs, updateFromHistory } = props;

    const handleClick = (amount, numMonths) => {
        updateFromHistory({ amount, numMonths });
    }

    let historyList = (totalInputs) ? (
        totalInputs.map((inp, index) => (
            <li key={index}>
                <button onClick={() => handleClick(inp.amount, inp.numMonths)} type="button" className="btn btn-secondary">
                    Item {index + 1}
                </button>
                <button className="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <p className="dropdown-item">Amount: {inp.amount}</p>
                    <p className="dropdown-item">Month: {inp.numMonths}</p>
                </div>
            </li>
        ))
    ) : null;

    return (
        <div className="sidebar">
            <header>
                <a href="#">History</a>
            </header>
            <div className="nav">
                <div className="dropdown-show">
                    <ul>
                        {historyList}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SideBar;
