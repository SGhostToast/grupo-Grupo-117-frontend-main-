import { useEffect, useState } from "react"
import axios from "axios"

const cur_username = "lilianbernot";
const cur_id = 2;


export default function AcceptingInvitations() {
    // The error message is also for success
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

        console.log("Inviting friend " + uname);
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

        console.log("Inviting friend " + uname);
    }

// --- displaying the users which can be invited
// miss something to delete the users you are already friend with
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

    const [uname, setUname] = useState('');
    const handleUnameChange = (event) => {
        setUname(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent form submission and page reload    
    };

    return(
        <>
        <div className="title">
            <img className="title-bg" src="https://st2.depositphotos.com/23387462/46229/i/600/depositphotos_462298254-stock-photo-minsk-belarus-march-2021-top.jpg" alt="" />
            <div className="title-content">
                <h1>¡Puedes acceptar las invitaciones que tienes aqui!</h1>
            </div>
        </div>
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
                <button id="login" onClick={() => toggleAcceptInvitation(uname)}>Acceptar invitacion</button>
                <button id="refuse" onClick={() => toggleRefuseInvitation(uname)}>Rechazar invitacion</button>
            </form>
        </div>
        <p>{errorMessage}</p>
        </>
    )
}