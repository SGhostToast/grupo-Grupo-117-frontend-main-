import './styles/header.css'
import profilePic from '../../assets/user.png';
import UserCheck from './userCheck';

export default function Header() {
    let userMenu = document.getElementById('userMenu');
    function toggleMenu(){
        userMenu.classList.toggle("open-menu");
    }

    const authorized = UserCheck('get', '/auth/check-login');
    console.log(authorized);

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
                            <h3>Name Placeholder</h3>
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