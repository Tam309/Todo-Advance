import express from "express"
import { query } from "../helpers/db.js";
import { getTasks, addTask, deleteTaskById } from "../controllers/TaskController.js";

const todoRouter = express.Router();

// Get all tasks
// todoRouter.get('/', async (req, res, next) => {
//     try {
//         const result = await query('SELECT * FROM task');
//         const rows = result.rows || []; // Fallback to empty array if no rows
//         res.status(200).json(emptyOrRows(result));
//         // res.status(200).json(rows)
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error fetching tasks' });
//         return next(error)
//     }
// });
todoRouter.get('/', getTasks);

// Add task
// todoRouter.post('/add', async (req, res) => {
//     try {
//         const result = await query('INSERT INTO task (description) VALUES ($1) RETURNING *', [req.body.description]);
//         res.status(201).json({ id: result.rows[0].id, description: result.rows[0].description, message: 'Task added' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error adding task' });
//     }
// });
todoRouter.post('/add', addTask);


// Delete task
// todoRouter.delete('/delete/:task_id', async (req, res) => {
//     try {
//         const { task_id } = req.params;
//         await query('DELETE FROM task WHERE id = $1', [task_id]);
//         res.status(200).json({ message: 'Task deleted' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error deleting task' });
//     }
// });
todoRouter.delete('/delete/:task_id', deleteTaskById);

export { todoRouter };
