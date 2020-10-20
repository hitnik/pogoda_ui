import React, { useState, useEffect} from "react";
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SubscribeContainer from '../subscribe';
import {subscribe, unsubscribe } from '../../store/slices/isSubscribe';
import { Transition, Icon, Container, Grid, Segment, Placeholder, Header } from 'semantic-ui-react';
import { fetchWarnings, fetchWarningsNext } from '../../store/slices/warningsSlice';
import MessageErrror from '../dummy/messages/messageError';
import { responseErrorsHumanize } from '../../actions/weatherActions/api';
import WarningComponent  from '../dummy/warning/warningComponent';


const host = PRODUCTION ?  WEATHER_API_HOST_PROD : 'data.WEATHER_API_HOST_DEV;'


const HomePage = (props) => {

    console.log(host)

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
    const [isMount, setIsMount] = useState(true);

    const handleVisibleLinkClick = () => {
       setButtonsVisible(!buttonsVisible);
    }
 
    const isBottom =  (el) =>{
        return el.getBoundingClientRect().bottom <= window.innerHeight;
      }

    const trackScrolling = () => {
        const wrappedElement = document.getElementById('root');
        if (isBottom(wrappedElement)) {
          props.next && props.fetchWarningsNext();  
        }
      };

    useEffect( () =>{
        props.fetchWarnings();
        document.addEventListener('scroll', trackScrolling);
    },[isMount]);

    useEffect( () =>{
        setTimeout(() => { 
            setIsMount(!isMount);
        },600000);
    });

    useEffect( () => {
        setTimeout(() => setButtonsVisible(false), 180000)
    }, [buttonsVisible]);

    return (     
        <Container >
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
                                : props.warnings.length > 0 ?
                                    <div>
                                        {props.warnings.map(
                                            item => <WarningComponent key={item.id} data = {item}/>
                                        )}
                                    </div>
                                    : <Header textAlign='center' as='h4'>Здесь пусто!</Header> 
                    }
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
      errorMessageWarnings : state.warnings.errorMessage,
      next: state.warnings.next
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      subscribe, unsubscribe, 
      fetchWarnings, fetchWarningsNext
   }, dispatch)
  }

  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomePage));

