#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://mkjwkkig:HJ4kPsFFfQgN4Yj02jJcd1qm3mV8eWrq@moose.rmq.cloudamqp.com/mkjwkkig', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'hello';

    ch.assertQueue(q, {durable: false});
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function(msg) {
      console.log(" [x] Received %s", msg.content.toString());
    }, {noAck: true});
  });
});
