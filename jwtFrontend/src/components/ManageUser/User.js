import _ from "lodash"
import { useEffect, useState } from "react"
import { getAllUsersFromBackend } from "../../service/userService"

const User = () => {
    const [listUsers, setListUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            let response = await getAllUsersFromBackend();
            // console.log(">>>", response.data);
            if(response && response.data) {
                setListUsers(response.data.DT);
            }
        }

        getUsers();
    }, [])

    return (
        <div className="container">
            <div className="login-container">
                <div>
                    <h3>Table of users</h3>
                </div>
                <div>
                    <button className="btn btn-success">Refresh</button>
                    <button className="btn btn-primary mx-3">Add new User</button>
                </div>
                <div className="mt-3">
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">ID</th>
                                <th scope="col">Email</th>
                                <th scope="col">Name</th>
                                <th scope="col">Adress</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Sex</th>
                                <th scope="col">Group</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listUsers && listUsers.length > 0 && 
                                <>
                                    {listUsers.map((user, index) => {
                                        return (
                                            <tr key={index + 1}>
                                                <th scope="row">{index+1}</th>
                                                <td>{user.id}</td>
                                                <td>{user.email}</td>
                                                <td>{user.name}</td>
                                                <td>{user.address}</td>
                                                <td>{user.phone}</td>
                                                <td>{user.sex}</td>
                                                <td>{user.Group?.name}</td>
                                            </tr>
                                        )
                                    })}
                                </>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default User;