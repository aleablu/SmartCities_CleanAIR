const io = require('socket.io')();
const port = 8000;

const mqtt = require('mqtt');

io.on('connection', (client)=>{
  //client connesso
  console.log('[Socket.io] Client connesso');
  //############ START GESTIONE MQTT #############
  //connessione al broker, clean=false la rende persistente, il broker associa il clientId alle mie iscrizioni
  //così da non doverle rifare
  const mqttClient = mqtt.connect('mqtt://193.206.52.98:1883',{
      clean: false,
      clientId: 'CleanAir-UsrID'
  });

  //controllo se ho già fatto i passi preliminari di iscrizione, in tal caso evito di rifarli per risparmiare traffico

  mqttClient.on('connect', (connack) => {
    if (connack.sessionPresent) {
      console.log('[mqtt] Già iscritto, non devo rifarlo');
    } else {
      console.log('[mqtt] Prima sessione! mi iscrivo al topic');
      //mqtt QoS=2 -> arrivo dei messaggi garantito e in ordine corretto
      mqttClient.subscribe('aria/#', { qos: 2 });
    }
  });


  mqttClient.on('message', (topic, message)=>{
    console.log('[mqtt] messaggio ricevuto -> '+topic+'/'+message);
    //ricevuto il messaggio lo propago al client tramite socket.io
    client.emit('message',{msg: JSON.parse(message)});
  });
  //############ END GESTIONE MQTT ##############


});

io.listen(port);
console.log('socket.io listening on ', port);
