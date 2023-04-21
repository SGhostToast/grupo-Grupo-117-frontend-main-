import CartasEspeciales from "./cartas_especiales"
import Principe from "./principe"
import Tutorial from "./tutorial"

export default function Rules() {
    return(
        <>
        <Principe />
        <Tutorial />
        <CartasEspeciales/>
        </>
    )
}