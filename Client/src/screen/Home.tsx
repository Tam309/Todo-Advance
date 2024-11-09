import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UseUser from '../context/UseUser';
import BaseUrl from '../baseurl';


// const BaseUrl: string = process.env.REACT_APP_BASE_URL || 'http:// localhost:3001';

const Home = () => {
    const { user } = UseUser(); 
    const [tasks, setTasks] = useState<any[]>([]);
    const [input, setInput] = useState<string>("");

    useEffect(() => {
        if (!user.token) {
            return; // Wait until the token is available
        }
        
        const headers = { headers: { Authorization: user.token } };
        axios.get(BaseUrl, headers)
            .then((res) => {
                setTasks(res.data);
            })
            .catch((err) => {
                alert(err.response?.data?.error || err.message);
            });
    }, [user.token]);
    

    const addTask = (description: string) => {
        const headers = {headers : {Authorization:user.token}}
        if (description.trim()) {
            axios.post(`${BaseUrl}/add`, { description }, headers)
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
        const headers = {headers : {Authorization:user.token}}
        axios.delete(`${BaseUrl}/delete/${id}`, headers)
            .then(() => {
                setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));
            })
            .catch((err) => {
                alert(err.response?.data?.error || err.message);
            });
    };
    const logOut = () => {
        sessionStorage.removeItem("user");
        window.location.href = "/login";
    }

    return (
        <div>
            <div>
                <button onClick={logOut}>Logout</button>
            </div>
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
