import React, { useState, useEffect} from "react";
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Segment, Header, Grid} from 'semantic-ui-react';
import MenuForumsComponent from '../dummy/forums/menuForumcomponent';
import ErrorComponent from '../dummy/errorComponent';
import {fetchSiteData, fetchForums, fetchTopics,
        setForumsMenuActiveIndex, setSitesMenuActiveIndex,
        setDate, 
        } from '../../store/slices/forumsSlice';
import TopicsContainer from '../dummy/forums/topicContainer';
import {dateDecrement, dateIncrement, isYearPassed,
        isTommorow
        } from '../../utils';
import {fetchWarnings} from '../../store/slices/warningsSlice';

const warnings =  [
    {
        "id": 1605943797,
        "url": "http://10.254.90.101/hazard/v1/warnings/1605943797/",
        "title": "Предупреждение о неблагоприятном явлении",
        "external_link": "http://www.pogoda.by/news/?page=35907",
        "summary": "22 ноября (воскресенье) на отдельных участках дорог республики ожидается гололедица.В дневные часы местами ожидается \nусиление ветра порывами до 15-18 м/с.",
        "hazard_level": {
            "id": 2,
            "title": "Желтый уровень",
            "danger_level": 1,
            "color_code": "FFFF00",
            "description": "Погодные условия потенциально опасны — возможны осадки, грозы, возрастание порывов ветра, высокие или низкие температуры и др. Эти явления погоды обычны для территории страны, но временами могут представлять опасность для отдельных видов социально-экономической деятельности"
        },
        "date_start": "2020-11-22",
        "date_end": "2020-11-22"
    },
    {
        "id": 1605937976,
        "url": "http://10.254.90.101/hazard/v1/warnings/1605937976/",
        "title": "Предупреждение о неблагоприятном явлении",
        "external_link": "http://www.pogoda.by/news/?page=35906",
        "summary": "21 ноября (суббота) местами по востоку республики на отдельных участках дорог сохранится гололедица.",
        "hazard_level": {
            "id": 3,
            "title": "Оранжевый уровень",
            "danger_level": 2,
            "color_code": "FFA500",
            "description": "Погодные условия представляют реальную опасность — шквалы, ливни, грозы, град, жара, морозы, снегопады, метели и пр. Явления могут негативно повлиять на социально-экономическую деятельность и привести к значительному материальному ущербу, а также возможны человеческие жертвы"
        },
        "date_start": "2020-11-21",
        "date_end": "2020-11-21"
    },
    {
        "id": 1605857830,
        "url": "http://10.254.90.101/hazard/v1/warnings/1605857830/",
        "title": "Предупреждение о неблагоприятном явлении",
        "external_link": "http://www.pogoda.by/news/?page=35901",
        "summary": " отдельных участках дорог республики ожидается гололедица.",
        "hazard_level": {
            "id": 2,
            "title": "Желтый уровень",
            "danger_level": 1,
            "color_code": "FFFF00",
            "description": "Погодные условия потенциально опасны — возможны осадки, грозы, возрастание порывов ветра, высокие или низкие температуры и др. Эти явления погоды обычны для территории страны, но временами могут представлять опасность для отдельных видов социально-экономической деятельности"
        },
        "date_start": "2020-11-21",
        "date_end": "2020-11-21"
    },
]


const ForumsComponent = (props) => {

       
    const [warningsIndex, setWarningsIndex] = useState(0);

    const [isMount, setIsMount] = useState(true);

    useEffect( () =>{
        props.fetchWarnings();
    },[isMount]);


    useEffect( () =>{
        setTimeout(() => { 
            setIsMount(!isMount);
        },600000);
    });

    useEffect(() => {
       if (props.warnings.length > 1) {
            setTimeout(() => {
                setWarningsIndex((warningsIndex+1)%props.warnings.length);
            }, 20000);   
       }   
      });

    useEffect(() => {
        props.fetchSiteData();
      }, [props.date]);

    useEffect(() =>{
        props.siteMenuActiveIndex != null && props.fetchForums();
    }, [props.siteMenuActiveIndex]);

    useEffect(() =>{
        props.forumsMenuActiveIndex != null && props.fetchTopics();
    }, [props.forumsMenuActiveIndex]);



    const handleForumMenuItemClick = (e) =>{
        const regex = /forum_/;
        const index = parseInt(e.target.id.replace(regex, ''));
        props.setForumsMenuActiveIndex(index)
    }

    const handleSiteMenuItemClick = (e) =>{
        const regex = /site_/;
        const index = parseInt(e.target.id.replace(regex, ''));
        props.setSitesMenuActiveIndex(index)
    }

    const handleClickDateLeft = () =>{
        const date = dateDecrement(props.date);
        if (isYearPassed(date)){return}
        props.setDate(dateDecrement(props.date));
    }

    const handleClickDateRight = () =>{
        const date = dateIncrement(props.date)
        if (isTommorow(date)){return}
        props.setDate(dateIncrement(props.date));
    }

    return (
        <Container>
            {props.error === null ?
                <Segment.Group>
                    <MenuForumsComponent siteData={props.siteData.data}
                                        activeIndex = {props.siteMenuActiveIndex}
                                        date = {props.date}
                                        onMenuClick = {handleSiteMenuItemClick}
                                        handleClickLeft = {handleClickDateLeft}
                                        handleClickRight = {handleClickDateRight}
                                        handleDateChange = {props.setDate}
                    />
                    {props.siteMenuActiveIndex != null
                        ? 
                        <TopicsContainer forums={props.forums}
                                     activeIndex={props.forumsMenuActiveIndex}
                                     topics = {props.topics}  
                                     onMenuClick = {handleForumMenuItemClick}
                                     warning = {props.warnings[warningsIndex]}
                        />
                        :
                        <Segment>
                             <Grid >
                                <Grid.Column textAlign="center">
                                    <Header as='h4'>Здесь пусто</Header>
                                </Grid.Column>
                             </Grid>
                        </Segment>
                    }    
                </Segment.Group>
            : <ErrorComponent/>
        } 
        </Container>
    )
}



const mapStateToProps = (state) => {
    return {
        siteData: state.forumsSlice.siteData,
        error: state.forumsSlice.error,
        date: state.forumsSlice.date,
        siteMenuActiveIndex: state.forumsSlice.siteMenuActiveIndex,
        forumsMenuActiveIndex: state.forumsSlice.forumsMenuActiveIndex,
        forums: state.forumsSlice.forums,
        topics: state.forumsSlice.topics,
        warnings: state.warnings.warningsArr,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchSiteData, fetchForums, fetchTopics,
        setForumsMenuActiveIndex, setSitesMenuActiveIndex,
        setDate, fetchWarnings
      
   }, dispatch)
  }

  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ForumsComponent));
