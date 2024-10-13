import "./NavBar.scss"
import { Routes, Route } from "react-router-dom"

const NavBar = (props) => {
    return (
        <ul>
            <li><a className="active" href="/home">Home</a></li>
            <li><a href="/news">News</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/about">About</a></li>
        </ul>
    )
}

export default NavBar;