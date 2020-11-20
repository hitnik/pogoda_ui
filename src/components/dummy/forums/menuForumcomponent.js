import React from "react";
import {Menu,  Icon, Segment, Button} from 'semantic-ui-react';
import SiteMenuItem from './siteMenuItem';
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
                    <Button className="label left icon"
                            onClick={props.handleClickLeft}
                    >
                            <Icon name="arrow left"  />
                        </Button>
                    <CalendarComponent date={new Date(props.date)}
                                       handleDateChange={props.handleDateChange} 
                    />
                    <Button className="label right icon"
                            onClick={props.handleClickRight}
                    >
                        <Icon name="arrow right"  />
                    </Button>
                </Menu.Item>
            </Menu.Menu>
        </Menu>
        </Segment>
        
    )
}

export default MenuForumsComponent;