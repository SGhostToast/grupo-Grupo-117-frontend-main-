import React from 'react'
import './styles/card.css'

const Card = ({ color, value }) => {
    return (
      <div className={`card ${color}`}>
        <span className="value">{value}</span>
      </div>
    );
  };
  
export default Card;