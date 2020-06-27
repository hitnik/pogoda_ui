import React, { useState, useEffect } from "react";

import {Segment,  Container, Header, Grid, Button, Form, FormInput} from 'semantic-ui-react';
import calculateTimeLeft from '../../../../actions/timer'

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
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(props.date));
    props.changeValid();

    useEffect(() => {
        setTimeout(() => {
          setTimeLeft(calculateTimeLeft(props.date));
        }, 1000);
      });

    const isEmpty= (obj) => {
        return Object.keys(obj).length === 0;
    }  

    const addStartZero = (num) => {
        const str = num.toString();
        if (str.length === 1) {
            return '0'+str
        } 
        return str
    }

    if (!isEmpty(timeLeft)){props.changeValid()}
    return (
            !isEmpty(timeLeft) ? 
                <span>
                    <span>Код действителен : {addStartZero(timeLeft.minutes)} : {addStartZero(timeLeft.seconds)}</span>
                </span> 
                : null)
     
}

const CodeForm = () => {
    const d = new Date("2020-06-27T04:10:00.00000Z") ;

    const [isValid, setIsValid] = useState(true);

    const changeValid = () => {useState(false);}

    const form = 
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
                        <CodeInput name='code' label='Код подтвердения' placeholder='Код'/>
                    {isValid ? <p>Valid</p> : <p>No</p>}                           
                    <Grid>
                    <Grid.Row>
                            <Grid.Column textAlign="center" >
                                <Header as='h5'><Timer date={d} isValid={isValid} setIsValid={changeValid} /></Header>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>    
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                            <Button.Group >
                            <div >
                                <ButtonClose className='padBut' />
                            </div>
                            <div className='padBut'>
                                <ButtonRepeat/>
                            </div>
                            <div className="padBut.right">
                                <ButttonSubmit />
                            </div>
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
    return form ;   
}

// export default class CodeForm extends PureComponent {

//     render () {
//         console.log('confirm')
//         return(
//             <Container>
//             <Segment.Group>
//                 <Segment centered="true">
//                 <Grid>
//                     <Grid.Column textAlign="center">
//                         <Header as="h3" >Отправка кода подтверждения</Header>
//                     </Grid.Column>
//                 </Grid>
//                 </Segment>  
//                 <Segment centered="true" basic={true}>
        
//             </Segment>  
//                 </Segment.Group>
//             </Container>
//         )
//     }
// }

export default CodeForm