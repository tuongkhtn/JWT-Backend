import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import "./ModalUser.scss"

const ModalUser = (props) => {
    return (
        <Modal size="lg" show={true}>
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
                        <option selected>Male</option>
                        <option>Female</option>
                    </select>
                </div>
                <div className="col-6">
                    <label>Group ({<span className="require-red">*</span>}):</label>
                    <select className="form-select">
                        <option selected>Leader</option>
                        <option>Dev</option>
                    </select>
                </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={props.handleConfirmDeleteUser}>
                Save
            </Button>
          </Modal.Footer>
        </Modal>
    );
}

export default ModalUser;