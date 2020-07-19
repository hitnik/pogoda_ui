import { bindActionCreators } from 'redux';
import {subscribe, unsubscribe } from './slices/isSubscribe';
import {setSubFormEmail, setSubFormTitle,
        clearSubFormEmailError, clearSubFormTitleError,
        setSubFormTitleErrorRequired, setSubFormEmailErrorFormat,
        setSubFormEmailErrorRequired, subscribeThunk
        }  from './slices/subForm';
import { push } from 'connected-react-router';

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
                setSubFormTitle : bindActionCreators(setSubFormTitle, dispatch),
                clearSubFormTitleError: bindActionCreators(clearSubFormTitleError, dispatch),
                clearSubFormEmailError: bindActionCreators(clearSubFormEmailError, dispatch),
                setSubFormTitleErrorRequired: bindActionCreators(setSubFormTitleErrorRequired, dispatch),
                setSubFormEmailErrorFormat: bindActionCreators(setSubFormEmailErrorFormat, dispatch),
                setSubFormEmailErrorRequired: bindActionCreators(setSubFormEmailErrorRequired, dispatch),
                push: bindActionCreators(push, dispatch)
            };
        };

        default: return undefined;
    }
}

export default mapDispatchToProps;