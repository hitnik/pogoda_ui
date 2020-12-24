import { onConnect, onError} from '../slices/weatherSocketSlice';

function waitForSocket(socket, callback) {
    setTimeout(() => {
        socket.readyState === 1 ? callback() : waitForSocket(socket, callback);
    }, 10);
}



export const weatherSocketMiddleware  =  (host) => (store) => next => action => {
    let socket = null;

    const onEr = store => () => {
        store.dispatch(onError("Error"));
      };

    const onMessage = store => (event) => {
        const payload = JSON.parse(event.data);
        console.log('receiving server message');  
        console.log(payload)
    }

    switch (action.type) {
        case 'weatherSocket/wsConnect':
            console.log('middleware connected')
            if (socket !== null) {
                socket.close();
                }
            // connect to the remote host
            socket = new WebSocket(host);    
            
            socket.onerror = onEr(store)
            socket.onopen = () => {
                store.dispatch(onConnect());
                socket.send(JSON.stringify({
                    'payload': 'ping'
                }));
                console.log('send')
            }

            socket.onmessage = () => onMessage(store);
            
            
            break;

        default:
            return next(action);
    }            
    return next(action);  
}

