import React, { useState, useEffect } from "react";

import {Segment,  Container, Header, Grid, Button, Form, FormInput} from 'semantic-ui-react';
import calculateTimeLeft from '../../../../actions/timer'

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
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(props.date));

    const addStartZero = (num) => {
        const str = num.toString();
        if (str.length === 1) {
            return '0'+str
        } 
        return str
    }

    useEffect(() => {
            setTimeout(() => {
            setTimeLeft(calculateTimeLeft(props.date));
            if (isEmpty(timeLeft)) {
                props.changevisible();
            }
            }, 1000);
      });

    

    return (
            !isEmpty(timeLeft)? 
                <span>
                    <span>Код действителен : {addStartZero(timeLeft.minutes)} : {addStartZero(timeLeft.seconds)}</span>
                </span> 
                : <span></span>)
     
}

const CodeForm = () => {
    const date = new Date("2020-06-29T17:25:00.00000Z") ;

    const isValidOnStart = () =>{
        return !isEmpty(calculateTimeLeft(date)); 
    }

    const [isValid, setIsValid] = useState(isValidOnStart);
    const handleVisibility = () =>  setIsValid(false);

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
                    {isValid && <CodeInput name='code' label='Код подтвердения' placeholder='Код'/> }                     
                        <Grid>
                            <Grid.Row>
                                <Grid.Column textAlign="center" >
                                    <Header as='h5'> {isValid ? <Timer date={date} changevisible={handleVisibility} /> : <span>Действие кода истекло</span> }</Header>
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