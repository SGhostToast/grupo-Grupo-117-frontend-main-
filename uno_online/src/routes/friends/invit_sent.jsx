import { useEffect, useState } from "react"
import axios from "axios"

const cur_username = import.meta.env.VITE_CUR_USERNAME;

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
    console.log(invitSentList.pending_requests);

    // const invitSentList = [{username : "invit sent 1"}, {username : "invit sent 2"}];
    // const invitSentList = [];

    return(
        <>
        <h2>Invitaciones que has enviado !</h2>
        <ul>
        {invitSentList.pending_requests && invitSentList.pending_requests.length > 0 ? (
            invitSentList.pending_requests.map((friend, index) => ( 
                <li key={index}>Id : {friend.befriendedid}</li>
                ))
            ) : (
                <p>No has enviado invitaciones en el juego !</p>
            )}
        </ul>
        
        </>
    )
}
