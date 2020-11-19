import React from "react";
import {Menu,  Icon, Segment, Button} from 'semantic-ui-react';
import SiteMenuItem from './siteMenuItem';
import {convertDateToTopic} from '../../../utils';
import CalendarComponent from './calendar';

const MenuForumsComponent = (props) =>{


    return (
        <Segment>
            <Menu pointing secondary fluid stackable>
                <Menu.Menu position='left'>
                    {props.siteData.map(
                        (item, index) => <SiteMenuItem key={item.id} 
                                                active={index === props.activeIndex}  
                                                name = {item.name}
                                                id = {'site_'+index.toString()}
                                                count = {item.count}
                                                handleClick = {props.onMenuClick}
                                        />
                )}
            </Menu.Menu>
            <Menu.Menu position="right">
                <Menu.Item>
                        <CalendarComponent/>
                        <div  className="ui  left right labeled input">
                            <Button className="label left icon"
                                    onClick={props.handleClickLeft}
                            >
                                <Icon name="arrow left" size="big" />
                            </Button>
                            <input  type="text" 
                                    readonly="readonly"
                                    value={convertDateToTopic(props.date)}
                            > 
                            </input>
                            <Button className="label right icon"
                                    onClick={props.handleClickRight}
                            >
                                <Icon name="arrow right" size="big" />
                            </Button>
                        </div>
                </Menu.Item>
            </Menu.Menu>
        </Menu>
        </Segment>
        
    )
}

export default MenuForumsComponent;