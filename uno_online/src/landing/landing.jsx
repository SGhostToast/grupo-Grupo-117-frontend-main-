import './styles/landing.css'

export default function Landing() {
    return(
        <>
        <div class="title">
            <img class="title-bg" src="https://st2.depositphotos.com/23387462/46229/i/600/depositphotos_462298254-stock-photo-minsk-belarus-march-2021-top.jpg" alt="" />
            <div class="title-content">
                <div id="logo">
                    <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/UNO_Logo.svg/640px-UNO_Logo.svg.png"} alt="uno_logo"/>
                </div>
                <h1>¡Bienvenidxs a UNO Online!</h1>
            </div>
        </div>
        <div class="beneath">
            <h2>Aquí va un slogan que aún no se me ocurre</h2>
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