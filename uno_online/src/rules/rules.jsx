import CartasEspeciales from "./cartas_especiales"
import Principe from "./principe"
import Tutorial from "./tutorial"

export default function Rules() {
    return(
        <>
        <h1>Reglas y prensetacion del juego !</h1>
        <Principe />
        <Tutorial />
        <CartasEspeciales/>
        </>
    )
}