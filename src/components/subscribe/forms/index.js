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

  render () {
      const {closeAction} = this.props

      const buttonGroup = (
        <Grid>
          <Grid.Row >
            <Grid.Column textAlign="right">
            <Button.Group >
              <div className="padBut">
              <ButtonFormClose className="padBut" onClick={closeAction}/>
              </div>
              <div className="padBut.right">
              <ButtonFormSubmit/>
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

  render () {
    const updateFormVisible = this.props.updateFormVisible
    const form = (
      <Form widths="equal">
        <Form.Group>
          <Form.Input required label="Title" placeholder="Title" />
          <Form.Input required label="Email" placeholder="Email" />
        </Form.Group>
          <ButtonGroupSubmitClose closeAction={updateFormVisible} />
      </Form>
  );

  return form
  }
}

export default class SegmentForms extends PureComponent{

    render () {

      const {visible, updateFormVisible} = this.props
     

      return (
          <Transition.Group animation='drop' duration={750}>
              {visible && <SubscribeForm updateFormVisible={updateFormVisible}/>}
          </Transition.Group>
      )
    }



}
