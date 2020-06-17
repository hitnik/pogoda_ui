import React, { PureComponent } from "react";

import {Segment,  Container, Header, Grid, ButtonOr} from 'semantic-ui-react';

import ButtonsSubScribe from "./buttons";
import SegmentForm from "./forms";

export default class SubscribeContainer extends PureComponent{
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
                <ButtonsSubScribe/>
              </Segment>  
            </Segment.Group>
          </Container>
      )
  }

}

