import { useNavigate, Route, Routes } from "react-router";
import { useEffect } from "react";
import User from "../components/ManageUser/User";

const PrivateRoutes = (props) => {

    const navigate = useNavigate();

    useEffect(() => {
        let session = sessionStorage.getItem("account");
        if(!session) {
            navigate('/login');
        }

    }, [])

    return props.element;
}

export default PrivateRoutes;