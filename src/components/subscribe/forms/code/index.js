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
    
    const button = <Form.Button onClick={this.props.onClick} content="Закрыть" />;
   
    return button;

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
                    <Form.Group>
                        <CodeInput name='code' label='Код подтвердения' placeholder='Код' />
                    </Form.Group>
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