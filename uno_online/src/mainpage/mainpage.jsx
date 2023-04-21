import "./styles/mainpage.css"

import Instrucciones from "./parts/instrucciones"
import Estadisticas from "./parts/estadisticas"
import CrearPartida from "./parts/crear_partida"
import CartasEspeciales from "./parts/cartas_especiales"
import Tutorial from "./parts/tutorial"

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
            <Instrucciones />
            <Tutorial />
            <CartasEspeciales />
        </div>
        </>
    )
}