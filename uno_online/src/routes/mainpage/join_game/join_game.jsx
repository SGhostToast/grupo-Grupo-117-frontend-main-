import "./styles/join_game.css"
import { useEffect, useState } from "react"
import axios from "axios"


const toggleJoinGame = (game_id) => {
    // Join game from back
    // axios.post(`${import.meta.env.VITE_BACKEND_URL}`, {

    // })
    // .then((response) => {
    //     console.log("Join game successfully ! Playing in : " + game_id);
    // })
    // .catch((error) => {
    //     console.log(error);
    // })

    console.log("Partida " + String(game_id));
}


export default function JoinGame() {
    const [gamesList, setGamesList] = useState({});
    const participants = [];

    // importing the list of tables from the back
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/tables`)
        .then((response) => {
            setGamesList(response.data);

        // --- that would be to display the participants of a game
            // for(let i = 0; i<gamesList.length; i++){
            //     axios.get(`${import.meta.env.VITE_BACKEND_URL}/tables/${gameid}`)
            //     .then((response) => {
            //         console.log(response.data);
            //         participants.push(response.data);
            //     })
            //     .catch((error) => {
            //         console.log(error.response);
            //     })
            // }

        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

    console.log(gamesList[0]);

    // const toggleSeePlayers = (gameid) => {
    //     axios.get(`${import.meta.env.VITE_BACKEND_URL}/tables/${gameid}`)
    //     .then((response) => {
    //         console.log(response.data);
    //     })
    //     .catch((error) => {
    //         console.log(error.response);
    //     })
    // }


    return(
        <>
        <div className="title">
            <img className="title-bg" src="https://st2.depositphotos.com/23387462/46229/i/600/depositphotos_462298254-stock-photo-minsk-belarus-march-2021-top.jpg" alt="" />
            <div className="title-content">
                <h1>Ver las partidas existantes !</h1>
            </div>
        </div>
        <div className="beneath">
            {gamesList.length > 0 ? (
                gamesList.map((code, index) => ( 
                    <div className="partida" key={index}>
                        <h3>Partida existante</h3>
                        <p>Codigo partida : <span className="codigo">{gamesList[index]["id"]}</span></p>
                        <p>Creador : <span className="creador">{gamesList[index]["ownerid"]}</span></p>
                        <div className="unir_partida">
                            {/* <a href="/initgame">
                                <button className="unir_partida_button" onClick={() => toggleJoinGame(gamesList[index])}>Unirme a partida</button>
                            </a> */}
                            {/* <button className="ver_participantes" onClick={() => toggleSeePlayers(gamesList[index]["id"])}>Ver participantes</button> */}
                        </div>
                    </div>
                ))
            ) : (
                <p>No games to join !</p>
            )}
        </div>
        </>
    )
}
