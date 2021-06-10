const fetch = require('node-fetch');
const amqp = require('amqplib/callback_api.js');
const CONN_URL = process.env.AMQP_URI;

amqp.connect(CONN_URL, function (err, conn) {
    conn.createChannel(function (err, ch) {
        if (err != null) bail(err);
        ch.assertQueue('testing_1');
        ch.consume(
            'testing_1',
            function (msg) {
                if (msg !== null) {
                    console.log('.....');
                    console.log((msg.content.toString()));
                    data = JSON.parse(msg.content.toString())[0];
                    console.log(data.url);
                    console.log(data.payload);
                    fetch(data.url, {
                        method: data.method,
                        body: data.body,
                        headers: { ...data.headers, 'Content-Type': 'application/json' }
                    })
                        .then(res => {
                            console.log(res);
                            res.json();
                        })
                        .then(data => {
                            console.log("Message Consumed:", data);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    console.log("Message Consumed:", data);
                    ch.ack(msg);
                }
            },
            { noAck: false }
        );
    });
});