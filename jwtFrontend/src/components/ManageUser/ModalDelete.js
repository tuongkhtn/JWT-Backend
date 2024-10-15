import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"

const ModalDelete = (props) => {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal delete user</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, are you sure delete user?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={props.handleConfirmDeleteUser}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDelete;