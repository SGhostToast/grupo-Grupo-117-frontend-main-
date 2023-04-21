import CartasEspeciales from "./cartas_especiales"
import Instrucciones from "./instrucciones"
import Tutorial from "./tutorial"

export default function Rules() {
    return(
        <>
        <div class="title">
            <img class="title-bg" src="https://st2.depositphotos.com/23387462/46229/i/600/depositphotos_462298254-stock-photo-minsk-belarus-march-2021-top.jpg" alt="" />
            <div class="title-content">
                <h1>Reglas y prensetacion del juego !</h1>
            </div>
        </div>
        <div class="beneath">
        <Principe />
        <Tutorial />
        <CartasEspeciales/>
        </div>
        </>
    )
}