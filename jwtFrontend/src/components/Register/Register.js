import "./Register.scss"
import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = (props) => {

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const isValid = () => {
        if(!email) {
            toast.error("Email is empty!")
            return false;
        }
        if(!phone) {
            toast.error("Phone is empty!")
            return false;
        }
        if(!username) {
            toast.error("Username is empty!")
            return false;
        }
        if(!password) {
            toast.error("Password is empty!")
            return false;
        }
        if(password != confirmPassword) {
            toast.error("Password is not matched!")
            return false;
        }

        let re = /\S+@\S+\.\S+/;
        if(!re.test(email)) {
            toast.error("It is not email!");
            return false;
        }

        return true;
    }

    const handleRegister = () => {
        if(isValid()) {
            let dataUser = {email, phone, username, password, confirmPassword};
            console.log(">>>> dataUser: ", dataUser);
        }
    }

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
                            <input 
                                type="text" className="form-control" placeholder="Email address" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone number:</label>
                            <input 
                                type="text" className="form-control" placeholder="Phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Username:</label>
                            <input 
                                type="text" className="form-control" placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input 
                                type="password" className="form-control" placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div> 
                        <div className="form-group">
                            <label>Re-enter password:</label>
                            <input 
                                type="password" className="form-control" placeholder="Re-enter password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div> 
                        <button className="btn btn-primary btn-loggin" onClick={() => handleRegister()}>Register</button>
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

export default Register;