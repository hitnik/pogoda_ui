import React, { PureComponent } from "react";
import { withRouter, useHistory} from 'react-router-dom';

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
    
    constructor(props){
      super(props)
      this.history=props.history
    }

    onClick(isSubscribe, event) {
    
      if(this.history && isSubscribe) this.history.push('/subscribe');
      else if(this.history) this.history.push('/unsubscribe');
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
  
  render() {

      const history = this.props.history;

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
                <ButtonsSubScribeContainer history={history}/>
              </Segment>  
            </Segment.Group>
          </Container>
      )
  }

}

export default withRouter(SubscribeContainer);