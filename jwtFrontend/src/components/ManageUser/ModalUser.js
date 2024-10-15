import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import "./ModalUser.scss"
import { useEffect, useState } from "react"
import { getGroupNameFromBackend } from "../../service/groupService"
import { toast } from "react-toastify"
import _ from "lodash"
import { createNewUser } from "../../service/userService"

const ModalUser = (props) => {
    const defaultUserInfo = {
        email: "",
        name: "",
        password: "",
        address: "",
        phone: "",
        sex: "Male",
        groupId: 1
    }
    const defaultValidUser = {
        email: true,
        name: true,
        password: true,
        address: true,
        phone: true,
        sex: true,
        groupId: true
    }

    const [groupName, setGroupName] = useState([]);
    const [user, setUser] = useState(defaultUserInfo);
    const [validUser, setValidUser] = useState(defaultValidUser);

    const getGroupName = async () => {
        let response = await getGroupNameFromBackend();
        if(response && response.data && response.data.EC === 0) {
            setGroupName(response.data.DT);
        }
    }

    useEffect(() => {
        getGroupName();
    }, [])

    const handleValidInputs = () => {
        setValidUser(defaultValidUser);
        let keys = ["email", "phone", "password", "groupId"];
        let valid = true;
        for(let i = 0; i < keys.length; i++) {
            if(!user[keys[i]]) {
                let _userInvalid = _.cloneDeep(defaultValidUser);
                _userInvalid[keys[i]] = false;
                setValidUser(_userInvalid);

                toast.error(`The ${keys[i]} is empty!`);
                valid = false;

                break;
            }
        }
        
        return valid;
    }
    
    const handleCreateUser = async () => {
        if(handleValidInputs()) {
            let response = await createNewUser(user);
            if(response && response.data && response.data.EC === 0) {
                props.showNewUser();
                props.handleClose();
            } else {
                toast.error(response.data.EM);
            }
        }
    }

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
                    <input 
                        className={validUser.email ? "form-control" : "form-control is-invalid"} 
                        type="email" 
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                    />
                </div>
                <div className="col-6">
                    <label>Phone Number ({<span className="require-red">*</span>}):</label>
                    <input 
                        className={validUser.phone ? "form-control" : "form-control is-invalid"}  
                        type="text" 
                        value={user.phone}
                        onChange={(e) => setUser({...user, phone: e.target.value})}
                    />
                </div>
                <div className="col-6">
                    <label>Username:</label>
                    <input 
                        className="form-control"
                        type="text" 
                        value={user.name}
                        onChange={(e) => setUser({...user, name: e.target.value})}
                    />
                </div>
                <div className="col-6">
                    <label>Password ({<span className="require-red">*</span>}):</label>
                    <input 
                        className={validUser.password ? "form-control" : "form-control is-invalid"} 
                        type="password" 
                        value={user.password}
                        onChange={(e) => setUser({...user, password: e.target.value})}
                    />
                </div>
                <div className="col-12">
                    <label>Address:</label>
                    <input 
                        className="form-control"
                        type="text" 
                        value={user.address}
                        onChange={(e) => setUser({...user, address: e.target.value})}
                    />
                </div>
                <div className="col-6">
                    <label>Gender:</label>
                    <select 
                        className="form-select"
                        onChange={(e) => setUser({...user, sex: e.target.value})}
                    >
                        <option defaultValue>Male</option>
                        <option>Female</option>
                    </select>
                </div>
                <div className="col-6">
                    <label>Group ({<span className="require-red">*</span>}):</label>
                    <select 
                        className={validUser.groupId ? "form-control" : "form-control is-invalid"} 
                        onChange={(e) => setUser({...user, groupId: +e.target.value})}
                    >
                        {groupName.length > 0 && 
                            groupName.map((group) => {
                                return (
                                    <option key={`group-${group.id}`} value={group.id}>{group.name}</option>
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
            <Button variant="primary" onClick={() => handleCreateUser()}>
                Save
            </Button>
          </Modal.Footer>
        </Modal>
    );
}

export default ModalUser;