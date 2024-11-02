import express from "express"
import { query } from "../helpers/db.js";
import {emptyOrRows} from './emptyOrRow.js'

const todoRouter = express.Router();

// Get all tasks
todoRouter.get('/', async (req, res, next) => {
    try {
        const result = await query('SELECT * FROM task');
        const rows = result.rows || []; // Fallback to empty array if no rows
        res.status(200).json(emptyOrRows(result));
        // res.status(200).json(rows)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching tasks' });
        return next(error)
    }
});

// Add task
todoRouter.post('/add', async (req, res) => {
    try {
        const result = await query('INSERT INTO task (description) VALUES ($1) RETURNING *', [req.body.description]);
        res.status(201).json({ id: result.rows[0].id, description: result.rows[0].description, message: 'Task added' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding task' });
    }
});

// Edit task
todoRouter.put('/edit/:task_id', async (req, res) => {
    try {
        const { task_id } = req.params;
        const { task } = req.body;
        await query('UPDATE task SET description = $1 WHERE id = $2', [task, task_id]);
        res.status(200).json({ message: 'Task updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating task' });
    }
});

// Delete task
todoRouter.delete('/delete/:task_id', async (req, res) => {
    try {
        const { task_id } = req.params;
        await query('DELETE FROM task WHERE id = $1', [task_id]);
        res.status(200).json({ message: 'Task deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting task' });
    }
});

export { todoRouter };
