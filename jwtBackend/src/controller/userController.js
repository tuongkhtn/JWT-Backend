import userApiService from "../service/userApiService"

const getUsers = async (req, res) => {
    try {
        let data = await userApiService.read();

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
    getUsers,
}