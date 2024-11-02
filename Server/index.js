import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import { todoRouter } from "./routes/todo.js"
import { userRouter } from "./routes/user.js"

const environment = process.env.NODE_ENV;
dotenv.config();

// dotenv.config({ path: environment === 'test' ? '.env.test' : '.env' });
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ message: err.message });
});

app.use('/', todoRouter);
app.use('/user', userRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
