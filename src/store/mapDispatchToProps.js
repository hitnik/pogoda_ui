import { bindActionCreators } from 'redux';
import {setSubFormEmail, setSubFormTitle}  from './actionCreators';

import {subscribe, unsubscribe } from './slices/isSubscribe';


function mapDispatchToProps(component) { 
    switch(component) {
        case "SubscribeContainer": return function(dispatch) {
            return {
                unsubscribe: bindActionCreators(unsubscribe, dispatch),
                subscribe : bindActionCreators(subscribe, dispatch)
            };
        };
       
        case "SegmentForms": return function(dispatch) {
            return {
                setSubFormEmail: bindActionCreators(setSubFormEmail, dispatch),
                setSubFormTitle : bindActionCreators(setSubFormTitle, dispatch)
            };
        };

        default: return undefined;
    }
}

export default mapDispatchToProps;