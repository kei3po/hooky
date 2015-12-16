#!/bin/bash

docker run -e "RABBIT_EXCHANGE_URL=amqp://mkjwkkig:HJ4kPsFFfQgN4Yj02jJcd1qm3mV8eWrq@moose.rmq.cloudamqp.com/mkjwkkig" -e "RABBIT_QUEUE_NAME=hello" -i -t $1 /bin/bash
