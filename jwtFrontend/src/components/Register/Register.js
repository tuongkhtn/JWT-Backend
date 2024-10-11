import "./Register.scss"
import axios from "axios"
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Login = (props) => {

    useEffect(() => {
        axios.get("http://localhost:8080/api/test-api")
            .then(data => console.log(data))
    }, [])  

    return (
        <div className="register-container pt-5">
            <div className="container">
                <div className="row px-3">
                    <div className="content-left col-7 d-none col-sm-7 d-sm-block">
                        <div className="brand">
                            facebook
                        </div>
                        <div className="detail">
                            Facebook helps you connect and share with the people in your life.
                        </div>
                    </div>

                    <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3">
                        <div className="brand d-sm-none text-center">
                            facebook
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="text" className="form-control" placeholder="Email address"/>
                        </div>
                        <div className="form-group">
                            <label>Phone number:</label>
                            <input type="text" className="form-control" placeholder="Phone number"/>
                        </div>
                        <div className="form-group">
                            <label>Username:</label>
                            <input type="text" className="form-control" placeholder="Username"/>
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input type="password" className="form-control" placeholder="Password"/>
                        </div> 
                        <div className="form-group">
                            <label>Re-enter password:</label>
                            <input type="password" className="form-control" placeholder="Re-enter password"/>
                        </div> 
                        <button className="btn btn-primary btn-loggin">Register</button>
                        <div className="text-center">
                            Already've a account.
                            <Link to="/login">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;