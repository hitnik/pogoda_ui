import React, { PureComponent } from "react";

import {Segment, Button, Grid, Transition} from 'semantic-ui-react';


class ButtonSubscribe extends PureComponent {

}

class ButtonUnsubscribe extends PureComponent {
    
}

export default class ButtonsSubScribeContainer extends PureComponent{

        render() {

            const {visible, updateButtonsVisible} = this.props

            const segmentButtons = (
                <Grid>
                  <Grid.Column textAlign="center">
                    <Button.Group fluid>
                      <Button positive onClick={updateButtonsVisible}>Подписаться на рассылку</Button>
                      <Button.Or />
                      <Button negative onClick={updateButtonsVisible}>Отменить подписку</Button>
                  </Button.Group>
                  </Grid.Column>
                </Grid> 
            );

            return (
                <Transition.Group animation='drop' duration={750}>
                    {visible && segmentButtons}
                </Transition.Group>
            )
        }
}