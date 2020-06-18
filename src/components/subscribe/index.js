import React, { PureComponent } from "react";
import { withRouter} from 'react-router-dom';

import {Segment,  Container, Header, Grid, Button} from 'semantic-ui-react';


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
  


class SubscribeContainer extends PureComponent{
  constructor(props){
    super(props);
    this.state = {
      isSubscribe: true,
      title : '',
      email: ''
    }
  }
  

  render() {
      const form  = null;

      return (
          <Container>
            <Segment.Group>
              <Segment centered="true">
                <Grid>
                  <Grid.Column textAlign="center">
                      <Header as="h3" centered="true">Оформление/отмена подписки на рассылку штормовых предупреждений</Header>
                  </Grid.Column>
                </Grid>
              </Segment>
              <Segment basic={true}>
                <ButtonsSubScribeContainer/>
              </Segment>  
            </Segment.Group>
          </Container>
      )
  }

}

export default withRouter(SubscribeContainer);