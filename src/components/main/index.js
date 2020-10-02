import React, { PureComponent } from "react";
import { Switch, Route} from 'react-router-dom';
import  SubscribeContainer  from "../subscribe/";
import  SegmentForms from "../subscribe/forms/subscribe/";
import CodeForm from '../subscribe/forms/code';
import HomePage from '../home/'


export default class Main extends PureComponent{
    render(){
        return (
                <div>
                    <Switch>
                        <Route exact path='/' component={SubscribeContainer}/>
                        <Route path = '/home' component={HomePage}/>
                        <Route path='/subscribe' component={SegmentForms}/>
                        <Route path='/code-confirm' component={CodeForm}/>
                    </Switch>
                </div>
        )
    }
}