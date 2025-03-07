const kafka = require("./kafka-client");

const initAdmin = async () => {
    let topic = process.env.KAFKA_TOPIC || 'task-events';
    const admin = kafka.admin();
    await admin.connect();
    console.log("Connected to Kafka");

    const existingTopics = await admin.listTopics();

    // Check if 'test' topic exists
    if (!existingTopics.includes(topic)) {
        console.log(`Topic [${topic}] does not exist, creating it`);
        await admin.createTopics({
            topics: [
                {
                    topic: topic,
                    numPartitions: 1,
                    replicationFactor: 1,
                },
            ],
        });
        console.log(`Topic [${topic}] created`);
    } else {
        console.log(`Topic [${topic}] exists`);
    }
};

module.exports = { initAdmin };