import express from "express"
import { query } from "../helpers/db.js";
import { getTasks, addTask, deleteTaskById } from "../controllers/TaskController.js";

const todoRouter = express.Router();

todoRouter.get('/', getTasks);

todoRouter.post('/add', addTask);

todoRouter.delete('/delete/:task_id', deleteTaskById);

export { todoRouter };
