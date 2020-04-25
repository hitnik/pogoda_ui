import React, { Component } from "react";
import { Button, Modal, Label } from 'react-bootstrap'

class Modal extends Component{
    render() {
        const { show, action, id } = this.props
        console.log(this.props)
        return (
            <Modal show={show} aria-labelledby="ModalHeader" >
                <Modal.Header closeButton>
                    <Button class="close" data-dismiss="modal">&times;</Button>
                    <h4 className="modal-title">{action === 0 ? 'Archive' : 'Active'}</h4>
                </Modal.Header>
                <Modal.Body>

                    <form id="archiveForm">
                        <Label className="control-label">Reason</Label>
                        <input id="reason" name="reason" className="form-control" type="text"/>
                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-success">{action === 0 ? 'Archive' : 'Active'}</button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default Modal;