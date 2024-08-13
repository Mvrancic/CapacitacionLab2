import React, { useState, useEffect } from 'react';
import { Button, TextField, List as MUIList } from '@mui/material';
import Item from './Item';

interface Task {
    id: number;
    text: string;
    done: boolean;
}

const List: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<string>('');

    // Fetch tasks from the backend when the component mounts
    useEffect(() => {
        fetch('http://localhost:3000/todo')
            .then((res) => res.json())
            .then((data) => setTasks(data))
            .catch((error) => console.error('Error fetching tasks:', error));
    }, []);

    // Add a new task by sending a POST request to the backend
    const addTask = () => {
        if (newTask.trim()) {
            const newTaskObj = { text: newTask, done: false };

            fetch('http://localhost:3000/todo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTaskObj),
            })
                .then((res) => res.json())
                .then((task) => setTasks([...tasks, task]))
                .catch((error) => console.error('Error adding task:', error));

            setNewTask('');
        }
    };

    // Toggle task status by sending a PUT request to the backend
    const toggleTask = (id: number) => {
        const taskToToggle = tasks.find((task) => task.id === id);
        if (taskToToggle) {
            const updatedTask = { ...taskToToggle, done: !taskToToggle.done };

            fetch(`http://localhost:3000/todo/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask),
            })
                .then(() => {
                    const updatedTasks = tasks.map((task) =>
                        task.id === id ? updatedTask : task
                    );
                    setTasks(updatedTasks);
                })
                .catch((error) => console.error('Error toggling task:', error));
        }
    };

    const editTask = (id: number, newText: string) => {
        const taskToEdit = tasks.find((task) => task.id === id);
        if (taskToEdit) {
            const updatedTask = { ...taskToEdit, text: newText };

            fetch(`http://localhost:3000/todo/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask),
            })
                .then(() => {
                    const updatedTasks = tasks.map((task) =>
                        task.id === id ? updatedTask : task
                    );
                    setTasks(updatedTasks);
                })
                .catch((error) => console.error('Error editing task:', error));
        }
    };


    // Delete a task by sending a DELETE request to the backend
    const deleteTask = (id: number) => {
        fetch(`http://localhost:3000/todo/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                const updatedTasks = tasks.filter((task) => task.id !== id);
                setTasks(updatedTasks);
            })
            .catch((error) => console.error('Error deleting task:', error));
    };

    return (
        <div>
            <TextField
                label="New Task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                variant="outlined"
                fullWidth
            />
            <Button onClick={addTask} variant="contained" color="primary" fullWidth>
                Add Task
            </Button>
            <MUIList>
                {tasks.map((task) => (
                    <Item
                        key={task.id}
                        text={task.text}
                        done={task.done}
                        onToggle={() => toggleTask(task.id)}
                        onDelete={() => deleteTask(task.id)}
                        onEdit={(newText) => editTask(task.id, newText)} // Nuevo método para editar
                    />

                ))}
            </MUIList>
        </div>
    );
};

export default List;
