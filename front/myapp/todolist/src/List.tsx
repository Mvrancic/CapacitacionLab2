import React, { useState, useEffect } from 'react';
import { Button, TextField, List as MUIList } from '@mui/material';
import Item from './Item';

interface Task {
    text: string;
    done: boolean;
}

const List: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<string>('');

    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, { text: newTask, done: false }]);
            setNewTask('');
        }
    };

    const toggleTask = (index: number) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, done: !task.done } : task
        );
        setTasks(updatedTasks);
    };

    const deleteTask = (index: number) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
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
                {tasks.map((task, index) => (
                    <Item
                        key={index}
                        text={task.text}
                        done={task.done}
                        onToggle={() => toggleTask(index)}
                        onDelete={() => deleteTask(index)}
                    />
                ))}
            </MUIList>
        </div>
    );
};

export default List;
