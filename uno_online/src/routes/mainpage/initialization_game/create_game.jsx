import { useEffect, useState } from "react"
import axios from "axios"
import './styles/initialization.css'

const cur_username = import.meta.env.VITE_CUR_USERNAME;
const cur_user_id = 2;

// const cur_username = "user1";
// const cur_user_id = 5;

// const cur_username = "user2";
// const cur_user_id = 6;

export default function CreateGame() {
// --- current game id
    const [waiting_gameid, setWaitingGameid] = useState(-1);
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/players/mewaitinggame/${cur_user_id}`)
        .then((response) => {
            // console.log(response.data.player);
            if(response.data.player){
                setWaitingGameid(response.data.player.gameid);
            }
        })
        .catch((error) => {
            console.log(error);
        })
        // console.log("Called");
    }, [cur_username])

    const [playing_gameid, setPlayingGameid] = useState(-1);
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/players/meingame/${cur_user_id}`)
        .then((response) => {
            if(response.data){
                setPlayingGameid(response.data.player.gameid);
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }, [cur_username])

// --- Creation of the game
    const [game_name, setGameName] = useState('');
    const handleGameNameChange = (event) => {
        setGameName(event.target.value);
    };
    const [errorCreatePartidaMessage, setErrorMesssage] = useState("");
    const toggleCrearPartida = (game_name) => {
        console.log("Creating game");
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/tables/create`, {
            username: cur_username,
            gamename: game_name
        })
        .then((response) => {
            console.log(response);
            setErrorMesssage(response.data.msg + " La partida creada tiene el id " + String(response.data.table.id));
        })
        .catch((error) => {
            console.log(error.response.data.errorMessage);
            setErrorMesssage(error.response.data.errorMessage);
        })        
    }


    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent form submission and page reload    
    };

// --- invitations already sent
    const [invitations, setInvitations] = useState("");
    const [invitationsReceived, setInvitationsReceived] = useState("");

    useEffect(() => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/players/invitations`, {
            username: cur_username
        })
        .then((response) => {
            if(response.data.invited_to_your_game){
                setInvitations(response.data.invited_to_your_game);
            } else {
                setInvitationsReceived(response.data.you_were_invited_to);
            }
        })
        .catch((error) => {
            console.log(error);
        })
        // console.log("Called");
    }, [cur_username]) // loads when the cur_username is modified

    const [waiting_players, setWaitingPlayers] = useState("");
    useEffect(() => {
        const fetchWaitingPlayers = async () => {
            const players_ready = [];

            axios.get(`${import.meta.env.VITE_BACKEND_URL}/tables/${waiting_gameid}/players`)
            .then((response) => {
                // console.log("Response", response.data);
                for(let i = 0; i<response.data.length; i++){
                    if(response.data[i].status == "READY" && response.data[i].userid != cur_user_id){
                        // console.log("One ready");
                        players_ready.push(response.data[i]);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            })

            setWaitingPlayers(players_ready);
            // console.log("Players ready ", players_ready);
        };
    
        fetchWaitingPlayers();

    }, [waiting_gameid]);


    
// --- inviting new people to the game
    const [invit, setInvit] = useState('');
    const handleInvitChange = (event) => {
        setInvit(event.target.value);
    };
    const [invitMessage, setInvitMessage] = useState('');
    const toggleInvitePlayers = (game_name, invit) => {
        if(invit){
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/players/invite`, {
                myusername: cur_username,
                otherusername: invit
            })
            .then((response) => {
                console.log(response.data.msg);
                setInvitMessage(response.data.msg);
            })
            .catch((error) => {
                console.log(error.response.data.errorMessage);
                setInvitMessage(error.response.data.errorMessage);
            })
        }
    }


// --- starting the game
    const [iniciar_partida, setInitiarPartida] = useState('');
    const [game_number, setGameNumber] = useState('');
    const handleGameNumberChange = (event) => {
        setGameNumber(event.target.value);
    };
    const toggleIniciarPartida = (partida) => {
        console.log("Iniciar partida ", partida);
        if(partida){
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/players/begin`, {
                username: cur_username,
                gameid: partida
            })
            .then((response) => {
                console.log(response.data.msg);
                setInitiarPartida(response.data.msg);
            })
            .catch((error) => {
                console.log(error.response.data.errorMessage);
                setInitiarPartida(error.response.data.errorMessage);
            })
        }
    }

    return(
        <>
        <div className="title">
            <img className="title-bg" src="https://st2.depositphotos.com/23387462/46229/i/600/depositphotos_462298254-stock-photo-minsk-belarus-march-2021-top.jpg" alt="" />
            <div className="title-content">
                <h1>Inicialisacion partida !</h1>
            </div>
        </div>

        <div className="beneath">{playing_gameid  > -1 ? (
            <div className="creation_game">
                <h3>Ya estas jugando en la partida {playing_gameid}!</h3>
                
                <a href="/table">
                    <button>Ir a la partida actual</button>
                </a>
            </div>
        ) : ( 
            <div>
                { waiting_gameid > -1 ? (
                    <div className="creation_game">
                        <h3>Ya haces parte de la partida {waiting_gameid}, esperando su inicio!</h3>
                    </div>
                ) : (   
                    <div> 
                        <h3>No haces parte de ningun partida. Crea tu propria partida o verifica si alguin te ha invitado!</h3>
                        <a href="/join_game">
                            <button>Juntar partida ?</button>
                        </a>

                        <div className="creation_game">
                            <div className="form">
                                <form onSubmit={handleSubmit}>
                                    <div className="input-container">
                                        <label>Entra tu nombre de jugador por la partida que vas a crear ! </label>
                                        <input type="username" value={game_name} onChange={handleGameNameChange}  />
                                    </div>
                                    <button id="create_game" onClick={() => toggleCrearPartida(cur_username, game_name)}>Crear partida</button>
                                </form>
                                <p>{errorCreatePartidaMessage}</p>
                            </div>
                        </div>
                    </div>
                )
                }

                <div>
                    <h2>Aqui son los amigos que has invitado:</h2>
                    <ul>
                    {invitations && invitations.length >  0 ? (
                        invitations.map((friend, index) => ( 
                            <li key={index}>Game: {friend.gameid}, friend : {friend.name}, status : {friend.status}</li>
                            ))
                        ) : (
                            <p>No has invitado nadie a jugar contigo !</p>
                        )}
                    </ul>

                    <ul>
                    {waiting_players && waiting_players.length >  0 ? (
                        waiting_players.map((friend, index) => ( 
                            <li key={index}>Game: {friend.gameid}, friend : {friend.name}, status : {friend.status}</li>
                            ))
                        ) : (
                            <p>Nadie esta listo !</p>
                        )}
                    </ul>

                    <div className="invite_players">
                        <h3>Escribe nombre del usuario que quieres invitar !</h3>
                        <div className="form">
                            <form onSubmit={handleSubmit}>
                                <div className="input-container">
                                    <label>Invitado : </label>
                                    <input type="username" value={invit} onChange={handleInvitChange}  />
                                </div>
                                <button id="invite_players" onClick={() => toggleInvitePlayers(waiting_gameid, invit)}>Invita usuario</button>
                            </form>
                        </div>
                        <p>{invitMessage}</p>
                    </div>

                    <div className="creation_game">
                        <h3>Iniciar partida</h3>
                        <div className="form">
                            <form onSubmit={handleSubmit}>
                                <button className="iniciar_partida_boton" onClick={() => toggleIniciarPartida(waiting_gameid)}>Iniciar partida</button>
                            </form>
                        </div>
                        <p>{iniciar_partida}</p>
                    </div>
                </div>
            </div>

        )}
        </div>
        </>
    )
}
