import { useEffect, useState } from "react"
import axios from "axios"

const cur_username = "lilianbernot";

export default function InvitSent() {
    const [invitSentList, setInvitSentList] = useState({});
    useEffect(() => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/pendingrequests`, {
            username: cur_username
        })
        .then((response) => {
            setInvitSentList(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])
    console.log(invitSentList);

    // const invitSentList = [{username : "invit sent 1"}, {username : "invit sent 2"}];
    // const invitSentList = [];

    return(
        <>
        <h2>Invitaciones que has enviado !</h2>
        <ul>
        {invitSentList.length > 0 ? (
            invitSentList.map((friend, index) => ( 
                <li key={index}>{friend.username}</li>
                ))
            ) : (
                <p>No has enviado invitaciones en el juego !</p>
            )}
        </ul>
        
        </>
    )
}
