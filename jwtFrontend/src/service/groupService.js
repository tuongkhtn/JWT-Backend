import axios from "axios"


const getGroupNameFromBackend = () => {
    return axios.get("http://localhost:8080/api/v1/groups/read")
}

export { 
    getGroupNameFromBackend,
}