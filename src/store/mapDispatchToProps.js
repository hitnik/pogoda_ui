import { bindActionCreators } from 'redux';
import {subscribe, unsubscribe } from './slices/isSubscribe';
import {setSubFormEmail, setSubFormTitle,
        clearSubFormEmailError, clearSubFormTitleError,
        setSubFormTitleErrorRequired, setSubFormEmailErrorFormat,
        setSubFormEmailErrorRequired, subscribeThunk
        }  from './slices/subForm';

        

function mapDispatchToProps(component) { 
    switch(component) {
        case "SubscribeContainer": return function(dispatch) {
            return {
                unsubscribe: bindActionCreators(unsubscribe, dispatch),
                subscribe : bindActionCreators(subscribe, dispatch)
            };
        };

        default: return undefined;
    }
}

export default mapDispatchToProps;