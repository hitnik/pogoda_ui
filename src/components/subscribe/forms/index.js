import React, { PureComponent } from "react";

import {Segment, Button, Grid, Form, Transition} from 'semantic-ui-react';

class ButtonFormClose extends PureComponent {

  render () {
    return <Form.Button onClick={this.props.onClick}>Закрыть</Form.Button>
  }
}

class SubscribeForm extends PureComponent{

  render () {
    const updateFormVisible = this.props.updateFormVisible
    const form = (
      <Form widths="equal">
        <Form.Group>
          <Form.Input  label="Title" placeholder="Title" />
          <Form.Input label="Email" placeholder="Email" />
        </Form.Group>
        
          <div className="rightAlign">
            <Button.Group>
              <ButtonFormClose floated="right" onClick={updateFormVisible}/>
            </Button.Group>
          </div>
      
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
