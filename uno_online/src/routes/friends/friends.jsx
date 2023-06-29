import { useEffect, useState } from "react"
import axios from "axios"

const cur_username = "lilianbernot";
const cur_id = 2;
const namesList = {};


export default function Friends() {
    // console.log("Friends component rendered");

    const [friendsList, setFriendsList] = useState({});
    useEffect(() => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/showfriends`, {
            username: cur_username
        })
        .then((response) => {
            // const friends = response.data.friends;
            // if(friends && friends.length > 0){
            //     // console.log(friends);
            //     // adding the condition to the friend id
            //     for(let i = 0; i < friends.length; i++){
            //         const friend = friends[i];
            //         let id = null;
            //         if(friend.id === cur_id){
            //             id = friend.frienderid;
            //         } else{
            //             id = friend.id;
            //         }
            //         axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`, {
            //         })
            //         .then((response_bis) => {
            //             namesList[id] = response_bis.data.username;
            //         })
            //         .catch((error_bis) => {
            //             console.log(error_bis);
            //         })
            //     }
            // }

            setFriendsList(response.data);
            // console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
        // console.log("Called");
    }, [cur_username]) // loads when the cur_username is modified

// --- to invite friends
    // The error message is also for success
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

    const [uname, setUname] = useState('');
    const handleUnameChange = (event) => {
        setUname(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent form submission and page reload    
    };

    return(
        <>
        <h2>Amistades existentes !</h2>
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

        {/* <ul>
        {namesList && Object.keys(namesList).length > 0 ? (
            Object.keys(namesList).map((key) => (
            <li key={key}>{namesList[key]}</li>
            ))
        ) : (
            <p>No el juego!</p>
        )}
        </ul> */}
        </>
    )
}

// We don't want to display the current user
// Have to find the user id 
// Have to find the names of the users of ids in the list
