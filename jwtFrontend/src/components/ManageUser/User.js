import _ from "lodash"
import { useEffect } from "react";
import { useNavigate } from "react-router";

const User = () => {
    const navigate = useNavigate();

    useEffect(() => {
        let session = sessionStorage.getItem("account");
        if(!session || _.isEmpty(session) || !session.isAuthenticated) {
            navigate('/login');
        }

    }, [])

    return (
        <h1>user component</h1>
    )
}

export default User;