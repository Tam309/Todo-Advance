import { query } from "../helpers/db.js";

const getAllTask = async () => {
    return await query("Select * from task")
}

const insertTask = async (description) => {
    return await query("INSERT INTO task (description) VALUES ($1) RETURNING *", [description]);
}

const deleteTask = async (id) => [
    await query("DELETE FROM task WHERE id = $1", [id])
]

export { getAllTask, insertTask, deleteTask }