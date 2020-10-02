import subscribe from "../subscribe/forms/subscribe";
import React, { useState, useEffect } from "react";
import SubscribeContainer from '../subscribe';
import { Accordion, Icon } from 'semantic-ui-react'

const HomePage = (props) => {

    const [activeIndex, setActiveIndex] = useState((index)=>{
        return index
    });

    const handleAccordionClick = (e ) => {

    }

    return (
        <Accordion>
            <Accordion.Title
                index = {0}
                active= {activeIndex === 0}
                onClick = {handleAccordionClick}
            >
                 <Icon name='dropdown' />
                Dropdown
            </Accordion.Title>
        </Accordion>
    )

}

export default HomePage;

