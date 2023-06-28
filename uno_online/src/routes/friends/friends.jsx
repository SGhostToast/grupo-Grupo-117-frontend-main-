import { useEffect, useState } from "react"
import axios from "axios"

const cur_username = "lilianbernot";

export default function Friends() {
    const [friendsList, setFriendsList] = useState({});
    useEffect(() => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/showfriends`, {
            username: cur_username
        })
        .then((response) => {
            setFriendsList(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])
    console.log(friendsList);

    // const friendsList = [{username : "friend 1"}, {username : "friend 2"}];
    // const friendsList = [];

    return(
        <>
        <h2>Amistades existantes !</h2>
        <ul>
        {friendsList.length > 0 ? (
            friendsList.map((friend, index) => ( 
                <li key={index}>{friend.username}</li>
                ))
            ) : (
                <p>No tienes amigos en el juego !</p>
            )}
        </ul>
        
        </>
    )
}

