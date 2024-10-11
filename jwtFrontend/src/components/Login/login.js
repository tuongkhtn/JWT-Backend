import "./login.scss"


const Login = (props) => {
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
                        <input type="text" className="form-control" placeholder="Email address or phone number"/>
                        <input type="password" className="form-control" placeholder="Password"/>
                        <button className="btn btn-primary btn-loggin">Log in</button>
                        <span className="text-center">
                            <a href="#" className="forgot-password">Forgotten password?</a>
                        </span>
                        <hr/>
                        <div className="text-center">
                            <button className="btn btn-success btn-create-account">Create new account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;