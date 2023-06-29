import { useEffect, useState } from "react"
import axios from "axios"

const cur_username = "lilianbernot";
const cur_id = 2;


const toggleInviteFriends = (uname) => {
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/befriend`, {
        myusername: cur_username,
        friendusername: uname
    })
    .then((response) => {
        console.log("Join game successfully ! Playing in : " + game_id);
    })
    .catch((error) => {
        console.log(error);
    })

    console.log("Inviting friend " + uname);
}


export default function InviteFriends() {
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

    const [friendsList, setFriendsList] = useState({});
    useEffect(() => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/showfriends`, {
            username: cur_username
        })
        .then((response) => {
            setFriendsList(response.data);
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
        // console.log("Called");
    }, [cur_username])


    const [uname, setUname] = useState('');
    const handleUnameChange = (event) => {
        setUname(event.target.value);
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
            <form>
                <div className="input-container">
                    <label>Username </label>
                    <input type="username" value={uname} onChange={handleUnameChange} required />
                </div>
                <button id="login" onClick={() => toggleInviteFriends(uname)}>Invitar</button>
            </form>
        </div>
        </>
    )
}