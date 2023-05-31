import "./styles/tutorial.css"

import React, { useState } from 'react';
import data from './tutorial.json';

export default function Tutorial () {
  const [currentIndex, setCurrentIndex] = useState(0);
  const content = data.content;

//   Definition of the actions of the button to change the tutorial part
  const handleClick = (direction) => {
    if (direction === 'prev') {
      setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : content.length - 1));
    } else if (direction === 'next') {
      setCurrentIndex((prevIndex) => (prevIndex < content.length - 1 ? prevIndex + 1 : 0));
    }
  };

//   Current content of the tutorial
  const currentContent = content[currentIndex];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const Imagecontent = currentContent.images;

//   Definition of the actions of the button to change the image of the tutorial part
  const handleImageClick = (Imagedirection) => {
    if (Imagedirection === 'prevImage') {
        setCurrentImageIndex((prevImageIndex) => (prevImageIndex > 0 ? prevImageIndex - 1 : Imagecontent.length - 1));
    } else if (Imagedirection === 'nextImage') {
        setCurrentImageIndex((prevImageIndex) => (prevImageIndex < Imagecontent.length - 1 ? prevImageIndex + 1 : 0));
    }
  };

  const currentImageContent = Imagecontent[currentImageIndex];

  return (
    <div>
        <h2>{currentContent.title}</h2>
        <div className="container">
            <div className='tile'>
                <button onClick={() => handleClick('prev')}>&lt;</button>
            </div>

            {/* Center : content of the tutorial */}
            <div className='tile'>
                <div className='instruction_container'>
                    <div className="tile" dangerouslySetInnerHTML={{ __html: currentContent.html }}>
                    </div>

                    {/* Right : images of the tutorial */}
                    <div className="tile">
                        <h2>{currentImageContent.title}</h2>
                        <div className='image_container'>
                            <div className='tile'>
                                <button onClick={() => handleImageClick('prevImage')}>&lt;</button>
                            </div>
                            
                            {/* Center : image of the tutorial */}
                            <div className='tile'>
                                <img src={currentImageContent.imagePath}/>
                            </div>
                            
                            <div className='tile'>
                                <button onClick={() => handleImageClick('nextImage')}>&gt;</button>
                            </div>
                        </div>
                        
                        <div className='number_page'>
                                <p>{currentImageContent.id}/{Imagecontent.length}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='tile'>
                <button onClick={() => handleClick('next')}>&gt;</button>
            </div>
        </div>
        <div className='number_page'>
            <p>{currentContent.id}/{content.length}</p>
        </div>
    </div>
  );
};



// export default function Page() {
//     return(
//         <>
//         <div class="tutorial">
//             <h2>Tutorial</h2>

//             <div class="ligne">
//                 <div class="column">
//                     <p>Asi empieza el turno de un jugador : cartas en la mesa, cartas en su mano y cartas en la reserva.</p>
//                     <p>Imaginamos que la carta en la mesa es un 7 rojo. 
//                         El usuario puede jugar en 3 casos : 
//                         <ul>
//                             <li>Tiene una carta con la color roja</li>
//                             <li>Tiene una carta con el numero 7. Si el usuario tiene mas de una carta de valor 7, puede jugar todas</li>
//                             <li>Tiene una carta especial que le permite jugar</li>
//                         </ul>
//                     </p>
//                 </div>
//                 <div class="column">
//                     <div class="image-fader">
//                         <img src={Cartas} class="image" id="normal"/>
//                         <img src={Cartas} class="image" id="normal_1"/>
//                         <img src={Cartas} class="image" id="normal_2"/>
//                         <img src={Cartas} class="image" id="normal_3"/>
//                     </div>
//                 </div>
//             </div>  

//             <div class="ligne">
//                 <div class="column">
//                     <div class="image-fader">
//                         <img src={Cartas} class="image" id="normal"/>
//                         <img src={Cartas} class="image" id="normal_1"/>
//                         <img src={Cartas} class="image" id="normal_2"/>
//                         <img src={Cartas} class="image" id="normal_3"/>
//                     </div>
//                 </div>
//                 <div class="column">
//                     <p>Si no somos en uno de esos casos, el jugador debe tomar una carta de la reserva.</p>
//                     <p>Ahora, puede ver de nuevo si puede jugar. 
//                     Si puede, el punto precedente se aplica. 
//                     Si no, el jugador siguiente juega.</p>
//                 </div>
//             </div>

