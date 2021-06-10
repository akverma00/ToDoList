const amqp = require('amqplib/callback_api.js');
const CONN_URL = 'amqps://uipsjwuh:xRmNe5DLg5GTxEwiGUEj2jbp44erI4fs@hornet.rmq.cloudamqp.com/uipsjwuh';
amqp.connect(CONN_URL, function (err, conn) {
    conn.createChannel(function (err, ch) {
        ch.consume('testing_1', function (msg) {
            console.log('.....');
            setTimeout(function () {
                console.log("Message Consumed:", JSON.parse(msg.content.toString()));
            }, 8000);
        }, { noAck: true }
        );
    });
});