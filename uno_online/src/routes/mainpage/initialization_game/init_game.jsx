import { useEffect, useState } from "react"
import axios from "axios"
import './styles/initialization.css'

// const cur_username = import.meta.env.VITE_CUR_USERNAME;
const cur_username = "user1";


export default function InitGame() {
// --- Creation of the game
    const [errorMessage, setErrorMesssage] = useState("");
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

    const [game_name, setGameName] = useState('');
    const handleGameNameChange = (event) => {
        setGameName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent form submission and page reload    
    };

// --- invitations already sent
    const [invitations, setInvitations] = useState("");
    const [invitationsReceived, setInvitationsReceived] = useState("");

    const toggleSeeInvitations = () => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/players/invitations`, {
            username: cur_username,
        })
        .then((response) => {
            console.log(response);
            if(response.data.invited_to_your_game){
                setInvitations(response.data.invited_to_your_game);
            } else {
                setInvitationsReceived(response.data.you_were_invited_to);
            }
        })
        .catch((error) => {
            console.log("error");
            console.log(error);
            // setInvitations(error.response.data.errorMessage);
        })        
    }

    const toggleCloseInvitations = () => {
        console.log("Close invitations");
        setInvitations([]);
        setInvitationsReceived([]);
    }

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

// --- Accepting / refusing invitations to game
    const [invitador, setInvitador] = useState('');
    const handleInvitadorChange = (event) => {
        setInvitador(event.target.value);
    };
    const [invitadorMessage, setInvitadorMessage] = useState('');
    const toggleAcceptInvitation = (invitador) => {
        console.log("Accepting invitation ", invitador);
        if(invitador){
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/players/accept`, {
                username: cur_username,
                gameid: invitador
            })
            .then((response) => {
                console.log(response.data.msg);
                setInvitadorMessage(response.data.msg);
            })
            .catch((error) => {
                console.log(error.response.data.errorMessage);
                setInvitadorMessage(error.response.data.errorMessage);
            })
        }
    }

    const toggleRefuseInvitation = (invitador) => {
        console.log("Refusing invitation ", invitador);
        if(invitador){
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/players/quit`, {
                username: cur_username,
                gameid: invitador
            })
            .then((response) => {
                console.log(response.data.msg);
                setInvitadorMessage(response.data.msg);
            })
            .catch((error) => {
                console.log(error.response.data.errorMessage);
                setInvitadorMessage(error.response.data.errorMessage);
            })
        }
    }

// --- starting the game

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
                <h3>Escribe tu nombre de jugador la partida que quieres crear !</h3>
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <div className="input-container">
                            <label>Tu nombre de jugador </label>
                            <input type="username" value={game_name} onChange={handleGameNameChange} required />
                        </div>
                        
                        <button className="comenzar_partida_boton" onClick={() => toggleCrearPartida(game_name)}>Crear partida</button>
                    </form>
                </div>
                <p>{errorMessage}</p>
            </div>
        </div>

        <div>
            <button id="see_invitations" onClick={() => toggleSeeInvitations()}>See invitations</button>
            <button id="close_invitations" onClick={() => toggleCloseInvitations()}>Close invitations</button>
        </div>

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
        <div className="invite_players">
            <h3>Escribe nombre del usuario que quieres invitar !</h3>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label>Invitado : </label>
                        <input type="username" value={invit} onChange={handleInvitChange}  />
                    </div>
                    <button id="invite_players" onClick={() => toggleInvitePlayers(game_name, invit)}>Invita usuario</button>
                </form>
            </div>
            <p>{invitMessage}</p>
        </div>


        <h2>Aqui son los amigos que te han invitado:</h2>
        <ul>
        {invitationsReceived && invitationsReceived.length >  0 ? (
            invitationsReceived.map((friend, index) => ( 
                <li key={index}>Game: {friend.gameid}, status : {friend.status}</li>
                ))
            ) : (
                <p>No has invitado nadie a jugar contigo !</p>
            )}
        </ul>

        <div className="accept_invitations">
            <h3>Acceptar invitacion !</h3>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label>Id de partida que te ha invitado : </label>
                        <input type="username" value={invitador} onChange={handleInvitadorChange}  />
                    </div>
                    <button id="accept_invitation" onClick={() => toggleAcceptInvitation(invitador)}>Acceptar invitacion</button>
                    <button id="refuse_invitation" onClick={() => toggleRefuseInvitation(invitador)}>Rechazar invitacion</button>
                </form>
            </div>
            <p>{invitadorMessage}</p>
        </div>
        </>
    )
}


{/* <h4>Entra el username de las personas que quieres invitar</h4>
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
                        </div> */}