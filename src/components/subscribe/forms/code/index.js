import React, { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MessageErrror from '../../../dummy/messages/messageError';
import {Segment,  Container, Header, Grid, Button, Form, FormInput} from 'semantic-ui-react';
import calculateTimeLeft from '../../../../actions/timer';
import { setTimeLeft } from '../../../../store/slices/codeData';
import { setSubFormTitle, setSubFormEmail, setMarkedLevels
} from '../../../../store/slices/subForm';
import { setStoreInitial } from '../../../../store/store';
import errorMessages from '../../../../store/initialConstants/errorMessages';
import { responseErrorsHumanize } from '../../../../actions/weatherActions/api';
import ModalSuccess from '../../../modals/modalSuccess';
import { fetchCode, clearCodeDataError } from '../../../../store/slices/codeData';

const isEmpty= (obj) => {
    return Object.keys(obj).length === 0;
}  

const CodeInput = (props) => {
    const name = props.name;
    const label = props.label;
    const placeholder = props.placeholder;
    const input = <Form.Input required 
                    name={name} 
                    label={label} 
                    placeholder={placeholder} 
                    error={props.error ? ({content: errorMessages.fieldRequired,
                                            pointing: 'below',
                                        }) 
                      : undefined}
                    onChange = {props.handleInputChange}
                    />
    return input
}

const ButtonClose = (props) => {
    return <Form.Button onClick={props.onClick} content="Отмена" />;
}

const ButtonRepeat = (props) => {
    return <Form.Button color='teal' onClick={props.onClick} content="Запросить код" />;
}


const ButttonSubmit = (props) => {
    return <Form.Button color='green' onClick={props.onClick} content="Отправить" />;
}

const Timer = (props) => {
    const timeLeft = props.timeLeft
    
    const addStartZero = (num) => {
        if (num === undefined) return null;
        const str = num.toString();
        if (str.length === 1) {
            return '0'+str
        } 
        return str
    }

    return (
        <span>
            Код действителен : {addStartZero(timeLeft.minutes)} : {addStartZero(timeLeft.seconds)}
        </span>
    )
     
}

const CodeForm = (props) => {
    const path = props.codeData.confirmURL;
    const date = props.codeData.dateExpires;
    let history = useHistory();

    const [isValid, setIsValid] = useState(()=>{
        return !isEmpty(calculateTimeLeft(date));
    });
    

    const [value, setValue] = useState('');
    const [inputError, setInputError] = useState(false);

    const messageSuccess = props.isSubscribe ? 
                                props.codeData.isEdit ? 'Данные рассылки успешно изменены.'
                                : 'Подписка на рассылку успешно оформлена.'
                        : 'Подписка на рассылку отменена.';
       
    const successAction = () =>{
        setStoreInitial();
        history.push('/')
    }

    useEffect(() => {
            setTimeout(() => { 
                if (!isEmpty(calculateTimeLeft(date))){
                    props.setTimeLeft(calculateTimeLeft(date));
                }else {
                    props.clearCodeDataError();
                    setIsValid(false);
                }
            }, 1000);
      });
    
    const  validate = () => {
        if (value === '') {
          setInputError(true);
          return false; 
        } 
        return true;
    }

    const handleInputChange = (event) =>{
        setInputError(false);
        setValue(event.target.value);
    }    

    const handleClose = (e) => {
        e.preventDefault();
        setStoreInitial();
        history.push('/')
    }  

    const handleRepeat = (e) => {
        e.preventDefault();
        const markedLevels = props.markedLevels;
        setStoreInitial();
        props.setSubFormEmail(props.codeData.email);
        props.isSubscribe && props.setSubFormTitle(props.codeData.title);
        props.isSubscribe && props.setMarkedLevels(markedLevels);
        history.push('/subscribe');
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        if (!validate()) return null;
        props.fetchCode({code:value, token:props.codeData.token, url:props.codeData.confirmURL});
    }

    const keyPress = (e) => {
        if(e.keyCode == 13){
          handleSubmit(e)
       }
      }

    return (
        <Container>
        {props.codeData.isSuccess && <ModalSuccess message={messageSuccess} 
                                                   closeAction = {successAction} 
        />}
        <Segment.Group>
            <Segment centered="true">
            <Grid>
                <Grid.Column textAlign="center">
                    <Header as="h3" >Отправка кода подтверждения</Header>
                </Grid.Column>
            </Grid>
            {props.codeData.responseError != null && 
                <Grid>
                    <Grid.Column textAlign="center">
                        <MessageErrror message={responseErrorsHumanize(props.codeData.responseError)}/>
                    </Grid.Column>
                </Grid>
            }
            </Segment>  
            <Segment centered="true" basic={true}>
            <Grid className="center aligned">
                <Form onKeyDown={keyPress} loading={props.codeData.loading === 'pending' ? true: false} >
                    {isValid && <CodeInput name='code' 
                                           label='Код подтверждения' 
                                           placeholder='Код'
                                           error = {inputError}
                                           handleInputChange = {handleInputChange}
                                />
                    }                     
                        <Grid>
                            <Grid.Row>
                                <Grid.Column textAlign="center" >
                                    <Header as='h5'> 
                                        {isValid ? <Timer timeLeft={props.codeData.timeLeft}/> 
                                    : <span>Действие кода истекло </span>}
                                    </Header>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>   
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <Button.Group >
                                    <div >
                                        <ButtonClose className='padBut' onClick={handleClose} />
                                    </div>
                                    <div className='padBut'>
                                        <ButtonRepeat onClick={handleRepeat} />
                                    </div>
                                    {isValid && 
                                        <div className="padBut.right">
                                            <ButttonSubmit onClick={handleSubmit} />
                                        </div>
                                    }
                                </Button.Group>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row/>
                    </Grid>
                </Form>
            </Grid>
         </Segment>  
            </Segment.Group>
        </Container>
    );
}

function mapStateToProps(state) {
    return {
        isSubscribe: state.isSubscribe,
        codeData : state.codeData,
        markedLevels: state.subForm.hazardLevelsMarked
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
     setSubFormEmail, setSubFormTitle, 
     setTimeLeft, clearCodeDataError,
     fetchCode, setMarkedLevels
   }, dispatch)
  }


export default  connect(mapStateToProps, mapDispatchToProps)(CodeForm);