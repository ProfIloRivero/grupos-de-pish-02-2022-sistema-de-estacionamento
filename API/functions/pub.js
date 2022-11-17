const mqtt = require('mqtt');
const client = mqtt.connect("mqtt://test.mosquitto.org:1883");


client.on("connect", function () {
    console.log("conectado")
})

module.exports = { client };