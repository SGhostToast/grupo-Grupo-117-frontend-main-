export default function Instrucciones() {
    return(
        <>
        <h2>Instrucciónes</h2>
        <p>El usuario tiene una mano llena de cartas que puede ver. 
            Su objetivo es de eliminar todas sus cartas. 
        </p>
        <ul>Al inicio de cada turno, una carta es visible en la mesa. 
            En este momento, tres casos: 
            <li>El usuario sufre de un efecto especial en razón de una carta precedente </li>
            <li>El usuario puede jugar, i.e tiene una carta con misma color o mismo símbolo o una carta especial multicolor. Cuando la carta es jugada, las reglas de la carta se aplican. Si el usuario juega una carta por el tema del símbolo, puede jugar más cartas con el mismo símbolo. La combinación de reglas se aplica</li>
            <li>El usuario no puede jugar: último caso. El usuario saca una carta que no está en juego, es decir, no en las manos de otros usuarios o en la mesa. Entonces el usuario puede jugar: se aplica el punto precedente</li>
            A la salida de eso, su turno es terminado.
        </ul>
        </>
    )
}