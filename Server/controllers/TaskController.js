import { getAllTask, insertTask, deleteTask } from "../models/Task.js";
import { emptyOrRows } from "../helpers/emptyOrRow.js";

const getTasks = async (req, res, next) => {
    try {
        const result = await getAllTask();
        res.status(200).json(emptyOrRows(result));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching tasks" });
        next(error); // Keep 'next' call here for error middleware handling
    }
};

const addTask = async (req, res, next) => {
    try {
        // Validation for description
        if (!req.body.description || req.body.description.length === 0) {
            return res.status(400).json({ message: "Description is required" });
        }

        // Insert task
        const result = await insertTask(req.body.description);
        res.status(201).json({
            id: result.rows[0].id,
            description: result.rows[0].description,
            message: "Task added",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding Task" });
        next(error); // Keep 'next' call here for error middleware handling
    }
};

const deleteTaskById = async (req, res, next) => {
    try {
        await deleteTask(req.params.task_id);
        res.status(200).json({ message: "Task deleted" });
    } catch (error){
        console.error(error);
        res.status(500).json({ message: "Error deleting task" });
        next(error);
    }
}

export { getTasks, addTask, deleteTaskById };
