const { query } = require('../helpers/db');
const { Router } = require('express');
const { hash, compare } = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sign } = jwt;
const userRouter = Router();

// Register
userRouter.post('/register', async (req, res, next) => {
  try {
    const hashedPassword = await hash(req.body.password, 10);
    const result = await query(
      'insert into account (email, password) values ($1, $2) returning *',
      [req.body.email, hashedPassword]
    );
    res.status(201).json({ id: result.rows[0].id, email: result.rows[0].email });
  } catch (error) {
    next(error);
  }
});

module.exports = { userRouter };
