import './styles/crear_partida.css'

export default function CrearPartida() {
    return(
        <>
        <h2>Crear Partida</h2>
        <p>Esta parte tendria un boton que permitiria crear una partida. 
            El usuario llegara a una otra pagina que creera la partida rensenando el ID y preguntando de empezarl la partida cuando el creador quiere jugar !
        </p>
        <p>Existiria también un boton "Juntar partida", llegando a una pagina preguntando por un ID de partida para juntar una. 
            Quizas en esta otra pagina haria las partidas que esperan jugadores para entrar en partidas sin conocer el ID. 
        </p>
        <a href="/initialization_game">
                <button id="crear_partida">Crear partida !</button>
        </a>
        <a href="/join_game">
            <button id="unirse_a_partida">Unirse a partida !</button>
        </a>
        </>
    )
}