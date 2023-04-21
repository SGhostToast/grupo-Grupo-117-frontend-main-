import './styles/initialization.css'

export default function InitializationGame() {
    return(
        <>
        <div class="title">
            <img class="title-bg" src="https://st2.depositphotos.com/23387462/46229/i/600/depositphotos_462298254-stock-photo-minsk-belarus-march-2021-top.jpg" alt="" />
            <div class="title-content">
                <h1>Inicialisacion partida !</h1>
            </div>
        </div>
        <div class="beneath">
            <div class="creation_game">
                <h3>Codigo de la partida: <span class="codigo">codigo</span></h3>
                <p class="list">Jugadores conectados : 5/6
                    <ul>
                        <li>Jugador 1 (Tu)</li>
                        <li>Jugador 2 [Listo]</li>
                        <li>Jugador 3 [Preparandose]</li>
                        <li>Jugador 4 [Listo]</li>
                        <li>Jugador 5 [Listo]</li>
                    </ul>
                </p>
                <div class="comenzar_partida">
                    <a href="/mainpage/join_game" >
                        <boton class="comenzar_partida_boton">Comenzar partida</boton>
                    </a>
                </div>
            </div>
        </div>
        </>
    )
}