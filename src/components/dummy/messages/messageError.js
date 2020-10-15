import React from "react";
import { Message, Grid } from 'semantic-ui-react';

const MessageError = (props) =>{
    return  <Message negative>
                <Message.Header>
                <Grid>
                    <Grid.Column textAlign="center">
                        !Error:   {props.message}
                    </Grid.Column>
                </Grid>
                    </Message.Header>
            </Message>
}

export default MessageError;