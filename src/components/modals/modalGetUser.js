import React, {useState} from 'react'
import { Button, Icon, Modal} from 'semantic-ui-react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createPortal } from 'react-dom';
import FormEditSubscribe from '../subscribe/forms/editSubscribe';
import { ButtonFormClose, ButtonFormSubmit} from '../subscribe/forms/subscribe'

const modalRoot = document.getElementById( 'modal' );

const ModalGetUser = (props) => {

    const [show, setShow] = useState(true);
    

    const handleClickClose = () => {
        props.modalCloseAction();
        setShow(false);
    }

    

    const modal = (
        <Modal open={show}
            dimmer ='inverted'
            centered={false}
            size='small'
        >   
            <Modal.Header>Введите адрес почты, на который производится рассылка.</Modal.Header>
            <Modal.Content>
                <FormEditSubscribe />
            </Modal.Content>
            <Modal.Actions>
                    <Button color='red' inverted onClick={handleClickClose}>
                        <Icon name='close' /> Закрыть
                    </Button>
                    <Button color='green' inverted>
                        <Icon name='checkmark' /> Отправить
                    </Button>

            </Modal.Actions>
        </Modal>
    )

    return (
        createPortal(modal, modalRoot)
      )

};

function mapStateToProps(state) {
    return {
        isSubscribe: state.isSubscribe,
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
   }, dispatch)
  }


export default  connect(mapStateToProps, mapDispatchToProps)(ModalGetUser);