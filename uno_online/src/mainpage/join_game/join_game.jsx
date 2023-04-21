import "./styles/join_game.css"

export default function JoinGame() {
    return(
        <>
        <div class="title">
            <img class="title-bg" src="https://st2.depositphotos.com/23387462/46229/i/600/depositphotos_462298254-stock-photo-minsk-belarus-march-2021-top.jpg" alt="" />
            <div class="title-content">
                <h1>Unirse a partida !</h1>
            </div>
        </div>
        <div class="beneath">
            <div class="partida">
                <h3>Partida disponible</h3>
                <p>Codigo partida : <span class="codigo">codigo</span></p>
                <div class="unir_partida">
                    <a href="/mainpage/join_game" >
                        <boton class="unir_partida_boton">Unirme a partida</boton>
                    </a>
                </div>
            </div>

            <div class="partida">
                <h3>Partida disponible</h3>
                <p>Codigo partida : <span class="codigo">codigo</span></p>
                <div class="unir_partida">
                    <a href="/mainpage/join_game" >
                        <boton class="unir_partida_boton">Unirme a partida</boton>
                    </a>
                </div>
            </div> 
            
            <div class="partida">
                <h3>Partida disponible</h3>
                <p>Codigo partida : <span class="codigo">codigo</span></p>
                <div class="unir_partida">
                    <a href="/mainpage/join_game" >
                        <boton class="unir_partida_boton">Unirme a partida</boton>
                    </a>
                </div>
            </div>
        </div>
        </>
    )
}