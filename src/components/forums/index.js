import React, { useState, useEffect} from "react";
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Menu, Container, Label, Segment, Grid, Item} from 'semantic-ui-react';
import ReactHtmlParser from 'react-html-parser';
import MenuForumsComponent from '../dummy/forums/menuForumcomponent';
import ErrorComponent from '../dummy/errorComponent';
import {fetchSiteData, fetchForums, fetchTopics} from '../../store/slices/forumsSlice';
import {convertDateToTopic} from '../../utils';
const forumsData = [
       
        {
            id: 2,
            name: "Почему Вы так ненавидите Белтелеком?",
            site: 1,
            count: 10,
            topicsUrl: "http://172.24.64.1:8000/forums/v1/topics/?site=2"
        },
        {
            id: 3,
            name: "IPTV. Обсуждение. Решение технических вопросов.",
            site: 1,
            count: 0,
            topicsUrl: null
        },
        {
            id: 4,
            name: "ByFly. Техническая помощь. Настройка.",
            site: 1,
            count: 12,
            topicsUrl: "http://172.24.64.1:8000/forums/v1/topics/?site=4"
        },
        {
            id: 6,
            name: "ZALA.by",
            site: 1,
            count: 0,
            topicsUrl: null
        },
        {
            id: 1,
            name: "ByFly. Обсуждение.",
            site: 1,
            count: 20,
            topicsUrl: "http://172.24.64.1:8000/forums/v1/topics/?site=1"
        },
        {
            id: 5,
            name: "Задай вопрос \"Белтелекому\"",
            site: 1,
            count: 0,
            topicsUrl: null
        },
   
    ]




const ForumsMenuItem = (props) =>{

    return (
        <Menu.Item 
            {...((props.count > 0 && !props.active) ? {style: {cursor:'pointer'}} : {})}
            name={props.id}
            active={props.active}
            onClick= {props.handleClick} 
        >
            {props.count > 0 &&
                <Label color='teal' floating >{props.count}</Label>
            }    
            {props.name}
            
        </Menu.Item>
    )
}



const HtmlComponent = (props) =>{
    return (
        <div>{ ReactHtmlParser(props.html) }</div>
    )
}

const TopicItem = (props) =>{

    return (
            <Segment basic>
                <Segment raised className="topic">
                        <Item.Group>
                        <Item>
                            <Item.Content>
                            <Item.Meta className="topic-meta">
                                <h5 className="message-header-title">{props.topic.user.name}</h5>
                                <span className="message-date">{convertDateToTopic(props.topic.datePost)}</span>
                            </Item.Meta>
                            <Item.Description>
                                <Segment color='black' basic className="topic-inner">
                                  <HtmlComponent html={props.topic.topicText}/>  
                                </Segment> 
                            </Item.Description>
                            <Item.Extra><a href={props.topic.url}>Перейти на сайт</a></Item.Extra>
                            </Item.Content>
                        </Item>
                        </Item.Group>
                </Segment>
            </Segment>
            
        
    )
}

const TopicsContainer = (props) => {

    return (
        <Segment basic>
            <Grid > 
                <Grid.Row only="mobile tablet" >
                    <Grid.Column only='mobile tablet'>
                        <Menu fluid vertical>
                            {props.forums.map(
                                (item, index) =>
                                item.count > 0 && <ForumsMenuItem key={item.id} 
                                                        active={index === props.activeIndex}  
                                                        name = {item.name}
                                                        id = {item.id.toString()}
                                                        count = {item.count}
                                                    />
                            )}
                        </Menu>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={5} only="computer">
                        <Menu fluid vertical tabular>
                           {props.forums.map(
                               (item, index) => <ForumsMenuItem key={item.id} 
                                                    active={index === props.activeIndex}  
                                                    name = {item.name}
                                                    id = {item.id.toString()}
                                                    count = {item.count}
                                                />
                           )}
                        </Menu>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={16} computer={11}>
                            {props.topics.map(
                                item => <TopicItem key={item.id} topic={item}/>
                            )}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
               
        </Segment>
    )
}



const ForumsComponent = (props) => {
    
    useEffect(() => {
        props.fetchSiteData();
      }, []);

    useEffect(() =>{
        props.siteMenuActiveIndex != null && props.fetchForums();
    }, [props.siteMenuActiveIndex]);

    useEffect(() =>{
        props.forumsMenuActiveIndex != null && props.fetchTopics();
    }, [props.forumsMenuActiveIndex]);

    return (
        <Container>
            {props.error === null ?
                <Segment.Group>
                    <MenuForumsComponent siteData={props.siteData.data}
                                        activeIndex = {props.siteMenuActiveIndex}
                                        date = {props.date}
                    />
                    <TopicsContainer forums={props.forums}
                                     activeIndex={props.forumsMenuActiveIndex}
                                     topics = {props.topics}   
                    />
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
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchSiteData, fetchForums, fetchTopics
      
   }, dispatch)
  }

  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ForumsComponent));
