import "./styles/mainpage.css"

import Instrucciones from "../mainpage/instrucciones"
import Estadisticas from "../mainpage/estadisticas"
import CrearPartida from "../mainpage/crear_partida"


export default function MainPage() {
    return(
        <>
        <Instrucciones />
        <CrearPartida />
        <Estadisticas />
        </>
    )
}