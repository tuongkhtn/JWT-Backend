import axios from "../setup/axios"


const getGroupNameFromBackend = () => {
    return axios.get("/api/v1/groups/read")
}

export { 
    getGroupNameFromBackend,
}