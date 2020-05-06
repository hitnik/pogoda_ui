import React, { PureComponent } from "react";

import {Segment,  Container, Header, Grid, ButtonOr} from 'semantic-ui-react';

import ButtonsSubScribe from "./buttons";
import SegmentForm from "./forms";

export default class SubscribeContainer extends PureComponent{
  constructor(props){
    super(props);
    this.state = {
      isButtonsVisible: true,
      isFormVisible: false,
      isSubscribe: true, 
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
                <ButtonsSubScribe
                          visible = {this.state.isButtonsVisible}
                          callForm = {this.callForm.bind(this)}
                />
                <SegmentForm
                          visible = {this.state.isFormVisible}
                          updateFormVisible = {this.segmentAccordeonVisibility.bind(this)}
                          isSubscribe = {this.state.isSubscribe}

                />
              </Segment>  
            </Segment.Group>
          </Container>
      )
  }

  callForm = (isSubscribe) => {
    this.setState({isSubscribe: isSubscribe});
    this.segmentAccordeonVisibility();
  }

  

  segmentAccordeonVisibility = () => {
    this.setState((prevState) =>{return {isButtonsVisible: !prevState.isButtonsVisible,
                                         isFormVisible: !prevState.isFormVisible, 
    }})
  }

}

