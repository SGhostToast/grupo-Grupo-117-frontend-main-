import "./styles/join_game.css"
import { useEffect, useState } from "react"
import axios from "axios"


export default function CurrentGames() {
    const [gamesList, setGamesList] = useState({});

    // importing the list of tables from the back
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/tables`)
        .then((response) => {
            setGamesList(response.data);

        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

    console.log(gamesList);

    // const [friendsNameList, setFriendsNameList] = useState({});
    // useEffect(() => {
    //     if (gamesList.length) {
    //     const fetchFriends = async () => {
    //         const friendsNames = [];

    //         for (let i = 0; i < gamesList.length; i++) {
    //             let friend_id = - 1;
    //             if(gamesList[i].frienderid == cur_id){
    //                 friend_id = gamesList[i].befriendedid;
    //             } else{
    //                 friend_id = gamesList[i].frienderid;
    //             }
    //             try {
    //                 const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${friend_id}`);
    //                 friendsNames.push(response.data.username);
    //             } catch (error) {
    //                 console.log(error);
    //             }
    //         }
    //         setFriendsNameList(friendsNames);
    //     };
    
    //     fetchFriends();
    //     }
    // }, [gamesList]);


    return(
        <>
        <div className="title">
            <img className="title-bg" src="https://st2.depositphotos.com/23387462/46229/i/600/depositphotos_462298254-stock-photo-minsk-belarus-march-2021-top.jpg" alt="" />
            <div className="title-content">
                <h1>Ver las partidas existantes !</h1>
            </div>
        </div>
        <div className="beneath">
            {gamesList.length > 0 ? (
                gamesList.map((code, index) => ( 
                    <div className="partida" key={index}>
                        <h3>Partida existante</h3>
                        <p>Codigo partida : <span className="codigo">{gamesList[index]["id"]}</span></p>
                        <p>Creador : <span className="creador">{gamesList[index]["ownerid"]}</span></p>
                    </div>
                ))
            ) : (
                <p>No games to join !</p>
            )}
        </div>
        </>
    )
}
