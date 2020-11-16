import React from "react";
import {Menu,  Icon, Segment, Button} from 'semantic-ui-react';
import SiteMenuItem from './siteMenuItem';
import {convertDateToLocalRu, convertDateToTopic} from '../../../utils';


const MenuForumsComponent = (props) =>{

    return (
        <Segment>
            <Menu pointing secondary fluid stackable>
                <Menu.Menu position='left'>
                    {props.siteData.map(
                        (item, index) => <SiteMenuItem key={item.id} 
                                                active={index === props.activeIndex}  
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
                        <input type="text" value={convertDateToTopic(props.date)} ></input>
                        <Button className="label right icon"><Icon name="arrow right" size="big" /></Button>
                    </div>
                </Menu.Item>
            </Menu.Menu>
        </Menu>
        </Segment>
        
    )
}

export default MenuForumsComponent;