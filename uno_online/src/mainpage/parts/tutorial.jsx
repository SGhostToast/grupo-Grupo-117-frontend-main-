import '../styles/tutorial.css'
import Cartas from "../../assets/cartas.jpg";

import GhostToast from '../../assets/GhostToast.jpeg';
import Lilian from '../../assets/photo_lilian.jpg';


export default function Tutorial() {
    return(
        <>
        <h2>Tutorial</h2>

        <p>En ese tutorial haria etapas a seguir para aprender como se puede jugar al Uno !</p>

        <div class="ligne">
            <div class="column">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>        
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <div class="column">
                <div class="image-fader">
                    <img src={Cartas} class="image" id="normal"/>
                    <img src={Cartas} class="image" id="normal_1"/>
                    <img src={Cartas} class="image" id="normal_2"/>
                    <img src={Cartas} class="image" id="normal_3"/>
                </div>
            </div>
        </div>  

        <div class="ligne">
            <div class="column">
                <div class="image-fader">
                    <img src={Cartas} class="image" id="normal"/>
                    <img src={Cartas} class="image" id="normal_1"/>
                    <img src={Cartas} class="image" id="normal_2"/>
                    <img src={Cartas} class="image" id="normal_3"/>
                </div>
            </div>
            <div class="column">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>        
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </div>  
        </>
    )
}