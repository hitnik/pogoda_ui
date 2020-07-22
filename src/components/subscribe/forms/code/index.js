import React, { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {Segment,  Container, Header, Grid, Button, Form, FormInput} from 'semantic-ui-react';
import calculateTimeLeft from '../../../../actions/timer';
import { setCodeDataInitial, setTimeLeft } from '../../../../store/slices/codeData';
import { setSubFormTitle, setSubFormEmail, setSubFormInitial } from '../../../../store/slices/subForm';
import { setStoreInitial } from '../../../../store/store';

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

    useEffect(() => {
            setTimeout(() => { 
                if (!isEmpty(calculateTimeLeft(date))){
                    props.setTimeLeft(calculateTimeLeft(date));
                }else setIsValid(false);
            }, 1000);
      });


    const handleClose = (e) => {
        e.preventDefault();
        setStoreInitial();
        history.push('/')
    }  

    const handleRepeat= (e) => {
        e.preventDefault();
        setStoreInitial();
        props.setSubFormEmail(props.codeData.email);
        props.setSubFormTitle(props.codeData.title);
        console.log(history.location.pathname);
        history.push('/subscribe');
    }
    return (
        <Container>
        <Segment.Group>
            <Segment centered="true">
            <Grid>
                <Grid.Column textAlign="center">
                    <Header as="h3" >Отправка кода подтверждения</Header>
                </Grid.Column>
            </Grid>
            </Segment>  
            <Segment centered="true" basic={true}>
            <Grid className="center aligned">
                <Form>
                    {isValid && <CodeInput name='code' label='Код подтверждения' placeholder='Код'/> }                     
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
                                            <ButttonSubmit />
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
        codeData : state.codeData
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
     setSubFormEmail, setSubFormTitle, setTimeLeft
   }, dispatch)
  }


export default  connect(mapStateToProps, mapDispatchToProps)(CodeForm);