import React, { PureComponent } from "react";

import {Segment, Button, Grid, Form, Transition} from 'semantic-ui-react';

export default class SegmentForms extends PureComponent{


    render () {

      const {visible, updateFormVisible} = this.props
      const sibcribeForm = (
          <Form widths="equal">
            <Form.Group>
              <Form.Input fliud label="Title" placeholder="Title" />
              <Form.Input fluid label="Email" placeholder="Email" />
            </Form.Group>
          </Form>
      );

      return (
          <Transition.Group animation='drop' duration={750}>
              {visible && sibcribeForm}
          </Transition.Group>
      )
    }



}
