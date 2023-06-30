import axios from "axios"
import { useState } from "react"


const toggleLogin = (uname, pass) => {
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/login`, {
        // username: "lilianbernot",
        // password: "lilianbernot.123",
        username: uname,
        password: pass,
    })
    .then((response) => {
        console.log("Login successful ! Logges as : " + uname);
    })
    .catch((error) => {
        console.log(error);
        console.log(error['response']['data']['errorMessage']);
    })
}


export default function Login() {
    
    const [uname, setUname] = useState('');
    const [pass, setPass] = useState('');
    const handleUnameChange = (event) => {
        setUname(event.target.value);
    };
    const handlePassChange = (event) => {
        setPass(event.target.value);
    };


    return(
        <>
        <div className="title">
            <h1>¡Login!</h1>

            <div className="form">
            {/* <form onSubmit={handleSubmit}> */}
            <form>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" value={uname} onChange={handleUnameChange} required />
                    {/* {renderErrorMessage("uname")} */}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" value={pass} onChange={handlePassChange} required />
                    {/* {renderErrorMessage("pass")} */}
                </div>
                <button id="login" onClick={() => toggleLogin(uname, pass)}>Log In</button>
            </form>
            </div>
        </div>
        </>
    )
}

