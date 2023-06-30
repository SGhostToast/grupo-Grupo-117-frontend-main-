import React from 'react'
import Card from './card'
import './styles/table.css'
import { useEffect, useState } from "react"
import axios from "axios"

const cur_username = import.meta.env.VITE_CUR_USERNAME;
const game_id = 13;
const player_id = 3;

export default function Table(gameid) {
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

// --- center card
  const [centralCardInfo, setCentralCardInfo] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/ingame/card/${game_id}`)
      .then((response) => {
        // console.log("First response", response.data.top_card);
        setCentralCardInfo(response.data.top_card);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  const [centralCard, setCentralCard] = useState([]);
  useEffect(() => {
    if (centralCardInfo.cardid) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/cards/${centralCardInfo.cardid}`)
        .then((response) => {
          // console.log("Second response", response.data);
          setCentralCard(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [centralCardInfo]);

// --- players card
  const [playerHand, setPlayerHand] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/ingame/hand/${player_id}`)
      .then((response) => {
        // console.log("Player hand", response.data.hand);
        setPlayerHand(response.data.hand);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [playerCards, setPlayerCards] = useState([]);
  useEffect(() => {
    if (playerHand.length) {
      const fetchCards = async () => {
        const cardList = [];
  
        for (let i = 0; i < playerHand.length; i++) {
          const card_id = playerHand[i].cardid;
          try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/cards/${card_id}`);
            cardList.push(response.data);
          } catch (error) {
            console.log(error);
          }
        }
  
        setPlayerCards(cardList);
      };
  
      fetchCards();
    }
  }, [playerHand]);

  console.log("Player cards ", playerCards);
  

  return (
    <>
      <h2>Current game id : {game_id}</h2>
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
        {centralCard.color ? (
          <Card color={centralCard.color.toLowerCase()} value={centralCard.symbol}/>
            ) : (
              <Card color="gray" value="bin"/>
            )}
      </div>

      {/* <div className="card-container">
        {cardsList.length > 0 ? ( 
          cardsList.map((item, index) => (
                <Card key={index} color={item["color"]} value={item["value"]}/>
            ))
        ) : (
            <p>You have won !</p>
        )}
      </div> */}

      <div className="card-container">
        {playerCards.length > 0  ? ( 
          playerCards.map((item, index) => (
                <Card key={index} color={item.color.toLowerCase()} value={item["symbol"]}/>
            ))
        ) : (
            <p>You have no cards !</p>
        )}
      </div>
    </>
  );
}