const { z } = require("zod");

const notificationSchema = z.object({
    eventType: z.string(),
    taskId: z.number(),
    groupId: z.string(),
    topic: z.string(),
    partition: z.number(),
});

module.exports = { notificationSchema };