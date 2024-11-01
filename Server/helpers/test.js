const fs = require('fs')
const path = require('path')
import { query } from './db'

const _dirname = import.meta.dirname

const initializeTestDb = () => {
    const sql = fs.readFileSync(path.resolve(_dirname, '../todo.sql'), 'utf-8')
    query(sql)
}

const insertUser = (email,password) => {
    hash(password,10,(error, hashedPassword) => {
        query('insert into account (email,password) values ($1, $2)', [req.body.email, hashedPassword] )
    })
}

module.exports = { initializeTestDb, insertUser }