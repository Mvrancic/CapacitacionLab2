const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

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
    console.log('GET /todo - Se solicitó la lista de tareas');
    res.json(todo_list);
});


//post, agrega UN item a la lista to do
app.post('/todo', (req, res) => {
    console.log('POST /todo - Se agregó una nueva tarea:', req.body);
    const todo = req.body;
    todo.id = id;
    id++;
    todo_list.push(todo);
    res.json(todo);
});


//post, pero agregando items directamente en forma de lista
app.post('/todos', (req, res) => {
    console.log('POST /todos - Se agregó una nueva tarea:', req.body);
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
    console.log('PUT /todo/:id - Se modificó la tarea:', req.body);
    const { id } = req.params;
    const { text, done } = req.body;

    const todo = todo_list.find(todo => todo.id === parseInt(id));

    if (!todo) {
        return res.status(404).json({ error: 'Item no encontrado.' });
    }

    if (text !== undefined) todo.text = text;
    if (done !== undefined) todo.done = done;

    res.json(todo);
});



//delete, elimina UN item de la lista to do
app.delete('/todo/:id', (req, res) => {
    console.log('DELETE /todo/: id - Se elimino una tarea');
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
