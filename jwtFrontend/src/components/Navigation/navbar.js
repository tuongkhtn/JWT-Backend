import { useEffect, useState } from "react"
import "./NavBar.scss"
import { useLocation, NavLink } from "react-router-dom"

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
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/users">User</NavLink></li>
            </ul>
        )
    )
}

export default NavBar;