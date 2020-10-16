import React, { useState, useEffect} from "react";
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SubscribeContainer from '../subscribe';
import {subscribe, unsubscribe } from '../../store/slices/isSubscribe';
import { Transition, Icon, Container, Grid, Segment, Placeholder, Header } from 'semantic-ui-react';
import { fetchWarnings } from '../../store/slices/warningsSlice';
import MessageErrror from '../dummy/messages/messageError';
import { responseErrorsHumanize } from '../../actions/weatherActions/api';
import WarningComponent  from '../dummy/warning/warningComponent';

const HomePage = (props) => {


    const testData = {
        date_end: "2020-10-01",
        date_start: "2020-10-01",
        external_link: "http://www.pogoda.by/news/?page=35691",
        hazard_level:{ 
            color_code: "FFFF00",
            danger_level: 1,
            description: "Погодные условия потенциально опасны — возможны осадки, грозы, возрастание порывов ветра, высокие или низкие температуры и др. Эти явления погоды обычны для территории страны, но временами могут представлять опасность для отдельных видов социально-экономической деятельности",
            id: 2,
            title: "Желтый уровень",
        },
        id: 1601452103,
        summary: "Желтый уровень опасности. Днем 1 октября (четверг) в отдельных районах республики ожидается усиление ветра порывами до 15-18 м/с.",
        title: "Предупреждение о неблагоприятном явлении",
        url: "http://127.0.0.1:8000/hazard/v1/warnings/1601452103/"
    }

    const [buttonsVisible, setButtonsVisible] = useState(false)
    const handleVisibleLinkClick = () => {
       setButtonsVisible(!buttonsVisible);
    }

    const isMount = true;
    
    useEffect( () =>{
        props.fetchWarnings();
    },[isMount]);

    useEffect( () => {
        setTimeout(() => setButtonsVisible(false), 6000)
    }, [buttonsVisible]);

    useEffect(() =>{
        props.warnings.length > 0 && console.log(props.warnings)
    },[props.warnings]);

    return (     
        <Container>
          <Segment basic={true} centered="true">
            <Segment basic={true} centered="true">
                <Grid>
                    <Grid.Column textAlign="center">
                        <a className="spoiler" onClick={handleVisibleLinkClick} >
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
                <Segment basic centered="true">
                <Grid>
                    <Grid.Column textAlign="center">
                       <Header as='h3'>Актуальные предупреждения о неблагоприятных явлениях</Header> 
                    </Grid.Column>
                </Grid>
                </Segment>
                <Segment basic>
                    {props.loadingWarnings ? 
                        <Placeholder>
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                        </Placeholder>  
                        : props.responseErrorWarnings ?
                            <MessageErrror message={responseErrorsHumanize(props.errorMessageWarnings)}/>
                            : <Segment>

                              </Segment>
                    }
                    <Segment.Group>
                        <WarningComponent data = {testData}/>
                    </Segment.Group>
                </Segment>
                
            </Segment>
          </Segment>
        </Container>
 
        
    )

}

function mapStateToProps(state) {
    return {
      isSubscribe : state.isSubscribe,
      warnings: state.warnings.warningsArr,
      loadingWarnings : state.warnings.loading,
      responseErrorWarnings : state.warnings.responseError,
      errorMessageWarnings : state.warnings.errorMessage
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      subscribe, unsubscribe, 
      fetchWarnings
   }, dispatch)
  }

  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomePage));

