import subscribe from "../subscribe/forms/subscribe";
import React, { useState, useEffect } from "react";
import SubscribeContainer from '../subscribe';
import { Transition, Link, Icon, Container, Grid, Segment, Button } from 'semantic-ui-react'

const HomePage = (props) => {

    const [buttonsVisible, setButtonsVisible] = useState(false)
    const handleVisibleLinkClick = () => {
       setButtonsVisible(!buttonsVisible);
    }

    return (
        <Container className="no-border-bottom">
        <Segment.Group>
          <Segment centered="true">
            <Grid>
              <Grid.Column textAlign="center">
               <a className="spoiler" onClick={handleVisibleLinkClick}>
                     { buttonsVisible ? <Icon name='chevron down'/> : <Icon name='chevron right'/> }
                    <span className="dotted"> Оформление/отмена подписки на рассылку штормовых предупреждений </span>
                </a>
                <Transition visible={buttonsVisible} animation='slide down' duration={500}>
                   <span>Text</span>
                </Transition>
              </Grid.Column>
            </Grid>
          </Segment>
          <Segment basic={true}>   

          </Segment>  
        </Segment.Group>
      </Container>
        
    )

}

export default HomePage;

