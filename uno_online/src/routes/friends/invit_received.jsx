import { useEffect, useState } from "react"
import axios from "axios"
import "./styles/invit_received.css"

const cur_username = "lilianbernot";

export default function InvitReceived() {
    const [invitReceivedList, setInvitReceivedList] = useState({});
    useEffect(() => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/pendingfriends`, {
            username: cur_username
        })
        .then((response) => {
            setInvitReceivedList(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])
    // console.log(invitReceivedList.pending_invites);

    // const invitReceivedList = [{username : "invit 1"}, {username : "invit 2"}];
    // const invitReceivedList = [];

    // To take care of the invitation
    const [errorMessage, setErrorMesssage] = useState("");
    const toggleAcceptInvitation = (uname) => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/befriend`, {
            myusername: cur_username,
            friendusername: uname
        })
        .then((response) => {
            console.log(response.data.msg);
            setErrorMesssage(response.data.msg);
        })
        .catch((error) => {
            console.log(error.response.data.errorMessage);
            setErrorMesssage(error.response.data.errorMessage);
        })
    }

    const toggleRefuseInvitation = (uname) => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/unfriend`, {
            myusername: cur_username,
            otherusername: uname
        })
        .then((response) => {
            console.log(response.data.msg);
            setErrorMesssage(response.data.msg);
        })
        .catch((error) => {
            console.log(error.response.data.errorMessage);
            setErrorMesssage(error.response.data.errorMessage);
        })
    }

    const [uname, setUname] = useState('');
    const handleUnameChange = (event) => {
        setUname(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent form submission and page reload    
    };

    return(
        <>
        <h2>Invitaciones que has recibido !</h2>
        <ul>
        {invitReceivedList.pending_invites && invitReceivedList.pending_invites.length > 0 ? (
            invitReceivedList.pending_invites.map((friend, index) => ( 
                <li key={index}>Id : {friend.frienderid}</li>
                ))
            ) : (
                <p>No tienes invitaciones en el juego !</p>
            )}
        </ul>

        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input type="username" value={uname} onChange={handleUnameChange} required />
                </div>
                <button id="accept" onClick={() => toggleAcceptInvitation(uname)}>Acceptar invitacion</button>
                <button id="refuse" onClick={() => toggleRefuseInvitation(uname)}>Rechazar invitacion</button>
            </form>
        </div>
        <p>{errorMessage}</p>
        
        </>
    )
}
