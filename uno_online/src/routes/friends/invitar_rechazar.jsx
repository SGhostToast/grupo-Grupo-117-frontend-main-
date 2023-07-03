import { useEffect, useState } from "react"
import axios from "axios"
import "./styles/invit_received.css"

const cur_username = import.meta.env.VITE_CUR_USERNAME;
// const cur_username = "user2";

export default function InvitarRechazar() {

// --- To take care of the invitation
    const [errorMessage, setErrorMesssage] = useState("");
    const toggleAcceptInvitation = (uname) => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/befriend`, {
            myusername: cur_username,
            friendusername: uname
        })
        .then((response) => {
            // console.log(response.data.msg);
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
            // console.log(response.data.msg);
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
        <h2>Puedes invitar, acceptar o rechazar invitaciones !</h2>

        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input type="username" value={uname} onChange={handleUnameChange} required />
                </div>
                <button id="accept" onClick={() => toggleAcceptInvitation(uname)}>Invitar / Acceptar invitacion</button>
                <button id="refuse" onClick={() => toggleRefuseInvitation(uname)}>Rechazar invitacion</button>
            </form>
        </div>
        <p>{errorMessage}</p>
        
        </>
    )
}
