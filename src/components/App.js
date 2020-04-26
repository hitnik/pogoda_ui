import React, { PureComponent } from "react";

import '../styles/App.css';

import Navbar from "./main_navbar";
import SubscribeContainer from "./subscribe";
import {Container,} from 'semantic-ui-react'

export default class App extends PureComponent {
    render() {
        return (
            <div>
                <Navbar></Navbar>
                <Container>
                    <SubscribeContainer/>
                </Container>
            </div>
        );
    }
}
