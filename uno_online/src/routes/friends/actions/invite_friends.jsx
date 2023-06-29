import { useEffect, useState } from "react"
import axios from "axios"

const cur_username = "lilianbernot";
const cur_id = 2;



export default function InviteFriends() {
    const [errorMessage, setErrorMesssage] = useState("");
    const toggleInviteFriends = (uname) => {
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

    // console.log("Friends component rendered");

    const [usersList, setUsersList] = useState({});
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/users`, {
            username: cur_username
        })
        .then((response) => {
            setUsersList(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [cur_username]) // loads when the cur_username is modified


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
                <h1>¡Puedes invitar amigos aqui!</h1>
            </div>
        </div>
        <h2>Usuarios que puedes invitar !</h2>
        <ul>
        {usersList && usersList.length >  0 ? (
            usersList.map((user, index) => ( 
                <li key={index}>{user.id != cur_id ? (
                    <b>{user.username}</b>
                    ) : (
                    <i>{user.username}</i>
                )}</li>
                ))
            ) : (
                <p>No tienes amigos en el juego !</p>
            )}
        </ul>

        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input type="username" value={uname} onChange={handleUnameChange} required />
                </div>
                <button id="login" onClick={() => toggleInviteFriends(uname)}>Invitar</button>
            </form>
        </div>
        <p>{errorMessage}</p>
        </>
    )
}