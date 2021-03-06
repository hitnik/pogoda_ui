import React, {useState} from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'
import { createPortal } from 'react-dom';


const modalRoot = document.getElementById( 'modal' );


const ModalSuccess = (props) => {
    const [show, setShow] = useState(true)

    const handleClick = () => {
        props.closeAction && props.closeAction();
        setShow(false);}

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
                <Icon name='checkmark' /> Закрыть
            </Button>
            </Modal.Actions>
        </Modal>
    )
    return (
      createPortal(modal, modalRoot)
    )
}

export default ModalSuccess;