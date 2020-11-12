import React, { useState, useEffect} from "react";
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Menu, Container, Label, Icon, Segment, Button, Image, Grid, Item, Header} from 'semantic-ui-react';
import {compareForumsData} from '../../utils';
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

const SiteMenuItem = (props) => {

    return (
        <Menu.Item 
            {...((props.count > 0 && !props.active) ? {style: {cursor:'pointer'}} : {})}
            name={props.short}
            active={props.active}
            onClick= {props.handleClick} 
        >   
            {props.count > 0 &&
                <Label color='teal' floating>{props.count}</Label>
            }   
            {props.name} 
        </Menu.Item>
    )
}


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
    const body = ''
    return (
        <div dangerouslySetInnerHTML={{__html: body}}>
        </div>
    )
}

const TopicItem = (props) =>{

    return (
            <Segment>
                <Item.Group>
                <Item>
                    <Item.Content>
                    <Item.Header as='h5'>Onliner User NikName</Item.Header>
                    <Item.Meta>12.11.2020 11:15</Item.Meta>
                    <Item.Description>
                        <HtmlComponent/>
                    </Item.Description>
                    <Item.Extra><a href="https://forum.onliner.by/viewtopic.php?t=1736876&amp;p=108662567">Перейти на сайт</a></Item.Extra>
                    </Item.Content>
                </Item>
                </Item.Group>
                
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
                            {forumsData.sort(compareForumsData).map(
                                (item, index) =>
                                item.count > 0 && <ForumsMenuItem key={item.id} 
                                                        active={index === 0}  
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
                           {forumsData.sort(compareForumsData).map(
                               (item, index) => <ForumsMenuItem key={item.id} 
                                                    active={index === 0}  
                                                    name = {item.name}
                                                    id = {item.id.toString()}
                                                    count = {item.count}
                                                />
                           )}
                        </Menu>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={16} computer={11}>
                        
                            <TopicItem/>
   
                    </Grid.Column>
                </Grid.Row>
            </Grid>
               
        </Segment>
    )
}

const MenuForumsComponent = (props) =>{

    const sitesData = [
        {
            id: 1,
            name: "onliner.by",
            short: "on",
            count: 15,
            countUrl: "http://127.0.0.1:8000/forums/v1/topics-count/1?date=",
            forumsUrl: "http://127.0.0.1:8000/forums/v1/forums/?site=1"
        },
        {
            id: 2,
            name: "providers.by",
            short: "pr",
            count: 0,
            countUrl: "http://127.0.0.1:8000/forums/v1/topics-count/2?date=",
            forumsUrl: "http://127.0.0.1:8000/forums/v1/forums/?site=2"
        },
        {
            id: 3,
            name: "otzyvy.by",
            short: "ot",
            count: 5,
            countUrl: "http://127.0.0.1:8000/forums/v1/topics-count/3?date=",
            forumsUrl: "http://127.0.0.1:8000/forums/v1/forums/?site=3"
        }
    ];

    return (
        <Segment>
            <Menu pointing secondary fluid stackable>
                <Menu.Menu position='left'>
                    {sitesData.map(
                        (item, index) => <SiteMenuItem key={item.id} 
                                                active={index === 0}  
                                                name = {item.name}
                                                short = {item.short}
                                                count = {item.count}
                                        />
                )}
            </Menu.Menu>
            <Menu.Menu position="right">
                <Menu.Item>
                    <div className="ui left right labeled input">
                        <Button className="label left icon"><Icon name="arrow left" size="big" /></Button>
                        <input type="text" ></input>
                        <Button className="label right icon"><Icon name="arrow right" size="big" /></Button>
                    </div>
                </Menu.Item>
            </Menu.Menu>
        </Menu>
        </Segment>
        
    )
}

const ForumsComponent = () => {
   
    return (
        <Container>
            <Segment.Group>
            <MenuForumsComponent/>
            <TopicsContainer/>
            </Segment.Group> 
            
        </Container>
    )
}



const mapStateToProps = (state) => {
    return {

    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({

      
   }, dispatch)
  }

  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ForumsComponent));
