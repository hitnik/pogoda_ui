import {onConnect} from '../slices/weatherSocketSlice';

function waitForSocket(socket, callback) {
    setTimeout(() => {
        socket.readyState === 1 ? callback() : waitForSocket(socket, callback);
    }, 10);
}

export default (host) =>{
    let socket = null;

    const con = store => () => {
        store.dispatch(onConnect());
      };

    return ({dispatch}) => next => action => {
        
    
        switch (action.type) {
            case 'weatherSocket/wsConnect':
                console.log('middleware connected')
                if (socket !== null) {
                    socket.close();
                    }
                
                dispatch({type:'weatherSocket/onConnect' })   
                // connect to the remote host
                socket = new WebSocket(host);
                
                
                break;
        }
        return next(action);
} 
    
}

