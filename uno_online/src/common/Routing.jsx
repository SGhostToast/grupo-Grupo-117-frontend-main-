import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "../landing/landing"
import MainPage from "../mainpage/mainpage"
import About from "../about/about"
import Rules from "../rules/rules"

export default function Routing(){
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Landing />}/>
                <Route path={'/about'} element={<About />}/>
                <Route path={'/mainpage'} element={<MainPage />}/>
                <Route path={'/rules'} element={<Rules />}/>
            </Routes>
        </BrowserRouter>
        </>
    )
}