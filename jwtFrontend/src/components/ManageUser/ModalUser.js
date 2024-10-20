import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import "./ModalUser.scss"
import { useEffect, useState } from "react"
import { getGroupNameFromBackend } from "../../service/groupService"
import { toast } from "react-toastify"
import _ from "lodash"
import { createNewUser, updateUserById } from "../../service/userService"

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
        if(response && response.EC === 0) {
            setGroupName(response.DT);
        }
    }

    useEffect(() => {
        getGroupName();
        if(props.action === "UPDATE") {
            let data = props.userUpdate;
            for(let key in data) {
                if(!data[key]) {
                    data[key] = "";
                }
            }
            if(_.isEmpty(data)) {
                data = defaultUserInfo;
            }
            data.password = "";
            setUser(data);
        } else {
            setUser(defaultUserInfo);
        }
    }, [props.userUpdate, props.action])

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
            if(response && response.EC === 0) {
                props.showNewUser();
                props.handleClose();
                setUser(defaultUserInfo);
            } else {
                toast.error(response.EM);
            }
        }
    }

    const handleUpdateUser = async (userInfo) => {
        let response = await updateUserById(userInfo);
        if(response && response.EC === 0) {
            props.showNewUser();
            props.handleClose();
            setUser(defaultUserInfo);
        } else {
            toast.error(response.EM);
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
                {/* Email */}
                <div className="col-6">
                    <label>Email ({<span className="require-red">*</span>}):</label>
                    <input 
                        className={validUser.email ? "form-control" : "form-control is-invalid"} 
                        type="email" 
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                        disabled={props.action === "UPDATE"}
                    />
                </div>

                {/* Phone number */}
                <div className="col-6">
                    <label>Phone Number ({<span className="require-red">*</span>}):</label>
                    <input 
                        className={validUser.phone ? "form-control" : "form-control is-invalid"}  
                        type="text" 
                        value={user.phone}
                        onChange={(e) => setUser({...user, phone: e.target.value})}
                        disabled={props.action === "UPDATE"}
                    />
                </div>

                {/* Username */}
                <div className="col-6">
                    <label>Username:</label>
                    <input 
                        className="form-control"
                        type="text" 
                        value={user.name}
                        onChange={(e) => setUser({...user, name: e.target.value})}
                    />
                </div>

                {/* Password */}
                <div className="col-6">
                    {props.action === "CREATE" && 
                    <>
                        <label>Password ({<span className="require-red">*</span>}):</label>
                        <input 
                            className={validUser.password ? "form-control" : "form-control is-invalid"} 
                            type="password" 
                            value={user.password}
                            onChange={(e) => setUser({...user, password: e.target.value})}
                        />
                    </>}
                </div>

                {/* Address */}
                <div className="col-12">
                    <label>Address:</label>
                    <input 
                        className="form-control"
                        type="text" 
                        value={user.address}
                        onChange={(e) => setUser({...user, address: e.target.value})}
                    />
                </div>

                {/* Gender */}
                <div className="col-6">
                    <label>Gender:</label>
                    <select 
                        className="form-select"
                        onChange={(e) => setUser({...user, sex: e.target.value})}
                        value={user.sex ? user.sex : 'Male'}
                    >
                        <option defaultValue>Male</option>
                        <option>Female</option>
                    </select>
                </div>

                {/* GroupId */}
                <div className="col-6">
                    <label>Group ({<span className="require-red">*</span>}):</label>
                    <select 
                        className={validUser.groupId ? "form-select" : "form-select is-invalid"} 
                        onChange={(e) => setUser({...user, groupId: +e.target.value})}
                        value={user.groupId ? user.groupId : 1}
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
            <Button 
                variant="secondary" 
                onClick={props.handleClose}
            >
                Close
            </Button>
            <Button 
                variant="primary" 
                onClick={() => {
                    props.action === "CREATE" ? handleCreateUser() : handleUpdateUser(user);
                }}
            >
                {props.action === "CREATE" ? <span>Save</span> : <span>Update</span>}
            </Button>
          </Modal.Footer>
        </Modal>
    );
}

export default ModalUser;