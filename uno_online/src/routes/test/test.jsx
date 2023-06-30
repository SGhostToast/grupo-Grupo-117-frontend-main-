import { useEffect, useState } from "react"
import axios from "axios"


export default function Test() {
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

    console.log(usersList[0]);

    return(
        <>
        <div className="title">
            <div className="title-content">
                <h1>Pagina de test de database</h1>
            </div>            
        </div>
        <div>
            {usersList.length > 0 ? ( 
                usersList.map((item, index) => (
                    <p key={index}>{item["username"]}</p>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
        </>
    )
}


{/* <p>{usersList[0]['username']}</p> */}
