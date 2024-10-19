import axios from "../setup/axios"

const registerNewUser = (dataUser) => {
    return axios.post("/api/v1/register", dataUser)
}

const loginUser = (valueLogin, password) => {
    return axios.post("/api/v1/login", {valueLogin, password})
}

const getAllUsersFromBackend = (page, limit) => {
    return axios.get(`/api/v1/users/read?page=${page}&limit=${limit}`);
}

const deleteUserById = (userId) => {
    return axios.delete("/api/v1/users/delete", {
        data: {
            id: userId
        }
    });
}

const createNewUser = (user) => {
    return axios.post("/api/v1/users/create", {...user})
}

const getUserById = (userId) => {
    return axios.get(`/api/v1/users/read/${userId}`)
}

const updateUserById = (user) => {
    return axios.put(`/api/v1/users/update`, {...user})
}   

export {
    registerNewUser,
    loginUser,
    getAllUsersFromBackend,
    deleteUserById,
    createNewUser,
    getUserById,
    updateUserById,
}