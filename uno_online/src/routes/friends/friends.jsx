import { useEffect, useState } from "react"
import axios from "axios"

const cur_username = "lilianbernot";
const cur_id = 2;

export default function Friends() {
    // console.log("Friends component rendered");

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
        // console.log("Called");
    }, [cur_username]) // loads when the cur_username is modified

    const [friendsNamesList, setFriendsNamesList] = useState({});
    useEffect(() => {
        // console.log(friendsList.friends && friendsList.friends.length > 0);
        if(friendsList.friends && friendsList.friends.length > 0){
            const namesList = {};
            // adding the condition to the friend id
            for(let i = 0; i < friendsList.friends.length; i++){
                const friend = friendsList.friends[i];
                let id = null;
                if(friend.id === cur_id){
                    id = friend.frienderid;
                } else{
                    id = friend.id;
                }
                axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`, {
                })
                .then((response) => {
                    namesList[id] = response.data.username;
                })
                .catch((error) => {
                    console.log(error);
                })
            }
            // console.log(namesList);
            setFriendsNamesList(namesList);
            console.log("Friends names : ", friendsNamesList);
            // for (const key in friendsNamesList) {
            //     console.log(friendsNamesList[key]);
            // }
        }
    }, [friendsList]);

    //   checking which id is ourself to print only the other ones

    // const friendsList = [{username : "friend 1"}, {username : "friend 2"}];
    // const friendsList = [];

    console.log("Friends names normal : ", friendsNamesList);

    return(
        <>
        <h2>Amistades existantes !</h2>
        <ul>
        {friendsList.friends && friendsList.friends.length >  0 ? (
            friendsList.friends.map((friend, index) => ( 
                <li key={index}> Id : {friend.id === cur_id ? (
                    <span>{friend.frienderid}</span>
                    ) : (
                    <span>{friend.id}</span>
                )}</li>
                ))
            ) : (
                <p>No tienes amigos en el juego !</p>
            )}
        </ul>
        {/* <ul>
        {friendsNamesList && friendsNamesList.length >  0 ? (
            friendsNamesList.map((friend, index) => ( 
                <li key={index}>{friend}</li>
                ))
            ) : (
                <p>No el juego !</p>
            )}
        </ul> */}
        <ul>
        {friendsNamesList && Object.keys(friendsNamesList).length > 0 ? (
            Object.keys(friendsNamesList).map((key) => (
            <li key={key}>{friendsNamesList[key]}</li>
            ))
        ) : (
            <p>No el juego!</p>
        )}
        </ul>
        </>
    )
}

// We don't want to display the current user
// Have to find the user id 
// Have to find the names of the users of ids in the list
