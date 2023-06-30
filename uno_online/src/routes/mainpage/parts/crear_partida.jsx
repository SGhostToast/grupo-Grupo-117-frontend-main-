import { useEffect, useState } from "react"
import axios from "axios"
import './styles/crear_partida.css'

export default function CrearPartida() {

    // const [iniciar_partida, setInitiarPartida] = useState('');
    // const [game_number, setGameNumber] = useState('');
    // const handleGameNumberChange = (event) => {
    //     setGameNumber(event.target.value);
    // };
    // const toggleIniciarPartida = (partida) => {
    //     console.log("Iniciar partida ", partida);
    //     if(partida){
    //         axios.post(`${import.meta.env.VITE_BACKEND_URL}/players/begin`, {
    //             username: cur_username,
    //             gameid: partida
    //         })
    //         .then((response) => {
    //             console.log(response.data.msg);
    //             setInitiarPartida(response.data.msg);
    //         })
    //         .catch((error) => {
    //             console.log(error.response.data.errorMessage);
    //             setInitiarPartida(error.response.data.errorMessage);
    //         })
    //     }
    // }

    const [gameid, setGameID] = useState('');
    const handleGameIDChange = (event) => {
        setGameID(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent form submission and page reload    
    };

    return(
        <>
        <h2>Crear Partida</h2>
        <p>Esta parte tendria un boton que permitiria crear una partida. 
            El usuario llegara a una otra pagina que creera la partida rensenando el ID y preguntando de empezarl la partida cuando el creador quiere jugar !
        </p>
        <p>Existiria también un boton "Juntar partida", llegando a una pagina preguntando por un ID de partida para juntar una. 
            Quizas en esta otra pagina haria las partidas que esperan jugadores para entrar en partidas sin conocer el ID. 
        </p>
        <a href="/initgame">
                <button id="crear_partida">Crear / juntar partida !</button>
        </a>
        <a href="/join_game">
            <button id="unirse_a_partida">Ver partida existantes !</button>
        </a>
        <div className="creation_game">
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label>Partida a cual quieres ir</label>
                        <input type="username" value={gameid} onChange={handleGameIDChange} />
                    </div>
                    <a href="/table">
                        <button className="ir_a_partida" onClick={() => toggleIrAPartida(gameid)}>Ir a partida</button>
                    </a>
                </form>
            </div>
            {/* <p>{errorMessage}</p> */}
        </div>
        <a href="/table">
            {/* <button className="ir_a_partida" onClick={() => toggleIrAPartida(gameid)}>Ir a partida</button> */}
            <button className="ir_a_partida">Ir a partida</button>
        </a>
        </>
    )
}