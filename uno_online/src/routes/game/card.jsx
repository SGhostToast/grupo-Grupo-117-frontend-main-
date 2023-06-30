import React from 'react'
import './styles/card.css'

const Card = ({ color, value }) => {
  const valueDict = {
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "skip": "🚫",
    "reverse":"🔄",
    "drawTwo": "+2",
    "wildDraw4": "+4",
    "wild":"🔴🟡🟢🔵"
  }
    return (
      <div className={`card ${color}`}>
        <span className="value">{valueDict[value]}</span>
        {/* <span className="value">{value}</span> */}
      </div>
    );
  };
  
export default Card;