const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();
const amqp = require('amqplib/callback_api.js');
const CONN_URL = process.env.AMQP_URI;

amqp.connect(CONN_URL, (err, conn) => {
    conn.createChannel((err, ch) => {
        if (err != null) bail(err);
        ch.assertQueue('testing_1');
        ch.consume(
            'testing_1',
            (msg) => {
                if (msg !== null) {
                    console.log('.....');
                    data = JSON.parse(msg.content.toString());
                    //console.log(data.url);
                    //console.log(data.method);
                    fetch(data.url, {
                        method: data.method,
                        headers: { "Content-Type": "application/json" }
                    })
                        .then(res => {
                            //console.log(res);
                            res.json();
                        })
                        .then(data => {
                            console.log("Message Consumed:", data);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    console.log("Message Consumed1:", data);
                    ch.ack(msg);
                }
            }
        );
    });
});