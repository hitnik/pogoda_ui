import React from 'react';
import {Segment, Item, Popup, Icon, Header} from 'semantic-ui-react';

const colors ={
    '008000' : 'green',
    'FFFF00' : 'yellow',
    'FFA500' : 'orange',
    'FF0000' : 'red'
}

const colorsBanner ={
    '008000' : '#2a9d8f',
    'FFFF00' : '#ffd166',
    'FFA500' : '#f4a261',
    'FF0000' : '#e76f51'
}

const Pop = (props) => {
    return(
    <Popup content={props.content}
            trigger={props.trigger} 
            size='tiny'
            wide='very'
        />
    )
}

const WarningComponent = (props) =>{

    return (
        <Segment color={colors[props.data.hazard_level.color_code]}>
            <Item.Group>
            <Item>
                <Item.Image size='mini'>
                    <Pop
                        content={props.data.hazard_level.description} 
                        trigger ={<Icon name='stop' color={colors[props.data.hazard_level.color_code]}  size='huge'/>}
                    />
                </Item.Image>
                <Item.Content>
                    <Item.Header ><Header as='h5'>{props.data.title}</Header></Item.Header>
                    <Item.Meta >
                        <Pop content={props.data.hazard_level.description}
                            trigger={<span>{props.data.hazard_level.title} опасности</span>} 
                        />
                    </Item.Meta>
                    <Item.Description>{props.data.summary}</Item.Description>
                    <Item.Extra><a href={props.data.external_link}>Показать оригинал</a></Item.Extra>
                </Item.Content>
            </Item>
            </Item.Group>
            
        </Segment>
    )
}

const WarningComponentLigthWeight = (props) =>{

    return ( 
             props.data ?    
            <Segment compact color={colors[props.data.hazard_level.color_code]} 
                    style={{background: colorsBanner[props.data.hazard_level.color_code]}}
            >
                <Item>
                    <Item.Header >
                        <Header as='h5'>{props.data.hazard_level.title}.</Header>
                    </Item.Header>
                    <Item.Content>
                        <Item.Description>{props.data.summary}</Item.Description>
                    </Item.Content>
                </Item>
            </Segment>
            : null     
    )
}


export {WarningComponentLigthWeight};

export default WarningComponent;