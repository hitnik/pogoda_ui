import React, { PureComponent } from "react";
import { useHistory, Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Segment, Button, Grid, Transition } from 'semantic-ui-react';


class ButtonSubscribe extends PureComponent {

  render() {
    return <Button positive onClick={this.props.onClick} >Подписаться на рассылку</Button>;
  }
}

class ButtonUnsubscribe extends PureComponent {
  render() {
    return <Button negative onClick={this.props.onClick}>Отменить подписку</Button>
  }
}

 class ButtonsSubScribeContainer extends PureComponent {
  
  onClick(isSubscribe, event) {
    const { history } = this.props;
    if(history && isSubscribe) history.push('/subscribe');
    else if(history) history.push('/unsubscribe');
  }

  render() {

    const segmentButtons = (
      <Grid>
                  <Grid.Column textAlign="center">
                    <Button.Group fluid>
                      <ButtonSubscribe onClick={this.onClick.bind(this, true)}/>
                      <Button.Or />
                      <ButtonUnsubscribe onClick={this.onClick.bind(this, false)}/>
                  </Button.Group>
                  </Grid.Column>
                </Grid>
    );

    return (segmentButtons)
  }
}

export default withRouter(ButtonsSubScribeContainer);