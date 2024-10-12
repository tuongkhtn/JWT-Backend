import "./Login.scss"
import { useNavigate } from "react-router"
import { useState } from "react";
import { loginUser } from "../../service/userService";
import { toast } from "react-toastify";

const Login = (props) => {
    const navigate = useNavigate();
    const handleCreateNewAccount = () => {
        navigate("/register");
    }

    const [valueLogin, setValueLogin] = useState(""); 
    const [password, setPassword] = useState("");

    let defaultCheckInputs = {
        isValidValue: true,
        isValidPassword: true,
    }
    const [objectCheckInputs, setObjectCheckInputs] = useState(defaultCheckInputs);

    const isValidInputs = () => {
        setObjectCheckInputs(defaultCheckInputs);

        if(!valueLogin) {
            toast.error("Please enter your email address or phone number")
            setObjectCheckInputs({...defaultCheckInputs, isValidValue: false})
            return false;
        }
        
        if(!password) {
            toast.error("Please enter your password")
            setObjectCheckInputs({...defaultCheckInputs, isValidPassword: false})
            return false;
        }

        return true;
    }

    const handleLogin = () => {
        if(isValidInputs()) {
            loginUser(valueLogin, password);   
        }
    }

    return (
        <div className="login-container pt-5">
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
                        <input 
                            type="text" 
                            className={objectCheckInputs.isValidValue ? "form-control" : "form-control is-invalid"}
                            placeholder="Email address or phone number"
                            value={valueLogin}
                            onChange={(e) => setValueLogin(e.target.value)}
                        />
                        <input 
                            type="password" 
                            className={objectCheckInputs.isValidPassword ? "form-control" : "form-control is-invalid"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="btn btn-primary btn-loggin" onClick={() => handleLogin()}>Log in</button>
                        <span className="text-center">
                            <a href="#" className="forgot-password">Forgotten password?</a>
                        </span>
                        <hr/>
                        <div className="text-center">
                            <button className="btn btn-success btn-create-account" onClick={() => handleCreateNewAccount()}>
                                Create new account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;