import React, { PureComponent } from "react";
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Segment,  Container, Header, Grid, Button} from 'semantic-ui-react';
import {subscribe, unsubscribe } from '../../store/slices/isSubscribe';

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
  
    render() {
      
      const segmentButtons = (
        <Grid>
                    <Grid.Column textAlign="center">
                      <Button.Group fluid>
                        <ButtonSubscribe onClick={this.props.onClickSubscribe}/>
                        <Button.Or />
                        <ButtonUnsubscribe onClick={this.props.onClickUnsubscribe}/>
                    </Button.Group>
                    </Grid.Column>
                  </Grid>
      );
  
      return (segmentButtons)
    }
  }
  

class SubscribeContainer extends PureComponent{
  

  onClickSubscribe = () => {
    this.props.subscribe();
    this.props.history.push('/subscribe')
  }

  onClickUnsubscribe = () =>{
    this.props.unsubscribe();
    this.props.history.push('/subscribe')
  }
  
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
                <ButtonsSubScribeContainer onClickSubscribe={this.onClickSubscribe.bind(this)} 
                                           onClickUnsubscribe={this.onClickUnsubscribe.bind(this)}
                                           />
              </Segment>  
            </Segment.Group>
          </Container>
      )
  }

}


function mapStateToProps(state) {
  return {
    isSubscribe: state.isSubscribe,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    subscribe, unsubscribe
 }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SubscribeContainer));