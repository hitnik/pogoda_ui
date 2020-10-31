import React, { PureComponent } from "react";
import {Segment,  Container, Header, Grid, Button} from 'semantic-ui-react';
import { setStoreInitial } from '../../store/store';
import ModalGetUser from '../modals/modalGetUser';

class ButtonSubscribe extends PureComponent {
    render() {
      return <Button positive onClick={this.props.onClick} >Подписаться на рассылку</Button>;
    }
  }

  class ButtonEdit extends PureComponent {
    render() {
      return <Button color='blue' onClick={this.props.onClick} >Изменить параметры</Button>;
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
                        <ButtonEdit onClick={this.props.onClickEdit}/>
                        <Button.Or/>
                        <ButtonUnsubscribe onClick={this.props.onClickUnsubscribe}/>
                    </Button.Group>
                    </Grid.Column>
                  </Grid>
      );
  
      return (segmentButtons)
    }
  }
  

class SubscribeContainer extends PureComponent{
  
  constructor(props){
    super(props)
 
    this.state = {
      modalVisible: false,
    };
  }

  onClickSubscribe = () => {
    this.props.subscribe();
    setStoreInitial();
    this.props.history.push('/subscribe')
  }

  onClickUnsubscribe = () =>{
    this.props.unsubscribe();
    setStoreInitial();
    this.props.history.push('/subscribe')
  }

  onClickEdit = () => {
    this.setState((prevState, props) => {return {modalVisible: !prevState.modalVisible}})
    console.log(this.state.modalVisible)
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
                                           onClickEdit={this.onClickEdit.bind(this)}
                                           />
              </Segment>  
            </Segment.Group>
          </Container>
      )
  }
}

export default SubscribeContainer;