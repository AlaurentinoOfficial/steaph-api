import { KafkaClient, Producer } from 'kafka-node'
import { green, magenta } from 'colors';

var client;
var producer;

exports.KafkaInit = (host) => {
    client = new KafkaClient({kafkaHost: host})
    producer = new Producer(client)
    console.log(green('➜  ') + magenta('Kafka:') + " Has been configured!")
}

exports.KafkaProducerSend = (payloads, cb) => {
    producer.send(payloads, (err, data) => {
        cb(err, data)
    })
}