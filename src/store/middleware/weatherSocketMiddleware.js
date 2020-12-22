function waitForSocket(socket, callback) {
    setTimeout(() => {
        socket.readyState === 1 ? callback() : waitForSocket(socket, callback);
    }, 10);
}

export default host => store => next => action => {
    console.log(host);
    switch (action.type) {
        case 'weatherSocket/onConnect':
          console.log('middleware connect')
  
          break;
    }
    return next(action);
    
}

