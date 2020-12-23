import { onConnect, onError} from '../slices/weatherSocketSlice';

function waitForSocket(socket, callback) {
    setTimeout(() => {
        socket.readyState === 1 ? callback() : waitForSocket(socket, callback);
    }, 10);
}

const connect = (host, attempts) => {
    let socket = new WebSocket(host)
    setTimeout(() => {
        attempts--; 
        console.log(attempts)
        attempts > 0 && socket.readyState !== 1 && connect(host, attempts)
        return socket
    }, 100);   
}

export const weatherSocketMiddleware  =  (host) => (store) => next => action => {
    let socket = null;

    const onEr = store => (event) => {
        store.dispatch(onError("Error"));
      };

    switch (action.type) {
        case 'weatherSocket/wsConnect':
            console.log('middleware connected')
            if (socket !== null) {
                socket.close();
                }
            // connect to the remote host
            socket = new WebSocket(host);    
            if (socket){
                socket.onerror = onEr(store)
                socket.onopen = () => store.dispatch(onConnect());
            } else store.dispatch(onError('Websocket connection error'))
            
            
            break;
    }            
    return next(action);  
}

