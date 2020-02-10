import socketio from 'socket.io-client';

const socket = socketio('http://192.168.1.108:3333', {
    autoConnect: false,
});

function subscribeToNewDev(subscribeFunction) {
    socket.on('new-dev', subscribeFunction);
}

function connect(latitude, longitude, techs){
    socket.io.opts.query = {        //envia os parametros ao backend
        latitude, longitude, techs
    }
    socket.connect();

    /*socket.on('message', text => {
        console.log(text)
    })*/
}

function disconnect() {
    if(socket.connect){
        socket.disconnect();
    }    
}

export {
    connect,
    disconnect,
    subscribeToNewDev,
};