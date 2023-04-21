import CartasEspeciales from "./cartas_especiales"
import Instrucciones from "./instrucciones"
import Tutorial from "./tutorial"

export default function Rules() {
    return(
        <>
        <h1>Reglas y prensetacion del juego !</h1>
        <Instrucciones />
        <Tutorial />
        <CartasEspeciales/>
        </>
    )
}