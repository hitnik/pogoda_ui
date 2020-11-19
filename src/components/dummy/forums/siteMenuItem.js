import React from "react";
import {Menu, Label} from 'semantic-ui-react';

const SiteMenuItem = (props) => {

    return (
        <Menu.Item 
            {...((props.count > 0 && !props.active) ? {style: {cursor:'pointer'}} : {})}
            id = {props.id}
            active={props.active}
            {...(props.count > 0 && !props.active) && {onClick : props.handleClick}}
        >   
            {props.count > 0 &&
                <Label color='teal' floating>{props.count}</Label>
            }   
            {props.name} 
        </Menu.Item>
    )
}

export default SiteMenuItem;