const kafka = require("./kafka-client");
const producer = kafka.producer();

const publishEvent = async (eventType, task) => {
    await producer.connect();
    console.log("Connected to Kafka");
    await producer.send({
        topic: process.env.KAFKA_TOPIC || "task-events",
        messages: [{ key: eventType, value: JSON.stringify(task) }],
    });
    console.log("Event published");
    await producer.disconnect();
};

module.exports = { publishEvent };