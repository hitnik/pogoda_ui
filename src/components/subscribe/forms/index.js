import React, { PureComponent, Fragment } from "react";

import {Segment, Button, Grid, Form, Transition, Container} from 'semantic-ui-react';

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

class SubscribeForm extends PureComponent{

  constructor(props){
    super(props)

    this.form = React.createRef();

    this.titleProps = {
      value: '',
      error: false,
      msgs:{
        required: {error:'Заполните это поле'}
      }
    };

    this.state = {
      title: this.titleProps,
      email: '',
      titleError: false,
    };

  }

  validate = () => {
    const titleError = this.state.title.error
    let valid = true;
    if (this.state.title.value === '') {
      this.setState((prevState) =>{return {title: {
        ...prevState.title,
        error: !prevState.title.error 
      }}});
      valid = false 
    }
    return valid;
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
    e.preventDefault()
    console.log('valid:  ' + this.validate());
  }

  render () {
    const updateFormVisible = this.props.updateFormVisible;
    const isSubscribe = this.props.isSubscribe;
    const form = isSubscribe ? (<Form ref={this.form} widths="equal">
      <Form.Group>
        <Form.Input required name="title" label="Title" placeholder="Title" 
                    {...(this.state.title.error ? {...this.state.title.msgs.required} : {})}
                    onChange={this.handleInputChange}
                    />
        <Form.Input required type="email" name="email" label="Email" placeholder="Email" onChange={this.handleInputChange}/>
      </Form.Group>
        <ButtonGroupSubmitClose closeAction={updateFormVisible} 
                                submitAction={this.handleSubmit} 
        />
    </Form>
    ) : (<Form widths="equal">
      <Form.Group>
        <Form.Input required label="Email" placeholder="Email" onChange={this.handleInputChange}/>
      </Form.Group>
        <ButtonGroupSubmitClose closeAction={updateFormVisible} />
    </Form>
    )
  return form;
  }
}

export default class SegmentForms extends PureComponent{

    render () {

      const {visible, updateFormVisible, isSubscribe} = this.props
     

      return (
          <Transition.Group animation='drop' duration={750}>
              {visible && <SubscribeForm updateFormVisible={updateFormVisible}
                                        isSubscribe = {isSubscribe}
              />
              }
          </Transition.Group>
      )
    }



}
