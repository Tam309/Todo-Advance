import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BaseUrl from './baseurl';

// const BaseUrl: string = process.env.REACT_APP_BASE_URL || 'http:// localhost:3001';

const Home = () => {
    const [tasks, setTasks] = useState<any[]>([]);
    const [input, setInput] = useState<string>("");

    useEffect(() => {
        axios.get(BaseUrl)
            .then((res) => {
                setTasks(res.data);
            })
            .catch((err) => {
                alert(err.response?.data?.error || err.message);
            });
    }, []);

    const addTask = (description: string) => {
        if (description.trim()) {
            axios.post(`${BaseUrl}/add`, { description })
                .then((res) => {
                    setTasks((prevTasks) => [...prevTasks, res.data]);
                })
                .catch((err) => {
                    alert(err.response?.data?.error || err.message);
                });
            setInput("");
        } else {
            alert("Task description cannot be empty");
        }
    };

    const deleteTask = (id: number) => {
        axios.delete(`${BaseUrl}/delete/${id}`)
            .then(() => {
                setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));
            })
            .catch((err) => {
                alert(err.response?.data?.error || err.message);
            });
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Add Task"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={() => addTask(input)}>Add Task</button>
            </div>
            <div>
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            {task.description}
                            <button onClick={() => deleteTask(task.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;