//             <div class="ligne">
//                 <div class="column">
//                     <p>Si el jugador tiene una unica carta, el debe anunciar "Uno" antes de que los otros dicen "Contro-Uno".</p>
//                     <p>En caso de "Uno", no pasa nada y continuamos al turno del jugador siguiente.</p>
//                     <p>En caso de "Contro-Uno", el jugador toma 1 carta reserva y el jugador siguiente empieza su turno.</p>
//                 </div>
//                 <div class="column">
//                     <div class="image-fader">
//                         <img src={Cartas} class="image" id="normal"/>
//                         <img src={Cartas} class="image" id="normal_1"/>
//                         <img src={Cartas} class="image" id="normal_2"/>
//                         <img src={Cartas} class="image" id="normal_3"/>
//                     </div>
//                 </div>
//             </div>  

//             <h2>Ahora, vemos cartas especiales</h2>

//             <div class="ligne">
//                 <div class="column">
//                     <div class="image-fader">
//                         <img src={Cartas} class="image" id="normal"/>
//                         <img src={Cartas} class="image" id="normal_1"/>
//                         <img src={Cartas} class="image" id="normal_2"/>
//                         <img src={Cartas} class="image" id="normal_3"/>
//                     </div>
//                 </div>
//                 <div class="column">
//                     <p><b>No pasa:</b> cuando un jugador pone esta carta, el siguiente no puede jugar. 
//                         Esas pueden ser multiples y los efectos se anaden: si pongo 2 cartas "pasa", los dos jugadores que me siguen no pueden jugar.
//                     </p>
//                 </div>
//             </div>

//             <div class="ligne">
//                 <div class="column">
//                     <p><b>Al réves:</b> cuando se juega esta carta, la manera de cambiar de turnos es hecha al réves. 
//                     Imaginamos que el jugador que juega después de yo es el de mi izquierda, si una perso na juega esa carta, el jugador que me sigue sera el e mi derecha.</p>
//                     <p>Los efectos de multiplés de esa carta de anaden: si pongo 2, no cambia nada. 3 cambia.</p>
//                 </div>
//                 <div class="column">
//                     <div class="image-fader">
//                         <img src={Cartas} class="image" id="normal"/>
//                         <img src={Cartas} class="image" id="normal_1"/>
//                         <img src={Cartas} class="image" id="normal_2"/>
//                         <img src={Cartas} class="image" id="normal_3"/>
//                     </div>
//                 </div>
//             </div>  

//             <div class="ligne">
//                 <div class="column">
//                     <div class="image-fader">
//                         <img src={Cartas} class="image" id="normal"/>
//                         <img src={Cartas} class="image" id="normal_1"/>
//                         <img src={Cartas} class="image" id="normal_2"/>
//                         <img src={Cartas} class="image" id="normal_3"/>
//                     </div>
//                 </div>
//                 <div class="column">
//                     <p><b>+2:</b> cuando se juega esa carta, el jugador siguiente debe tomar 2 cartas y pasar su turno.
//                         Solo puede jugar si tiene una carta con mismo simbolo. 
//                     </p>
//                     <p>Los efectos se anaden: si pongo dos cartas asi, el jugador siguiente debe tomer 4 cartas.</p>
//                 </div>
//             </div>

//             <div class="ligne">
//                 <div class="column">
//                     <p><b>Multicolor:</b> esa carta se puede jugar cuando el jugador lo quiere. 
//                         Se puede poner sobre cualquier carta. 
//                         Permite al jugador de cambiar el color del juego por el jugador siguiente. </p>
//                     <p>Imaginamos que hay un 7 rojo en la mesa. 
//                         Yo juego una carta multicolor y eligio "amarillo". 
//                         Ahora, el jugador que me sigue debe jugar una carta amarilla. 
//                         No tiene restriccion de valor de carta.</p>
//                 </div>
//                 <div class="column">
//                     <div class="image-fader">
//                         <img src={Cartas} class="image" id="normal"/>
//                         <img src={Cartas} class="image" id="normal_1"/>
//                         <img src={Cartas} class="image" id="normal_2"/>
//                         <img src={Cartas} class="image" id="normal_3"/>
//                     </div>
//                 </div>
//             </div>

//             <div class="ligne">
//                 <div class="column">
//                     <div class="image-fader">
//                         <img src={Cartas} class="image" id="normal"/>
//                         <img src={Cartas} class="image" id="normal_1"/>
//                         <img src={Cartas} class="image" id="normal_2"/>
//                         <img src={Cartas} class="image" id="normal_3"/>
//                     </div>
//                 </div>
//                 <div class="column">
//                     <p><b>+4 multicolor:</b> el efecto de esa carta es entre la "+2" y la "Multicolor". 
//                     Cuando se juega, el jugador elige una nueva color por el jugador siguiente que debe tomar 4 cartas y pasar su turno.</p>
//                     <p>Una restriccion especial: esa carta se puede jugar solo si el jugador no tiene otra opcion.</p>
//                 </div>
//             </div>

//         </div>
        
//         </>
//     )
// }