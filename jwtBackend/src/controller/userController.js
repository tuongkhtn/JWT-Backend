import userApiService from "../service/userApiService"

const getUsers = async (req, res) => {
    try {
        let data = await userApiService.read(req.query);

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

const getUserById = async (req, res) => {
    try {
        let data = await userApiService.readId(req.params.id);

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

const deleteUserById = async (req, res) => {
    try {
        let data = await userApiService.destroy(req.body.id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
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

const createNewUser = async (req, res) => {
    try {
        let data = await userApiService.create(req.body);

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
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
    getUsers,
    deleteUserById,
    createNewUser,
    getUserById,
}