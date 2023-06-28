import './styles/estadisticas.css'
import { useEffect, useState } from "react"
import axios from "axios"


export default function Estadisticas() {
    const [usersList, setUsersList] = useState({});
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/users`)
        .then((response) => {
            setUsersList(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])
    // console.log(usersList[0]);


    const [maxVictories, setMaxVictories] = useState(-1);
    const [usernameMaxVictories, setUsernameMaxVictories] = useState(null)
    useEffect ( () => {
        for (let i = 0; i < usersList.length; i++) {
            const user = usersList[i];
            if (user.won_matches > maxVictories) {
                setMaxVictories(user.won_matches);
                setUsernameMaxVictories(user.username);
            }
        }
        
    })
    // console.log(userNameWithMostWonMatches, maxWonMatches);


    const [tablesList, setTablesList] = useState({});
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/tables`)
        .then((response) => {
            setTablesList(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])
    // console.log(tablesList.length);

    return(
        <>
        <div className="information_block">
            <h3>Estadisticas !</h3>
            <p>Numero de usuarios actuales : {usersList.length}</p>
            <p>Numero de partidas actuales : {tablesList.length}</p>
            <p>Usuarios con más victorias : 
            {maxVictories > 0 ? 
                    <p><b>{usernameMaxVictories}</b> with <b>{maxVictories}</b> victories !</p>
                : <p>No victories for now !</p>}
            </p>
        </div>
        </>
    )
}