const amqp = require('amqplib/callback_api.js');
const CONN_URL = process.env.AMQP_URI;

// create a connection
var ch = null;
amqp.connect(
    CONN_URL,
    (err, conn) => {
        console.log("Creating RabbitMQ Publisher channel");
        conn.createChannel(
            (err, channel) => {
                ch = channel;
                console.log("RabbitMQ Publisher channel Created");
            });
    });

//method to send messages to the queue
module.exports.publishToQueue = async (data) => {
    console.log("Publishing data to Queue");

    ch.assertQueue(data.queueName);
    ch.sendToQueue(
        data.queueName,
        Buffer.from(JSON.stringify(data.payload))
    );
    console.log("data Published to Queue");
}

//process listener to close the RabbitMQ connection when we kill the process
process.on('exit', (code) => {
    ch.close();
    console.log(`Closing rabbitmq channel`);
});