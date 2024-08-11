const express = require('express');
const app = express();
const port = 3000;

//hello world con express.
app.get('/', (req, res) => {
    res.send('Hello World!');
});


// capacitación back:
app.use(express.json());

let todo_list = [];
let id = 1;

//get, devuelve json con items en la lista to do
app.get('/todo', (req, res) => {
    res.json(todo_list);
});


//post, agrega UN item a la lista to do
app.post('/todo', (req, res) => {
    const todo = req.body;
    todo.id = id;
    id++;
    todo_list.push(todo);
    res.json(todo);
});


//post, pero agregando items directamente en forma de lista
app.post('/todos', (req, res) => {
    const todos = req.body;

    if (!Array.isArray(todos)) {
        return res.status(400).json({ error: 'Request body must be an array of items.' });
    }

    todos.forEach(todo => {
        todo.id = id;
        id++;
        todo_list.push(todo);
    });

    res.json(todo_list);
});


//put, modifica un item de la lista to do
app.put('/todo/:id', (req, res) => {
    const { id } = req.params;
    const { text } = req.body;

    const todo = todo_list.find(todo => todo.id === parseInt(id));

    if (!todo) {
        return res.status(404).json({ error: 'Item no encontrado.' });
    }

    if (!text) {
        return res.status(400).json({ error: 'El campo "text" es requerido.' });
    }

    todo.text = text;
    res.json(todo_list);
});


//delete, elimina UN item de la lista to do
app.delete('/todo/:id', (req, res) => {
    const { id } = req.params;
    const todo = todo_list.find(todo => todo.id === parseInt(id));

    if (!todo) {
        return res.status(404).json({ error: 'Item no encontrado.' });
    }

    todo_list = todo_list.filter(todo => todo.id !== parseInt(id));
    res.json(todo_list);
});


//delete, elimina TODOS los items de la lista to do
app.delete('/todos/all', (req, res) => {
    todo_list = [];
    id = 1;
    res.json(todo_list);
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
