import "./login.scss"


const Login = (props) => {
    return (
        <div className="login-container mt-3">
            <div className="container">
                <div className="row">
                    <div className="content-left col-7">
                        <div>
                            facebook
                        </div>
                        <div>
                            Facebook helps you connect and share with the people in your life.
                        </div>
                    </div>

                    <div className="content-right col-5 d-flex flex-column gap-3 py-3 gray">
                        <input type="text" className="form-control" placeholder="Email address or phone number"/>
                        <input type="password" className="form-control" placeholder="Password"/>
                        <button className="btn btn-primary">Log in</button>
                        <span className="text-center">Forgotten password?</span>
                        <hr/>
                        <div className="text-center">
                            <button className="btn btn-success">Create new account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;