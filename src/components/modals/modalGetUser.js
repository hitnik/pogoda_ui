import React, {useState} from 'react'
import { Button, Icon, Modal, Dimmer, Loader} from 'semantic-ui-react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createPortal } from 'react-dom';
import FormEditSubscribe from '../subscribe/forms/editSubscribe';
import errorMessages from '../../store/initialConstants/errorMessages';
import {fetchGetUser} from '../../store/slices/subForm';
import MessageErrror from '../../components/dummy/messages/messageError';
import { responseErrorsHumanize } from '../../actions/weatherActions/api';

const modalRoot = document.getElementById( 'modal' );

const ModalGetUser = (props) => {

    const [show, setShow] = useState(true);
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')

    const handleClickClose = () => {
        props.modalCloseAction();
        setShow(false);
    }

    const handleInputChange = (event) =>{
          setEmail(event.target.value);
          setError(false);
    }      

    const validate = () => {
        if (email === ''){
          setError(true)
          setErrorMsg(errorMessages.fieldRequired)
          return false; 
        }
        else if (! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            setError(true)
            setErrorMsg(errorMessages.emailFormat)
          return false; 
        }
        return true;
      }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (! validate()) {return null};
        props.fetchGetUser(email);

    }

    const modal = (
        <Modal open={show}
            dimmer ='inverted'
            centered={false}
            size='small'
        >   
            <Modal.Header>Введите адрес почты, на который производится рассылка.</Modal.Header>
            <Modal.Content>
                { props.error != null && <MessageErrror message={responseErrorsHumanize(props.error)}/>}
                { props.loading ? 
                        <Dimmer active inverted>
                            <Loader inverted>Loading</Loader>
                        </Dimmer>
                :  <FormEditSubscribe data = {{value:email, error:error, msg:errorMsg}}
                                      onInputChange = {handleInputChange} 
                    />
                }
            </Modal.Content>
            <Modal.Actions>
                    <Button color='red' inverted onClick={handleClickClose}>
                        <Icon name='close' /> Закрыть
                    </Button>
                    <Button color='green' inverted onClick={handleSubmit}> 
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
        loading: state.subForm.loadingGetUser,
        error: state.subForm.errorGetUser,
    }
  }
  
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      fetchGetUser
   }, dispatch)
  }


export default  connect(mapStateToProps, mapDispatchToProps)(ModalGetUser);