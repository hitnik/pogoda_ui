import React, { PureComponent} from "react";

import {Segment, Button, Grid, Form, Header, Container} from 'semantic-ui-react';
import WeatherAPIConnector from '../../../../actions/subscribeActions/subscribe'

class ButtonFormClose extends PureComponent {

  render () {
    return <Form.Button onClick={this.props.onClick} content="Закрыть" />
  }
}

class ButtonFormSubmit extends PureComponent {
   render () {
     return <Form.Button positive onClick={this.props.onClick} content="Отправить"/>
   }
}

class ButtonGroupSubmitClose extends PureComponent {

  constructor(props) {
    super(props);
    this.close= this.close.bind(this);
  }

  close = (e) => {
    e.preventDefault();
    this.props.closeAction();
  }

  render () {
      const {closeAction, submitAction} = this.props
      
      const buttonGroup = (
        <Grid>
          <Grid.Row >
            <Grid.Column textAlign="right">
            <Button.Group >
              <div className="padBut">
              <ButtonFormClose className="padBut" onClick={this.close}/>
              </div>
              <div className="padBut.right">
                <ButtonFormSubmit  onClick={submitAction}/>
              </div>
            </Button.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    )
      return buttonGroup
  }
}

class FormInput extends PureComponent {
  constructor (props){
    super(props)
    this.onChange = props.onChange
    this.name = props.name
    this.label = props.label
    this.placeholder = props.placeholder

  }
  
  render () {
    const data = this.props.data
    const input = <Form.Input required name={this.name} label={this.label} placeholder={this.placeholder} 
                              {...(data.error ? {...data.msg} : {})}
                              onChange={this.onChange}
                              />
    return input
  }
} 

class SubscribeForm extends PureComponent{

  formErrors = {
    required : {error: 'Заполните это поле'},
    emailFormat : {error: 'Неправильный формат адреса'}
  }

  inputProps = {
    value: '',
    error: false,
    msg: null
  };

  constructor(props){
    super(props)
 
    this.state = {
      isLoading: false,
      title: this.inputProps,
      email: this.inputProps,
      titleError: false,
    };

  }

  validate = () => {
    if (this.props.isSubscribe && this.state.title.value === '') {
      console.log('in title')
      this.setState((prevState) =>{return {title: {
        ...prevState.title,
        error: !prevState.title.error,
        msg :  this.formErrors.required
      }}});
      return false; 
    }
    if (this.state.email.value === ''){
      this.setState((prevState) =>{return {email: {
        ...prevState.title,
        error: !prevState.title.error,
        msg :  this.formErrors.required
      }}});
      return false; 
    }
    else if (! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email.value)){
      this.setState((prevState) =>{return {email: {
        ...prevState.title,
        error: !prevState.title.error,
        msg :  this.formErrors.emailFormat
      }}});
      return false; 
    }
    return true;
  }

  handleInputChange = (event) =>{
    const name= event.target.name
    this.setState({
      [name] : {
        value : event.target.value,
        error : false
      }
    });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    if (! this.validate()) {return null};
    this.setState((prevState) =>{return {isLoading: !prevState.isLoading}});
    console.log(this.state.title.value);
    console.log(this.state.email.value);
    let api = new WeatherAPIConnector();
    api.sendSubscribe(this.state.title.value,this.state.email.value)
      .then((response) =>{
        if (response.ok){
          if (response.status === 200){
            console.log(response)
          }
          else if (response.status === 302){
            
          }
        }
      });
      }

  render () {
    const isSubscribe = this.props.isSubscribe;
    const form = isSubscribe ? (<Form loading={this.state.isLoading} widths="equal">
      <Form.Group>
        <FormInput data = {this.state.title}
                   onChange = {this.handleInputChange}
                   name = 'title'
                   label = 'Title'
                   placeholder = 'ФИО'   
                  />
        <FormInput data = {this.state.email}
                   onChange = {this.handleInputChange}
                   name = 'email'
                   label = 'Email'
                   placeholder = 'Адрес электронной почты'   
                  />
      </Form.Group>
        <ButtonGroupSubmitClose submitAction={this.handleSubmit}  />
    </Form>
    ) : (<Form widths="equal">
      <Form.Group>
        <FormInput data = {this.state.email}
                   onChange = {this.handleInputChange}
                   name = 'email'
                   label = 'Email'
                   placeholder = 'Адрес электронной почты'   
                  />
      </Form.Group>
        <ButtonGroupSubmitClose submitAction={this.handleSubmit} />
    </Form>
    )
  return form;
  }
}

export default class SegmentForms extends PureComponent{

    render () {


      const isSubscribe = this.props.isSubscribe;

      return (
        <Container>
          <Segment.Group>
            <Segment centered="true">
              <Grid>
                <Grid.Column textAlign="center">
                  { isSubscribe ? <Header as="h3" >Форма подписки на рассылку штормовых предупреждений</Header>
                  : <Header as="h3" >Форма отказа от подписки на рассылку штормовых предупреждений</Header>
                  }
                  
                </Grid.Column>
              </Grid>
            </Segment>  
            <Segment centered="true" basic={true}>
               <SubscribeForm isSubscribe = {isSubscribe} />
          </Segment>  
            </Segment.Group>
          </Container>
      )
    }

}
