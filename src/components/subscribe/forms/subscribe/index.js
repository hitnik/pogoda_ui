import React, { PureComponent} from "react";
import {withRouter} from 'react-router-dom';
import { subscribeThunk } from '../../../../store/slices/subForm';
import store from '../../../../store/store';
import {Segment, Button, Grid, Form, Header, Container} from 'semantic-ui-react';
import WeatherAPIConnector from '../../../../actions/subscribeActions/api'
import { subscribe } from "../../../../store/slices/isSubscribe";

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
    this.props.history.push('/');
  }

  render () {
      const {submitAction} = this.props
      
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
    const input = <Form.Input required name={this.name} label={this.label} placeholder={this.placeholder}
                              defaultValue = {this.props.data.value} 
                              error={this.props.data.error ? (this.props.data.msg) : undefined}
                              onChange={this.onChange}
                              />
    return input; 
  }
} 


class SubscribeForm extends PureComponent{


  constructor(props){
    super(props)
 
    this.state = {
      isLoading: false,
      titleError: false,
    };
    

  }

  validate = () => {
    if (this.props.isSubscribe && this.props.subForm.title.value === '') {
      this.props.setTitleErrorRequired();
      return false; 
    }
    if (this.props.subForm.email.value === ''){
      this.props.setEmailErrorRequired();
      return false; 
    }
    else if (! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.props.subForm.email.value)){
      this.props.setEmailErrorFormat();
      return false; 
    }
    return true;
  }

  handleInputChange = (event) =>{
    const name= event.target.name
    if(name == 'email'){
      this.props.setEmail(event.target.value);
      this.props.clearEmailError();
    }
    if(name == 'title'){
      this.props.setTitle(event.target.value);
      this.props.clearTitleError();
    }
  }


  handleSubmit = (e) => {
    e.preventDefault();

    if (! this.validate()) {return null};

    console.log(this.props.subForm.title);
    console.log(this.props.subForm.email);
    store.dispatch(subscribeThunk());



    // let api = new WeatherAPIConnector();
    // api.sendSubscribe(this.state.title.value,this.state.email.value)
    //   .then((response) =>{
    //     if (response.ok){
    //       if (response.status === 200){
    //         console.log(response)
    //       }
    //       else if (response.status === 302){
            
    //       }
    //     }
    //   });
    }

  

  render () {
    const isSubscribe = this.props.isSubscribe;
    const form = isSubscribe ? (<Form loading={this.props.subForm.loading === 'pending' ? true: false} widths="equal">
      <Form.Group>
        <FormInput data = {this.props.subForm.title}
                   onChange = {this.handleInputChange}
                   name = 'title'
                   label = 'Title'
                   placeholder = 'ФИО'   
                  />
        <FormInput data = {this.props.subForm.email}
                   onChange = {this.handleInputChange}
                   name = 'email'
                   label = 'Email'
                   placeholder = 'Адрес электронной почты'   
                  />
      </Form.Group>
        <ButtonGroupSubmitClose submitAction={this.handleSubmit} history={this.props.history} />
    </Form>
    ) : (<Form loading={this.state.isLoading} widths="equal">
      <Form.Group>
        <FormInput data = {this.state.email}
                   onChange = {this.handleInputChange}
                   name = 'email'
                   label = 'Email'
                   placeholder = 'Адрес электронной почты'   
                  />
      </Form.Group>
        <ButtonGroupSubmitClose submitAction={this.handleSubmit} history={this.props.history}/>
    </Form>
    )
  return form;
  }
}

class SegmentForms extends PureComponent{

    render () {

     const isSubscribe = this.props.isSubscribe;
     const history = this.props.history; 
     const location = this.props.location;
     const subForm = this.props.subForm;
     
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
               <SubscribeForm isSubscribe = {isSubscribe} 
                              history={history} 
                              location={location} 
                              subForm = {subForm} 
                              setEmail = {this.props.setSubFormEmail}
                              setTitle = {this.props.setSubFormTitle} 
                              clearTitleError = {this.props.clearSubFormTitleError}
                              clearEmailError = {this.props.clearSubFormEmailError}
                              setTitleErrorRequired = {this.props.setSubFormTitleErrorRequired}
                              setEmailErrorRequired = {this.props.setSubFormEmailErrorRequired}
                              setEmailErrorFormat = {this.props.setSubFormEmailErrorFormat}
                              sendSubscribeRequest= {this.props.sendSubscribeRequest}

               />
          </Segment>  
            </Segment.Group>
          </Container>
      )
    }

}

export default withRouter(SegmentForms)