import { query } from "../helpers/db.js";

const insertUser = async (email, hashedPassword) => {
    return await query("INSERT INTO account (email, password) VALUES ($1, $2) RETURNING *", [email, hashedPassword]);
}

const getUser = async (email) => {
    return await query("SELECT * FROM account WHERE email = $1", [email]);
}

export { insertUser, getUser }   