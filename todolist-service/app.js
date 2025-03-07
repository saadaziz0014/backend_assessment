const express = require('express');
require('dotenv').config();

const { publishEvent } = require('./producer');
const { initAdmin } = require('./admin');
const { connectToMongo } = require('../mongo-service/mongo-connection');
const { consumeNotifications } = require('../notification-service/consumer');
const { getNotifications } = require("../mongo-service/service");

const app = express();
app.use(express.json());

let tasks = [];

app.post('/tasks', async (req, res) => {
    const task = { id: tasks.length + 1, ...req.body };
    tasks.push(task);
    res.status(201).json(task);
    await publishEvent('task_created', task);
});

app.put('/tasks/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) return res.status(404).json({ message: 'Task not found' });

    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
    res.json(tasks[taskIndex]);
    await publishEvent('task_updated', tasks[taskIndex]);
});

app.delete('/tasks/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) return res.status(404).json({ message: 'Task not found' });

    const deletedTask = tasks.splice(taskIndex, 1)[0];
    res.json(deletedTask);
    await publishEvent('task_deleted', deletedTask);
});

app.get("/notifications", async (req, res) => {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;
    const notifications = await getNotifications(page, limit);
    res.json(notifications);
});


const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await connectToMongo();
    await initAdmin();
    await consumeNotifications();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();