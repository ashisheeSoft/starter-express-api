const mqtt = require('mqtt');
// Connect to MQTT broker


function sendMessageTodevice(deviceId,message) {
    const client = mqtt.connect('mqtt://broker.hivemq.com'); 
    client.on('connect', function () {
        console.log('Connected to MQTT broker');
        client.publish(deviceId,message);
        client.end();
    });
}

module.exports={
    sendMessageTodevice
}