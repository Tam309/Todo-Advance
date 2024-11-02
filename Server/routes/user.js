import express from "express"
import { query } from '../helpers/db.js';
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
const { sign } = jwt;

const userRouter = express.Router();

// Register
userRouter.post("/register", async (req, res, next) => {
  try {
    const hashedPassword = await hash(req.body.password, 10);
    const email = req.body.email;

    const result = await query(
      `INSERT INTO account (email, password) VALUES ($1, $2) RETURNING *`,
      [email, hashedPassword]
    );

    if (result.rows.length > 0) {
      res.status(201).json({ id: result.rows[0].id, email: result.rows[0].email });
    } else {
      res.status(500).json({ message: "Failed to register user" });
    }
  } catch (error) {
    console.error(error);
    next(error);  // Pass error to middleware
  }
});

// Login
userRouter.post("/login", async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const result = await query(`SELECT * FROM account WHERE email = $1`, [email]);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const isPasswordCorrect = await compare(password, user.password);

      if (isPasswordCorrect) {
        const token = sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_KEY, {
          expiresIn: "1h",
        });

        res.status(200).json({ 'id': user.id, "email": user.email, "token": token});
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    next(error);  // Pass error to middleware
  }
});

export { userRouter };
