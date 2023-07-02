import { useEffect, useState } from "react"
import axios from "axios"
import "./styles/invit_received.css"

const cur_username = import.meta.env.VITE_CUR_USERNAME;
// const cur_username = "user2";

export default function InvitReceived() {

// --- current invitations
    const [invitReceivedList, setInvitReceivedList] = useState({});
    useEffect(() => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/pendingfriends`, {
            username: cur_username
        })
        .then((response) => {
            setInvitReceivedList(response.data.pending_invites);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

    const [invitReceivedtSentNamesList, setInvitReceivedtSentNamesList] = useState({});
    useEffect(() => {
        if (invitReceivedList.length) {
        const fetchFriends = async () => {
            const friendsNames = [];

            for (let i = 0; i < invitReceivedList.length; i++) {
                let friend_id = invitReceivedList[i].frienderid;
                try {
                    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${friend_id}`);
                    friendsNames.push(response.data.username);
                } catch (error) {
                    console.log(error);
                }
            }
            setInvitReceivedtSentNamesList(friendsNames);
        };
    
        fetchFriends();
        }
    }, [invitReceivedList]);

    return(
        <>
        <h2>Invitaciones que has recibido !</h2>

        <ul>
        {invitReceivedtSentNamesList && invitReceivedtSentNamesList.length > 0 ? (
            invitReceivedtSentNamesList.map((friend, index) => ( 
                <li key={index}>{friend}</li>
                ))
            ) : (
                <p>No tienes invitaciones en el juego !</p>
            )}
        </ul>
        </>
    )
}
