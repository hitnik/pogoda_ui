import React from 'react'
import {Segment, Header, Icon} from 'semantic-ui-react';

const ErrorComponent = (props) =>{

    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='bug'/>
                    Что-то пошло не так (:
            </Header>
        </Segment>
    )
}

export default ErrorComponent;