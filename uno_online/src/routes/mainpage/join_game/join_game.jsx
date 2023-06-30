import { useEffect, useState } from "react"
import axios from "axios"
import './styles/join_game.css'

const cur_username = import.meta.env.VITE_CUR_USERNAME;
// const cur_username = "user1";
// const gameid = 25;


export default function JoinGame() {
// --- shared components 
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent form submission and page reload    
    };

// --- already in game ?
    const [ingame, setIngame] = useState("");

    useEffect(() => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/players/accept`, {
            username: cur_username,
            gameid: -1 // to be sure it does not exist
        })
        .then((response) => {
            console.log(response.data.msg);
            setIngame(response.data.msg);
        })
        .catch((error) => {
            console.log(error.response.data.errorMessage);
            setIngame(error.response.data.errorMessage);
        })
        // console.log("Called");
    }, [cur_username]) // loads when the cur_username is modified



// --- invitations already sent
    const [invitationsReceived, setInvitationsReceived] = useState("");

    useEffect(() => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/players/invitations`, {
            username: cur_username
        })
        .then((response) => {
            setInvitationsReceived(response.data.you_were_invited_to);
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
                <h2>Aqui son los amigos que te han invitado:</h2>
                <ul>
                {invitationsReceived && invitationsReceived.length >  0 ? (
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
            </div>
        )}

        </>
    )
}
