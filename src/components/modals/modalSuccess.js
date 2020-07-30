import React, {useState} from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import { createPortal } from 'react-dom';


const modalRoot = document.getElementById( 'modal' );


const ModalSuccess = (props) => {
    const [show, setShow] = useState(false)

    const handleClick = () => setShow(false);

    const modal = (
        <Modal open={show}
            dimmer ='blurring'
            basic
            centered={true}
            size='small'
        >
            <Modal.Content>
                <h3>{props.message}</h3>
            </Modal.Content>
            <Modal.Actions>
            <Button color='green' onClick={handleClick}  inverted>
                <Icon name='checkmark' /> Got it
            </Button>
            </Modal.Actions>
        </Modal>
    )
    return (
        <>
            {props.activator({ setShow })}
            {createPortal(modal, modalRoot)}
        </>
    )
}

export default ModalSuccess;