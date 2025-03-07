const Notification = require("./model/Notification");
const { notificationSchema } = require("./validator");

const createNotification = async ({ ...notification }) => {
    try {
        let { eventType, taskId, groupId, topic, partition } = notification;
        //validate notification
        notificationSchema.parse({ eventType, taskId, groupId, topic, partition });

        const notificationData = new Notification({ eventType, taskId, groupId, topic, partition });
        await notificationData.save();
        return notificationData;
    } catch (error) {
        throw error;
    }
};

const getNotifications = async (page, limit) => {
    try {
        let totalNotifications = await Notification.countDocuments();
        if (totalNotifications === 0) return [];
        let page = 1;
        let limit = 10;
        if (page) page = parseInt(page);
        if (limit) limit = parseInt(limit);
        const notifications = await Notification.find({}).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);
        return notifications;
    } catch (error) {
        throw error;
    }
};

module.exports = { createNotification, getNotifications };