import { useEffect, useState } from "react"
import "./NavBar.scss"
import { Routes, Route, useLocation } from "react-router-dom"

const NavBar = (props) => {
    const location = useLocation();

    const [show, setShow] = useState(true);

    useEffect(() => {
        let session = sessionStorage.getItem("account");
        if(!session || location.pathname === '/login') {
            setShow(false);
        }
    }, [])
    
    return (
        show && (
            <ul>
                <li><a className="active" href="/home">Home</a></li>
                <li><a href="/news">News</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/about">About</a></li>
            </ul>
        )
    )
}

export default NavBar;