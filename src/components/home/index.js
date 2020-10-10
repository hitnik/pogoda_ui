import React, { useState, useEffect} from "react";
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SubscribeContainer from '../subscribe';
import {subscribe, unsubscribe } from '../../store/slices/isSubscribe';
import { Transition, Icon, Container, Grid, Segment, Placeholder, Header } from 'semantic-ui-react';
import {getWarnings} from '../../actions/weatherActions/api';
import {fetchWarnings, requestedWarnings} from '../../store/slices/warnings';

const HomePage = (props) => {

    const [buttonsVisible, setButtonsVisible] = useState(false)
    const handleVisibleLinkClick = () => {
       setButtonsVisible(!buttonsVisible);
    }
    const isMount = true;
    
    useEffect( () =>{
        console.log('after mount')
        fetchWarnings();
    },[isMount]);

    return (     
        <Container>
          <Segment basic={true} centered="true">
            <Segment basic={true} centered="true">
                <Grid>
                    <Grid.Column textAlign="center">
                        <a className="spoiler" onClick={handleVisibleLinkClick}>
                            { buttonsVisible ? <Icon name='chevron down'/> : <Icon name='chevron right'/> }
                            <span className="dotted"> Оформление/отмена подписки на рассылку штормовых предупреждений </span>
                        </a>
                        <Transition visible={buttonsVisible} animation='slide down' duration={500}>
                            <Container>
                                {buttonsVisible && 
                                    <SubscribeContainer 
                                        history = {props.history}
                                        subscribe = {props.subscribe}
                                        unsubscribe = {props.unsubscribe}
                                    />}
                            </Container>
                        </Transition>
                    </Grid.Column>
                </Grid>
            </Segment> 
            <Segment>
                <Segment basic={true} centered="true">
                <Grid>
                    <Grid.Column textAlign="center">
                       <Header as='h3'>Актуальные предупреждения о неблагоприятных явлениях</Header> 
                    </Grid.Column>
                </Grid>
                </Segment>
                <Segment>
                  <Placeholder>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                </Placeholder>  
                </Segment>
                
            </Segment>
          </Segment>
        </Container>
 
        
    )

}

function mapStateToProps(state) {
    return {
      isSubscribe: state.isSubscribe,
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      subscribe, unsubscribe, fetchWarnings, requestedWarnings
   }, dispatch)
  }

  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomePage));

