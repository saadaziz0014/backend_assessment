const kafka = require("../todolist-service/kafka-client");
const { createNotification } = require("../mongo-service/service");
const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID || "notification-group" });

async function consumeNotifications() {
    await consumer.connect();
    await consumer.subscribe({ topic: process.env.KAFKA_TOPIC || "task-events" });
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const eventType = message.key;
            const task = JSON.parse(message.value);
            //convert eventType to string to avoid error of Buffer
            let stringEventType = eventType.toString();
            //create notification
            createNotification({ eventType: stringEventType, taskId: task.id, groupId: process.env.KAFKA_GROUP_ID, topic, partition });
        },
    });
}

module.exports = { consumeNotifications };