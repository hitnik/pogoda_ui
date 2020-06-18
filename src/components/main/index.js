import React, { PureComponent } from "react";
import { Switch, Route } from 'react-router-dom'
import  SubscribeContainer  from "../subscribe"
import  SegmentForms  from "../subscribe/forms/subscribe"
import CodeForm from '../subscribe/forms/code'

export default class Main extends PureComponent{
    render(){
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={SubscribeContainer}/>
                    <Route path='/subscribe' render={(props) => (
                                                 <SegmentForms {...props} isSubscribe={true}/>
                    )}/>
                    <Route path='/unsubscribe' render={(props) => (
                                                 <SegmentForms {...props} isSubscribe={false}/>
                    )}/>
                    <Route path='/code-confirm' component={CodeForm}/>
                </Switch>
            </main>
        )
    }
}