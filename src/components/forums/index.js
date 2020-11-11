import React, { useState, useEffect} from "react";
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Menu, Container, Label, Icon, Segment, Button, Image, Grid} from 'semantic-ui-react';


const SiteMenuItem = (props) => {

    return (
        <Menu.Item 
            {...((props.count > 0 && !props.active) ? {style: {cursor:'pointer'}} : {})}
            name={props.short}
            active={props.active}
            onClick= {props.handleClick} 
        >
            {props.name}
            {props.count > 0 &&
                <Label color='teal' floating>{props.count}</Label>
            }    
        </Menu.Item>
    )
}

const ForumComponent = (props) =>{

    return (
        <Segment color='teal' raised >
            {props.title}
        </Segment>
    )
}

const TopicsContainer = (props) => {

    return (
        <Segment basic>
            <Grid celled>
                <Grid.Row>
                    <Grid.Column only='mobile'>
                        <Button inverted color="black" className="label icon">
                            <Icon name="sidebar" size="big"/>
                            </Button>
                        
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={5} only="computer">
                        <Menu fluid vertical tabular stackable>
                            <Menu.Item
                            name='bio'
                            active={true}

                            />
                            <Menu.Item
                            name='pics'
                            active={false}
                            />
                            <Menu.Item
                            name='companies'
                            active={false}
                            />
                            <Menu.Item
                            name='links'
                            active={false}
                            />
                        </Menu>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={16} computer={11}>
                        <Image src='https://react.semantic-ui.com/images/wireframe/centered-paragraph.png' />
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
        <Segment fluid='true'>
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
        <Container fluid> 
            <MenuForumsComponent/>
            <TopicsContainer/>
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
