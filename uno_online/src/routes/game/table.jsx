import React from 'react'
import Card from './card'
import './styles/table.css'

export default function Table() {
  const cardsList = [{color: "red", value: 5},
  {color: "blue", value: 8},
  {color: "green", value: 2},
  {color: "green", value: 2},
  {color: "green", value: 2},
  {color: "green", value: 2},
  {color: "green", value: 2},
  {color: "green", value: 2},
  {color: "green", value: 2},
  {color: "green", value: 2},
  {color: "green", value: 2},
  {color: "green", value: 2},
  {color: "green", value: 2},
  {color: "yellow", value: 10}]

  return (
    <>
      <div className="container">
        <div className="column">
          <p className="player_name">Player 1</p>
          <p className="number_cards">5</p>
        </div>
        <div className="column">
          <p className="player_name">Player 2</p>
          <p className="number_cards">3</p>
        </div>
        <div className="column">
          <p className="player_name">Player 3</p>
          <p className="number_cards">8</p>
        </div>
      </div>

      <div className='bin-container'>
        <Card color="gray" value={"bin"}/>
      </div>

      <div className="card-container">
        {cardsList.length > 0 ? ( 
          cardsList.map((item, index) => (
                <Card color={item["color"]} value={item["value"]}/>
            ))
        ) : (
            <p>You have won !</p>
        )}
      </div>
    </>
  );
}