import "./styles/join_game.css"
import { useEffect, useState } from "react"
import axios from "axios"

export default function JoinGame() {
    const [gamesList, setGamesList] = useState({});

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/tables`)
        .then((response) => {
            setGamesList(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

    console.log(gamesList);

    return(
        <>
        <div className="title">
            <img className="title-bg" src="https://st2.depositphotos.com/23387462/46229/i/600/depositphotos_462298254-stock-photo-minsk-belarus-march-2021-top.jpg" alt="" />
            <div className="title-content">
                <h1>Unirse a partida !</h1>
            </div>
        </div>
        <div className="beneath">
            <div className="partida">
                <h3>Partida disponible</h3>
                <p>Codigo partida : <span className="codigo">codigo</span></p>
                <div className="unir_partida">
                    <a href="/mainpage/join_game" >
                        <button className="unir_partida_button">Unirme a partida</button>
                    </a>
                </div>
            </div>

            <div className="partida">
                <h3>Partida disponible</h3>
                <p>Codigo partida : <span className="codigo">codigo</span></p>
                <div className="unir_partida">
                    <a href="/mainpage/join_game" >
                        <button className="unir_partida_button">Unirme a partida</button>
                    </a>
                </div>
            </div> 
            
            <div className="partida">
                <h3>Partida disponible</h3>
                <p>Codigo partida : <span className="codigo">codigo</span></p>
                <div className="unir_partida">
                    <a href="/mainpage/join_game" >
                        <button className="unir_partida_button">Unirme a partida</button>
                    </a>
                </div>
            </div>
        </div>
        </>
    )
}