import React, { PureComponent } from "react";
import { Switch, Route} from 'react-router-dom';
import  SegmentForms from "../subscribe/forms/subscribe/";
import CodeForm from '../subscribe/forms/code';
import WeatherComponent from '../weather'
import ForumsComponent from '../forums';


export default class Main extends PureComponent{
    render(){
        return (
                <div>
                    <Switch>
                        <Route exact path='/' component={ForumsComponent} />
                        <Route exact path='/weather' component={WeatherComponent}/>
                        <Route path='/weather/subscribe' component={SegmentForms}/>
                        <Route path='/weather/code-confirm' component={CodeForm}/>
                        
                    </Switch>
                </div>
        )
    }
}