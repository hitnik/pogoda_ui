import React, { PureComponent } from "react";

import { withRouter } from 'react-router-dom';
import {Segment,  Container, Header, Grid, Button} from 'semantic-ui-react';


export default class CodeForm extends PureComponent {

    render () {
        console.log('confirm')
        return(
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
        
            </Segment>  
                </Segment.Group>
            </Container>
        )
    }
}