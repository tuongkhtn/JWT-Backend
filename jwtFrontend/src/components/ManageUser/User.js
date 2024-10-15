import _ from "lodash"
import { useEffect, useState } from "react"
import { getAllUsersFromBackend, deleteUserById } from "../../service/userService"
import ReactPaginate from "react-paginate"
import ModalDelete from "./ModalDelete"

const User = () => {
    const [listUsers, setListUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [dataModal, setDataModal] = useState(-1);
    const limit = 2;

    const getUsers = async () => {
        let response = await getAllUsersFromBackend(page, limit);
        if(response && response.data) {
            setTotalPage(response.data.DT.totalPage);
            setListUsers(response.data.DT.users);
        }
    }

    useEffect(() => {
        getUsers();
    }, [page])

    const handlePageClick = (e) => {
        setPage(e.selected + 1);
    }

    const handleDeleteUser = (userId) => {
        setShowModal(true);
        setDataModal(userId);
    }

    const handleClose = () => {
        setShowModal(false);
    }

    const handleConfirmDeleteUser = async () => {
        let response = await deleteUserById(dataModal);
        if(response && response.data && response.data.EC === 0) {
            getUsers();
        }
        handleClose();
    }

    return (
        <>
            <div className="container">
                <div className="user-container">
                    <div className="user-header">
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
                                    <th scope="col">Action</th>
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
                                                    <td>
                                                        <button className="btn btn-warning mx-3">Edit</button>
                                                        <button className="btn btn-danger" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </>
                                }
                            </tbody>
                        </table>
                    </div>
                    {totalPage > 0 && 
                        <div className="user-footer">
                            <ReactPaginate
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={2}
                                marginPagesDisplayed={1}
                                pageCount={totalPage}
                                previousLabel="< previous"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    }
                </div>
            </div>

            <ModalDelete 
                show={showModal} 
                handleClose={handleClose} 
                handleConfirmDeleteUser={handleConfirmDeleteUser}
            />

        </>
    )
}

export default User;