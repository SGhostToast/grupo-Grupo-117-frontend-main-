import React from 'react'
import Card from './card'
import './styles/table.css'
import { useEffect, useState } from "react"
import axios from "axios"

const cur_username = import.meta.env.VITE_CUR_USERNAME;
const game_id = 27;
// const player_id = 3;

export default function Table() {

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

  
// --- other players' cards
  const [otherPlayers, setOtherPlayers] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/tables/${game_id}/players`)
      .then((response) => {
        // console.log("Player hand", response.data.hand);
        // We do not want it to store the current player array
        const myArray = response.data.filter(item => item.id !== player_id);
        // console.log("My array", myArray);
        setOtherPlayers(myArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [otherPlayerCards, setOtherPlayerCards] = useState([]);
  useEffect(() => {
    if (otherPlayers.length) {
      const fetchCards = async () => {
        const cardList = [];
  
        for (let i = 0; i < otherPlayers.length; i++) {
          const play_id = otherPlayers[i].id;
          try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/ingame/hand/${play_id}`);
            cardList.push(response.data);
          } catch (error) {
            console.log(error);
          }
        }

        setOtherPlayerCards(cardList);
      };
  
      fetchCards();
    }
  }, [otherPlayers]);


// --- take central card
  const [errorMessage, setErrorMessage] = useState("");
  const toggleTakeCentralCard = (playerid) => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/ingame/take`, {
        playerid:playerid,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data.errorMessage);
        setErrorMessage(error.response.data.errorMessage);
      });
  };

// --- play card
  const togglePlayCard = (playerid, index) => {
    // console.log(index, playerCards[index]);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/ingame/play`, {
        playerid:playerid,
        cardorder: index,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data.errorMessage);
        setErrorMessage(error.response.data.errorMessage);
      });
  };

// --- turn of 
  const [turn, setTurn] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/ingame/turn/${game_id}`)
      .then((response) => {
        setTurn(response.data.turn);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [playerCards, otherPlayerCards]);

  return (
    <>
      <h2>Current game id : {game_id}</h2>

      <div className='container'>
        {otherPlayerCards.length ? (
          otherPlayerCards.map((item, index) => (
            <div className="column" key={index}>
              <p className="player_name">Player {otherPlayers[index].id}</p>
              <p className="number_cards">{item.hand.length}</p>
            </div>
            ))) : (
            <p></p>
          )}
      </div>

      <div><h2>Turno de : {turn}</h2></div>

      <div className='bin-container'>
              <h2>Maso comun</h2>
        {centralCard.color ? (
          <div className="bin_card">
            <button className='card_button' onClick={() => toggleTakeCentralCard(player_id)}>
              <Card color={centralCard.color.toLowerCase()} value={centralCard.symbol}/>
            </button>
          </div>
            ) : (
              <Card color="gray" value="bin"/>
            )}
            <p>{errorMessage}</p>
      </div>


      <div className="card-container">
        {playerCards.length > 0  ? ( 
          playerCards.map((item, index) => (
            <button key={index} className='card_button' onClick={() => togglePlayCard(player_id, index)}>
                <Card color={item.color.toLowerCase()} value={item["symbol"]}/>
            </button>
            ))
        ) : (
            <p>You have no cards !</p>
        )}
      </div>      
    </>
  );
}