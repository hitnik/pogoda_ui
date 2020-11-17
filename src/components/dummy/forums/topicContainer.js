import React from "react";
import {Menu, Label, Segment, Grid, Item} from 'semantic-ui-react';
import {convertDateToTopic} from '../../../utils';
import ReactHtmlParser from 'react-html-parser';

const ForumsMenuItem = (props) =>{

    const handleClick= () =>{
        console.log('click n menu');
        props.handleClick();
    }

    return (
        <Menu.Item 
            {...((props.count > 0 && !props.active) ? {style: {cursor:'pointer'}} : {})}
            id={props.id}
            active={props.active}
            onClick= {handleClick} 
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

    const onMenuItemClick = () =>{
        props.onMenuClick()
    }

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
                                                        id = {index}
                                                        count = {item.count}
                                                        handleClick = {onMenuItemClick}
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

export default TopicsContainer;