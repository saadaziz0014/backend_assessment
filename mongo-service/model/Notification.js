const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    eventType: { type: String, required: { message: 'Event type is required', value: true } },
    taskId: { type: Number, required: { message: 'Task ID is required', value: true } },
    groupId: { type: String, required: { message: 'Group ID is required', value: true } },
    topic: { type: String, required: { message: 'Topic is required', value: true } },
    partition: { type: Number, required: { message: 'Partition is required', value: true } },
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);