import './styles/header.css'
export default function Header() {
    return(
        <header>
            <ul className="navbar">
                <li><a href="/">Bienvenida</a></li>
                <li><a href="/about">Acerca de</a></li>
                {/* <li><a href="/rules">Reglas</a></li> */}
                <li><a href="/mainpage">Jugar</a></li>
                <li><a href="/friendspage">Amistades</a></li>
            </ul>
        </header>
    )
}