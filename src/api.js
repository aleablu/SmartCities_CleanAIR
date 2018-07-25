import openSocket from 'socket.io-client';

//richiesta a API REAL-TIME che risponde con indirizzo verso cui aprire il socket!
const socket = openSocket('http://localhost:8000');

function subscribeToAir(cb) {
  socket.on('message', (msg) => {cb(msg.msg)});
}

export { subscribeToAir }
