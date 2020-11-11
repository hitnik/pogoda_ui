import React, { PureComponent } from "react";
import { Switch, Route} from 'react-router-dom';
import  SegmentForms from "../subscribe/forms/subscribe/";
import CodeForm from '../subscribe/forms/code';
import HomePage from '../home/'
import ForumsComponent from '../forums';


export default class Main extends PureComponent{
    render(){
        return (
                <div>
                    <Switch>
                        <Route exact path='/' component={HomePage}/>
                        <Route path='/subscribe' component={SegmentForms}/>
                        <Route path='/code-confirm' component={CodeForm}/>
                        <Route path='/forums' component={ForumsComponent} />
                    </Switch>
                </div>
        )
    }
}