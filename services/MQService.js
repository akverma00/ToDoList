const amqp = require('amqplib/callback_api.js');
const CONN_URL = 'amqps://uipsjwuh:xRmNe5DLg5GTxEwiGUEj2jbp44erI4fs@hornet.rmq.cloudamqp.com/uipsjwuh';

// create a connection
var ch = null;
amqp.connect(CONN_URL, function (err, conn) {
    console.log("Creating RabbitMQ channel");
    conn.createChannel(function (err, channel) {
        ch = channel;
        console.log("RabbitMQ channel Created");
    });
});

//method to send messages to the queue
module.exports.publishToQueue = async (data) => {
    console.log("Publishing data to Queue");
    ch.sendToQueue(data.queueName, Buffer.from(JSON.stringify(data.payload)));
    console.log("data Published to Queue");
}

//process listener to close the RabbitMQ connection when we kill the process
process.on('exit', (code) => {
    ch.close();
    console.log(`Closing rabbitmq channel`);
});