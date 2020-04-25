import React, { PureComponent } from "react";

import {Segment,  Container, Header, Grid, ButtonOr} from 'semantic-ui-react';

import ButtonsSubScribe from "./buttons";
import SegmentForm from "./forms";

export default class SubscribeContainer extends PureComponent{

  state = {
    isButtonsVisible: true,
    isFormVisible: false

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
                <ButtonsSubScribe 
                          id = "buttons"
                          visible = {this.state.isButtonsVisible}
                          updateButtonsVisible = {this.segmentAccordeonVisibility.bind(this)}
                />
                <SegmentForm
                          visible = {this.state.isFormVisible}
                          updateFormVisible = {this.segmentAccordeonVisibility.bind(this)}

                />
              </Segment>  
            </Segment.Group>
          </Container>
      )
  }

  segmentAccordeonVisibility = () => {
    this.setState((prevState) =>{return {isButtonsVisible: !prevState.isButtonsVisible,
                                         isFormVisible: !prevState.isFormVisible 
    }})
  }

}

