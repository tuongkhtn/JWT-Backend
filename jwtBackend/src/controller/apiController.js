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
            EM: data.EM,
            EC: data.EC,
            DT: "", 
        })
    } catch(e) {
        console.log(">>>", e);
        return res.status(500).json({
            EM: "error from server", // error message
            EC: -1, // error code
            DT: "", // data 
        })
    }
}

const handleLogin = async (req, res) => {
    try {
        // req.body: {valueLogin, password}
        if(!req.body.valueLogin || !req.body.password) {
            return res.status(200).json({
                EM: "Missing required parameters",
                EC: 1,
                DT: "", 
            })
        }

        let data = await loginRegisterService.handleLoginUser(req.body);

        res.cookie('jwt', data.DT.access_token, { httpOnly: true })

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT, 
        })
        
    } catch(e) {
        console.log(">>>", e);
        return res.status(500).json({
            EM: "error from server", // error message
            EC: -1, // error code
            DT: "", // data 
        })
    } 
}

module.exports = {
    testApi,
    handleRegister,
    handleLogin,
}