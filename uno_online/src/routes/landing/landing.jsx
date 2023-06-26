import './styles/landing.css'

export default function Landing() {
    return(
        <>
        <div className="title">
            <img className="title-bg" src="https://st2.depositphotos.com/23387462/46229/i/600/depositphotos_462298254-stock-photo-minsk-belarus-march-2021-top.jpg" alt="" />
            <div className="title-content">
                <div id="logo">
                    <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/UNO_Logo.svg/640px-UNO_Logo.svg.png"} alt="uno_logo"/>
                </div>
                <h1>¡Bienvenidos a UNO Online!</h1>
            </div>
        </div>
        <div className="beneath">
            <h2>¡Deshazte de tus cartas antes que el resto y consigue la victoria!</h2>
            <a href="/">
                <button id="login">Log In</button>
            </a>
            <a href="/">
                <button id="signin">Sign In</button>
            </a>
        </div>
        </>
    )
}