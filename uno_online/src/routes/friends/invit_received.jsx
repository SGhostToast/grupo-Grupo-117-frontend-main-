import { useEffect, useState } from "react"
import axios from "axios"

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
    // console.log(invitReceivedList);

    // const invitReceivedList = [{username : "invit 1"}, {username : "invit 2"}];
    // const invitReceivedList = [];

    return(
        <>
        <h2>Invitaciones que has recibido !</h2>
        <ul>
        {invitReceivedList.length > 0 ? (
            invitReceivedList.map((friend, index) => ( 
                <li key={index}>{friend.username}</li>
                ))
            ) : (
                <p>No tienes invitaciones en el juego !</p>
            )}
        </ul>
        
        </>
    )
}
