import { useEffect, useState } from "react"
import axios from "axios"
import './styles/initialization.css'

const cur_username = import.meta.env.VITE_CUR_USERNAME;


export default function InitializationGame() {
    const [errorMessage, setErrorMesssage] = useState("");

    const toggleCrearPartida = (game_name, invit_1, invit_2, invit_3) => {
        let invit_list = [invit_1, invit_2, invit_3];

        if(invit_1 || invit_2 || invit_3){
            const promises = [];
            const errorsList = [];
            const successList = [];

            for (let i = 0; i < invit_list.length; i++) {
                if(invit_list[i]){
                    // console.log("in try, invit : ", invit_list[i]);
                    const promise = axios.post(`${import.meta.env.VITE_BACKEND_URL}/players/invite`, {
                        myusername: cur_username,
                        otherusername: invit_list[i]
                    })
                    .then((response) => {
                        console.log(response.data.msg);
                        successList.push(response.data.msg);
                    })
                    .catch((error) => {
                        console.log(error.response.data.errorMessage);
                        errorsList.push(error.response.data.errorMessage);
                    })
                    promises.push(promise);
                }
            }

            Promise.all(promises)
            .then(() => {
                if (errorsList.length == 0) {
                    console.log("Creating game");
                    axios.post(`${import.meta.env.VITE_BACKEND_URL}/tables/create`, {
                        username: cur_username,
                        gamename: game_name
                    })
                    .then((response) => {
                        console.log(response.data.msg);
                        setErrorMesssage(response.data.msg);
                    })
                    .catch((error) => {
                        console.log(error.response.data.errorMessage);
                        setErrorMesssage(error.response.data.errorMessage);
                    })
                } else {
                    console.log(errorsList);
                    setErrorMesssage(errorsList);
                }
                })
            .catch((error) => {
                console.log("An error occurred:", error);
            });
        }
        

        // if(one_invitation_ok > 0){
        //     console.log("Creating game");
        //     axios.post(`${import.meta.env.VITE_BACKEND_URL}/tables/create`, {
        //         username: cur_username,
        //         gamename: game_name
        //     })
        //     .then((response) => {
        //         console.log(response.data.msg);
        //         setErrorMesssage(response.data.msg);
        //     })
        //     .catch((error) => {
        //         console.log(error.response.data.errorMessage);
        //         setErrorMesssage(error.response.data.errorMessage);
        //     })
        // }
    }

    const [game_name, setGameName] = useState('');
    const handleGameNameChange = (event) => {
        setGameName(event.target.value);
    };
    const [invit_1, setInvit_1] = useState('');
    const handleInvit_1Change = (event) => {
        setInvit_1(event.target.value);
    };
    const [invit_2, setInvit_2] = useState('');
    const handleInvit_2Change = (event) => {
        setInvit_2(event.target.value);
    };
    const [invit_3, setInvit_3] = useState('');
    const handleInvit_3Change = (event) => {
        setInvit_3(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent form submission and page reload    
    };

    return(
        <>
        <div className="title">
            <img className="title-bg" src="https://st2.depositphotos.com/23387462/46229/i/600/depositphotos_462298254-stock-photo-minsk-belarus-march-2021-top.jpg" alt="" />
            <div className="title-content">
                <h1>Inicialisacion partida !</h1>
            </div>
        </div>
        <div className="beneath">
            <div className="creation_game">
                {/* <h3>Codigo de la partida: <span className="codigo">codigo</span></h3>
                <p className="list">Jugadores conectados : 3/4
                    <ul>
                        <li>Jugador 1 (Tu)</li>
                        <li>Jugador 2 [Listo]</li>
                        <li>Jugador 3 [Preparandose]</li>
                    </ul>
                </p>
                <div className="comenzar_partida">
                    <a href="/mainpage/initialization_game" >
                        <boton className="comenzar_partida_boton">Comenzar partida</boton>
                    </a>
                </div> */}

                <h3>Escribe tu nombre de jugador la partida que quieres crear !</h3>
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <div className="input-container">
                            <label>Tu nombre de jugador </label>
                            <input type="username" value={game_name} onChange={handleGameNameChange} required />
                        </div>
                        <h4>Entra el username de las personas que quieres invitar</h4>
                        <div className="input-container">
                            <label>Invitado 1 : </label>
                            <input type="username" value={invit_1} onChange={handleInvit_1Change} />
                        </div>
                        <div className="input-container">
                            <label>Invitado 2 : </label>
                            <input type="username" value={invit_2} onChange={handleInvit_2Change} />
                        </div>
                        <div className="input-container">
                            <label>Invitado 3 : </label>
                            <input type="username" value={invit_3} onChange={handleInvit_3Change}  />
                        </div>
                        <button className="comenzar_partida_boton" onClick={() => toggleCrearPartida(game_name, invit_1, invit_2, invit_3)}>Crear partida</button>
                    </form>
                </div>
                <p>{errorMessage}</p>
            </div>
        </div>
        </>
    )
}