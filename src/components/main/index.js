import React, { PureComponent } from "react";
import { Switch, Route, Routes } from 'react-router-dom'
import  SubscribeContainerWrapper  from "../subscribe/SubscribeContainerWrapper"
import  SegmentFormsWrapper  from "../subscribe/forms/subscribe/SegmentFormsWrapper"
import CodeForm from '../subscribe/forms/code'





export default class Main extends PureComponent{
    render(){
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={SubscribeContainerWrapper}/>
                        <Route path='/subscribe' component={SegmentFormsWrapper}/>
                        <Route path='/code-confirm' component={CodeForm}/>
                  
                </Switch>
            </main>
        )
    }
}