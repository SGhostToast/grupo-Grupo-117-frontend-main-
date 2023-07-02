import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "../landing/landing"
import MainPage from "../mainpage/mainpage"
import About from "../about/about"
import Test from '../test/test'
import Login from '../landing/login'
import Table from '../game/table'
import FriendsPage from "../friends/friendspage"

import CreateGame from "../mainpage/initialization_game/create_game"
import JoinGame from "../mainpage/initialization_game/join_game"
import CurrentGames from "../mainpage/initialization_game/current_games"

export default function Routing(){
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Landing />}/>
                <Route path={'/about'} element={<About />}/>
                <Route path={'/mainpage'} element={<MainPage />}/>
                <Route path={'/test'} element={<Test />}/>
                <Route path={'/login'} element={<Login />}/>
                <Route path={'/table'} element={<Table />}/>

                <Route path={'/friendspage'} element={<FriendsPage />}/>

                <Route path={'/create_game'} element={<CreateGame />}/>
                <Route path={'/join_game'} element={<JoinGame />}/>
                <Route path={'/current_games'} element={<CurrentGames />}/>

            </Routes>
        </BrowserRouter>
        </>
    )
}