import { useEffect, useState } from "react"
import axios from "axios"

const cur_username = import.meta.env.VITE_CUR_USERNAME;
const cur_id = import.meta.env.VITE_CUR_ID;

const namesList = {};

export default function Friends() {
    // console.log("Friends component rendered");

// --- current friends
    const [friendsList, setFriendsList] = useState({});
    useEffect(() => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/showfriends`, {
            username: cur_username
        })
        .then((response) => {
            setFriendsList(response.data.friends);
            // console.log(response.data.friends);
        })
        .catch((error) => {
            console.log(error);
        })
        // console.log("Called");
    }, [cur_username]) // loads when the cur_username is modified


    const [friendsNameList, setFriendsNameList] = useState({});
    useEffect(() => {
        if (friendsList.length) {
        const fetchFriends = async () => {
            const friendsNames = [];

            for (let i = 0; i < friendsList.length; i++) {
                let friend_id = - 1;
                if(friendsList[i].frienderid == cur_id){
                    friend_id = friendsList[i].befriendedid;
                } else{
                    friend_id = friendsList[i].frienderid;
                }
                try {
                    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${friend_id}`);
                    friendsNames.push(response.data.username);
                } catch (error) {
                    console.log(error);
                }
            }
            setFriendsNameList(friendsNames);
        };
    
        fetchFriends();
        }
    }, [friendsList]);



// --- to invite friends
    // The error message is also for success
    // const [errorMessage, setErrorMesssage] = useState("");
    // const toggleInviteFriends = (uname) => {
    //     axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/befriend`, {
    //         myusername: cur_username,
    //         friendusername: uname
    //     })
    //     .then((response) => {
    //         // console.log(response.data.msg);
    //         setErrorMesssage(response.data.msg);
    //     })
    //     .catch((error) => {
    //         console.log(error.response.data.errorMessage);
    //         setErrorMesssage(error.response.data.errorMessage);
    //     })

    //     // console.log("Inviting friend " + uname);
    // }

    // const [uname, setUname] = useState('');
    // const handleUnameChange = (event) => {
    //     setUname(event.target.value);
    // };

    // const handleSubmit = (event) => {
    //     event.preventDefault(); // Prevent form submission and page reload    
    // };

    return(
        <>
        <h2>Amistades existentes !</h2>

        <ul>
        {friendsNameList && friendsNameList.length >  0 ? (
            friendsNameList.map((friend, index) => ( 
                <li key={index}> {friend} </li>
                ))
            ) : (
                <p>No tienes amigos en el juego !</p>
            )}
        </ul>

        {/* <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input type="username" value={uname} onChange={handleUnameChange} required />
                </div>
                <button id="login" onClick={() => toggleInviteFriends(uname)}>Invitar</button>
            </form>
        </div>
        <p>{errorMessage}</p> */}
        </>
    )
}