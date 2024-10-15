import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import "./ModalUser.scss"
import { useEffect, useState } from "react"
import { getGroupNameFromBackend } from "../../service/groupService"

const ModalUser = (props) => {
    const [groupName, setGroupName] = useState([]);

    const getGroupName = async () => {
        let response = await getGroupNameFromBackend();
        if(response && response.data && response.data.EC === 0) {
            let names = response.data.DT.map((item) => {
                return item.name
            })

            setGroupName([...new Set(names)])
        }
    }

    useEffect(() => {
        getGroupName();
    }, [])

    return (
        <Modal size="lg" show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Create a user
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
                <div className="col-6">
                    <label>Email ({<span className="require-red">*</span>}):</label>
                    <input className="form-control" type="email" />
                </div>
                <div className="col-6">
                    <label>Phone Number ({<span className="require-red">*</span>}):</label>
                    <input className="form-control" type="email" />
                </div>
                <div className="col-6">
                    <label>Username:</label>
                    <input className="form-control" type="text" />
                </div>
                <div className="col-6">
                    <label>Password ({<span className="require-red">*</span>}):</label>
                    <input className="form-control" type="password" />
                </div>
                <div className="col-12">
                    <label>Address:</label>
                    <input className="form-control" type="text" />
                </div>
                <div className="col-6">
                    <label>Gender:</label>
                    <select className="form-select">
                        <option defaultValue>Male</option>
                        <option>Female</option>
                    </select>
                </div>
                <div className="col-6">
                    <label>Group ({<span className="require-red">*</span>}):</label>
                    <select className="form-select">
                        {groupName.length > 0 && 
                            groupName.map((name, index) => {
                                return (
                                    <option key={`group-${index+1}`}>{name}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
                Close
            </Button>
            <Button variant="primary">
                Save
            </Button>
          </Modal.Footer>
        </Modal>
    );
}

export default ModalUser;