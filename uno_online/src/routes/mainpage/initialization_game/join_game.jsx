import { useEffect, useState } from "react"
import axios from "axios"
import './styles/join_game.css'

// const cur_username = import.meta.env.VITE_CUR_USERNAME;
// const cur_username = "user1";
// const cur_user_id = 5;

const cur_username = "user2";
const cur_user_id = 6;

// const cur_username = "ghosttoast";
// const cur_user_id = 1;

export default function JoinGame() {
// --- shared components 
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent form submission and page reload    
    };

// --- already in game ?
    const [ingame, setIngame] = useState("");
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/players/meingame/${cur_user_id}`)
        .then((response) => {
            // console.log(response.data);
            setIngame(response.data.msg);
        })
        .catch((error) => {
            // console.log(error.response.data.errorMessage);
            setIngame("");
        })
    }, [cur_username]) // loads when the cur_username is modified

    const [waitingGame, setWaitingGame] = useState("");
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/players/mewaitinggame/${cur_user_id}`)
        .then((response) => {
            console.log(response.data);
            setWaitingGame(response.data);
        })
        .catch((error) => {
            console.log(error.response.data.errorMessage);
            setWaitingGame("");
        })
    }, [cur_username]) // loads when the cur_username is modified


// --- invitations already sent
    const [invitationsReceived, setInvitationsReceived] = useState("");
    const [invitationsSent, setInvitationsSent] = useState("");

    useEffect(() => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/players/invitations`, {
            username: cur_username
        })
        .then((response) => {
            // console.log(response.data);
            if(response.data.msg_you_invited){
                setInvitationsSent(response.data.invited_to_your_game);
            } 
            if (response.data.msg_you_were_invited){
                setInvitationsReceived(response.data.you_were_invited_to);
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }, [cur_username]) // loads when the cur_username is modified

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

    return(
        <>
        <div className="title">
            <img className="title-bg" src="https://st2.depositphotos.com/23387462/46229/i/600/depositphotos_462298254-stock-photo-minsk-belarus-march-2021-top.jpg" alt="" />
            <div className="title-content">
                <h1>Juntar partida !</h1>
            </div>
        </div>

        {ingame ? (
            <div>
                <h2>Ya haces parte de un juego :</h2>
                <p>{ingame}</p>

                <a href="/table">
                    <button>Ir a la partida !</button>
                </a>
            </div>
        ) : ( 
            <div>
            {waitingGame ? (
                <div>
                    <h2>Ya estas esperando el juego {waitingGame.player.gameid}</h2>

                    <a href="/table">
                        <button>Ir a la partida !</button>
                    </a>
                </div>
            ) : ( 
                <p>No esperas ningun juego !</p>
            )}
            <h2>Aqui son los amigos que te han invitado:</h2>
            <ul>
            {invitationsReceived && invitationsReceived ? (
                invitationsReceived.map((friend, index) => ( 
                    <li key={index}>Game: {friend.gameid}, status : {friend.status}</li>
                    ))
                ) : (
                    <p>Nadie te ha invitado!</p>
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

            <h2>Aqui son los amigos que has invitado a tu partida !</h2>
            <ul>
            {invitationsSent && invitationsSent ? (
                invitationsSent.map((invit, index) => ( 
                    <li key={index}>Game: {invit.gameid}, user : {invit.name}, status : {invit.status}</li>
                    ))
                ) : (
                    <p>Nadie te ha invitado!</p>
                )}
            </ul>
            <a href="/create_game">
                <button>Va a crear tu partida !</button>
            </a>
        </div>
        )}

        </>
    )
}
