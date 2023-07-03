import React, { useState, useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import axios from 'axios';

export default function Login() {
    const { token, setToken } = useContext(AuthContext);
    const [mail, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [msg, setMsg] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log("Form pressed")
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        {
            mail: mail,
            password: password
        }).then((response) => {
            console.log('Login successful');
            setError(false);
            setMsg(`¡Login exitoso! Bienvenidx ${response.data.username}.`);
            // Recibimos el token y lo procesamos
            const access_token = response.data.access_token;
            setToken(access_token);
            console.log("Se seteo el token: ", token);
        }).catch((error) => {
            console.error('An error occurred while trying to login:', error);
            setError(true);// aquí puede haber más lógica para tratar los errores
        });
    };

    return(
        <div className="title">
            <h1>Login</h1>

            <div className="auth">
            {msg.length > 0 && <div className="successMsg"> {msg} </div>}
            {error && <div className="error">Hubo un error con el Login, por favor trata nuevamente.</div>}
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label>Email
                            <input
                                type="email"
                                name="mail"
                                value={mail}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div className="input-container">
                        <label>Password
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                         </label>
                    </div>
                    <input type="submit" value="Ingresar" />
                </form>
            </div>
        </div>
    );
}

