const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const port = 3000;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Hello world
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Get all tasks
app.get('/todo', async (req, res) => {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
});

// Create a new task
app.post('/todo', async (req, res) => {
    const { text } = req.body;
    const newTask = await prisma.task.create({
        data: { text },
    });
    res.json(newTask);
});

// Update a task
app.put('/todo/:id', async (req, res) => {
    const { id } = req.params;
    const { text, done } = req.body;

    const updatedTask = await prisma.task.update({
        where: { id: parseInt(id) },
        data: { text, done },
    });

    res.json(updatedTask);
});

// Delete a task
app.delete('/todo/:id', async (req, res) => {
    const { id } = req.params;

    await prisma.task.delete({
        where: { id: parseInt(id) },
    });

    res.status(204).end();
});

// Delete all tasks
app.delete('/todos/all', async (req, res) => {
    await prisma.task.deleteMany();
    res.status(204).end();
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
