import './styles/header.css'
import profilePic from '../../assets/user.png';
import UserCheck from './userCheck';
import axios from 'axios';
import React, {useState, useContext} from 'react';
import { AuthContext } from '../../auth/AuthContext';

export default function Header() {
    let userMenu = document.getElementById('userMenu');
    function toggleMenu(){
        userMenu.classList.toggle("open-menu");
    }

    const authorized = UserCheck('get', '/auth/check-login');
    const [username, setUsername] = useState(null);
    if (authorized) {
        const { token } = useContext(AuthContext);
        axios({
            method: 'get',
            url: `${import.meta.env.VITE_BACKEND_URL}/users/accesseduser`,
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
            .then(response => {
              console.log(response);
              setUsername(response.data.username);
              console.log(username);
            })
            .catch(error => {
              console.error(error);
            });
    }

    return(
        <header>
            <ul className="navbar">
                <li><a href="/">Bienvenida</a></li>
                <li><a href="/about">Acerca de</a></li>
                {/* <li><a href="/rules">Reglas</a></li> */}
                <li><a href="/mainpage">Jugar</a></li>
                <li><a href="/friendspage">Amistades</a></li>
            </ul>

            
            {authorized ? (
                <div>
                <img src={profilePic} className='userpic' onClick={toggleMenu} />

                    <div className="user-menu-wrap" id='userMenu'>
                        <div className="user-menu">
                        <div className="user-info">
                            <img src={profilePic} className='userpic' id='dropdown' />
                            <h3>{username}</h3>
                        </div>
                        <ul className='user-dropdown'>
                            <li><a href="/">Mi Perfil</a></li>
                            <li><a href="/about">Salir</a></li>
                        </ul>
                        </div>
                    </div>
                </div>
            ) : null}

        </header>
    )
}