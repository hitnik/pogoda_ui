import React, { PureComponent } from "react";

import {Segment,  Container, Header, Grid, Button, Form, FormInput} from 'semantic-ui-react';


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

const CodeForm = () => {
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
                        <CodeInput name='code' label='Код подтвердения' placeholder='Код' />
                    <Grid>
                        <Grid.Row >
                            <Grid.Column textAlign="right">
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