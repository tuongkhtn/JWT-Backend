import loginRegisterService from "../service/loginRegisterService"

const testApi = (req, res) => {
    return res.status(200).json({
        message: "ok",
        data: "test api"
    })
}

const handleRegister = async (req, res) => {
    try {
        // req.body: { email, phone, username, password }
        if(!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: "Missing required parameters",
                EC: 1,
                DT: "", 
            })
        }

        // service: create user
        let data = await loginRegisterService.registerNewUser(req.body);
        console.log(">>>", data)

        return res.status(200).json({
            ...data,
            DT: "", 
        })
    } catch(e) {
        return res.status(500).json({
            EM: "error from server", // error message
            EC: -1, // error code
            DT: "", // data 
        })
    }
}

const handleLogin = (req, res) => {
    console.log(">>>", req.body);
}

module.exports = {
    testApi,
    handleRegister,
    handleLogin,
}