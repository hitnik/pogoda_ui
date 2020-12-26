import { onConnect, onError, receiveMessage} from '../slices/weatherSocketSlice';

function waitForSocket(socket, callback) {
    setTimeout(() => {
        socket.readyState === 1 ? callback() : waitForSocket(socket, callback);
    }, 10);
}



export const weatherSocketMiddleware  =  (host) =>  {
    let socket = null;

    const onEr = store => () => {
        store.dispatch(onError("Error"));
      };

    const onMsg = store => (event) => {
        const payload = JSON.parse(event.data);

        console.log('receiving server message');
        store.dispatch(receiveMessage(payload))

    }

    return (store) => next => action => {
        switch (action.type) {
            case 'weatherSocket/wsConnect':
                console.log('middleware connected')
                if (socket !== null) {
                    socket.close();
                    }
                // connect to the remote host
                socket = new WebSocket(host);    
    
    
                socket.onerror = onEr(store);
                socket.onopen = () => store.dispatch(onConnect());
                socket.onmessage = onMsg(store);
                
                
                break;
    
            case 'weatherSocket/wsSend':
                console.log('middleware send');
                socket.send(JSON.stringify({
                    'payload': action.payload
                }));    
                break;
        }       
    
    
        return next(action);  
    }
    
}

