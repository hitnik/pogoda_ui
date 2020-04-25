import React, { Component } from "react";

import '../styles/App.css';

import Navbar from "./main_navbar";
import SubscribeContainer from "./subscribe";
import {Container,} from 'semantic-ui-react'

export default class App extends Component {
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
