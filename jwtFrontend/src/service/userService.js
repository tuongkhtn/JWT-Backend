import axios from "axios"

const registerNewUser = (dataUser) => {
    return axios.post("http://localhost:8080/api/v1/register", dataUser)
}

const loginUser = (valueLogin, password) => {
    return axios.post("http://localhost:8080/api/v1/login", {valueLogin, password})
}

const getAllUsersFromBackend = (page, limit) => {
    return axios.get(`http://localhost:8080/api/v1/users/read?page=${page}&limit=${limit}`);
}

export {
    registerNewUser,
    loginUser,
    getAllUsersFromBackend,
}