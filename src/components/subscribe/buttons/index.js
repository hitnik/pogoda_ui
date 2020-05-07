import React, { PureComponent } from "react";

import { Segment, Button, Grid, Transition } from 'semantic-ui-react';


class ButtonSubscribe extends PureComponent {

  render() {
    return <Button positive onClick={this.props.onClick}>Подписаться на рассылку</Button>;
  }
}

class ButtonUnsubscribe extends PureComponent {
  render() {
    return <Button negative onClick={this.props.onClick}>Отменить подписку</Button>
  }
}

export default class ButtonsSubScribeContainer extends PureComponent {
  
  onClickSubscribe() {
    this.props.callForm(true);
  }

  onClickUnSubscribe () {
    this.props.callForm(false);
  }
  
  render() {

    const { visible} = this.props

    const segmentButtons = (
      <Grid>
                  <Grid.Column textAlign="center">
                    <Button.Group fluid>
                      <ButtonSubscribe onClick={this.onClickSubscribe.bind(this)}/>
                      <Button.Or />
                      <ButtonUnsubscribe onClick={this.onClickUnSubscribe.bind(this)}/>
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