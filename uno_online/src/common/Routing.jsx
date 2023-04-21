import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "../landing/landing"
import MainPage from "../mainpage/mainpage"
import About from "../about/about"
// import Rules from "../rules/rules"
import InitializationGame from "../mainpage/initialization_game/initialization_game"
import JoinGame from "../mainpage/join_game/join_game"

export default function Routing(){
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Landing />}/>
                <Route path={'/about'} element={<About />}/>
                <Route path={'/mainpage'} element={<MainPage />}/>
                {/* <Route path={'/rules'} element={<Rules />}/> */}
                <Route path={'/mainpage/initialization_game'} element={<InitializationGame />}/>
                <Route path={'/mainpage/join_game'} element={<JoinGame />}/>
            </Routes>
        </BrowserRouter>
        </>
    )
}