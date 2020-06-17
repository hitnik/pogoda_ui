import React, { PureComponent } from "react";

import '../styles/App.css';

import Navbar from "./main_navbar";
import {Container,} from 'semantic-ui-react';
import Main  from './main';

export default class App extends PureComponent {
    render() {
        return (
            <div>
                <Navbar/>
                <Main/>
            </div>
        );
    }
}
