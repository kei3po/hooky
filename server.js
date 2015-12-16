#!/usr/bin/env node

var amqp = require('amqplib/callback_api');
var hapi = require('hapi');

var exchangeURL = process.env.RABBIT_EXCHANGE_URL;
var queueName = process.env.RABBIT_QUEUE_NAME;
var serverPort = Number(process.env.SERVER_PORT);

var server = new hapi.Server();
server.connection({port: serverPort});

server.route({
    method: 'GET',
    path: '/ping/{message}',
    handler: function (request, reply) {
	amqp.connect(exchangeURL, function(err, conn) {
	  conn.createChannel(function(err, ch) {
	    ch.assertQueue(queueName, {durable: false});
	    ch.sendToQueue(queueName, new Buffer(request.params.message));
	    console.log(" [x] Sent '" + request.params.message + "'");
            reply(" [x] Sent '" + request.params.message + "'");
	  });
	});
    }
});

server.start(function () {
    console.log('server running at: ' + server.info.uri);
});

