import './styles/about.css'
import GhostToast from '../../assets/GhostToast.jpeg';
import Lilian from '../../assets/photo_lilian.jpg';


export default function About() {
    return(
        <>
        <div className="title">
            <img className="title-bg" src="https://st2.depositphotos.com/23387462/46229/i/600/depositphotos_462298254-stock-photo-minsk-belarus-march-2021-top.jpg" alt="" />
            <div className="title-content">
                <h1>Sobre el equipo</h1>
            </div>
        </div>
        <div className="beneath">
            <div className="team-card" id="Lilian">
                <div>
                    <img className="profile-picture" src={Lilian} alt="Lilian" />
                    <h2>Lilian</h2>
                </div>
                <div className="description">
                    <ul>
                        <li><strong>Pronombres:</strong> ilx/lx (il/le)</li>
                        <li><strong>Generación:</strong> 2019</li>
                        <li><strong>Major:</strong> Matematica y Fisica</li>
                        <li><strong>Minor:</strong> Programación</li>
                    </ul>
                    <p>
                        De momento en intercambio en Santiago de Chile, quiere aprovechar esta experiencia para mejorar su espanol y descubrir América del sur y sus pueblos.
                        El ano necesita hacer una practica que, espera, sea en desarrollo web.
                        Le gusta escalar !
                    </p>
                </div>
            </div>
            <br />
            <div className="team-card" id="Sam">
                <div>
                    <img className="profile-picture" src={GhostToast} alt="GhostToast" />
                    <h2>Sam</h2>
                </div>
                <div className="description">
                    <ul>
                        <li><strong>Pronombres:</strong> ellx/lx (elle/le)</li>
                        <li><strong>Generación:</strong> 2019</li>
                        <li><strong>Major:</strong> Robótica</li>
                        <li><strong>Minor:</strong> Programación</li>
                    </ul>
                    <p>
                        Quiere dedicarse a crear videojuegos. Le gusta participar del arte en distintas
                        formas, como en la música, el baile, las artes plásticas, etc.
                        Se entretiene viendo animé, leyendo comics y jugando DnD. Le gusta mucho el té.
                    </p>
                </div>
            </div>
        </div>
        </>
    )
}