import "./styles/mainpage.css"

import Instrucciones from "../mainpage/instrucciones"
import Estadisticas from "../mainpage/estadisticas"
import CrearPartida from "../mainpage/crear_partida"


export default function MainPage() {
    return(
        <>
        <div class="title">
            <img class="title-bg" src="https://st2.depositphotos.com/23387462/46229/i/600/depositphotos_462298254-stock-photo-minsk-belarus-march-2021-top.jpg" alt="" />
            <div class="title-content">
                <h1>Titulo bacán</h1>
            </div>
        </div>
        <div class="beneath">
            {/* <Instrucciones /> */}
            <CrearPartida />
            <Estadisticas />
        </div>
        </>
    )
}