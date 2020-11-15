import React from "react";
import {Menu,  Icon, Segment, Button} from 'semantic-ui-react';
import SiteMenuItem from './siteMenuItem';

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
                    {props.siteData.map(
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

export default MenuForumsComponent;