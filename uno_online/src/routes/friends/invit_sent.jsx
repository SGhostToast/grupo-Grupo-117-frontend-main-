import { useEffect, useState } from "react"
import axios from "axios"

const cur_username = import.meta.env.VITE_CUR_USERNAME;

export default function InvitSent() {

// --- current sent invitations
    const [invitSentList, setInvitSentList] = useState({});
    useEffect(() => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/pendingrequests`, {
            username: cur_username
        })
        .then((response) => {
            setInvitSentList(response.data.pending_requests);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

    const [invitSentNamesList, setInvitSentNamesList] = useState({});
    useEffect(() => {
        if (invitSentList.length) {
        const fetchFriends = async () => {
            const friendsNames = [];

            for (let i = 0; i < invitSentList.length; i++) {
                let friend_id = invitSentList[i].befriendedid;
                try {
                    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${friend_id}`);
                    friendsNames.push(response.data.username);
                } catch (error) {
                    console.log(error);
                }
            }
            setInvitSentNamesList(friendsNames);
        };
    
        fetchFriends();
        }
    }, [invitSentList]);


    return(
        <>
        <h2>Invitaciones que has enviado !</h2>

        <ul>
        {invitSentNamesList && invitSentNamesList.length > 0 ? (
            invitSentNamesList.map((friend, index) => ( 
                <li key={index}>{friend}</li>
                ))
            ) : (
                <p>No has enviado invitaciones en el juego !</p>
            )}
        </ul>
        
        </>
    )
}
