require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { todoRouter } = require('./routes/todo.js');
const { userRouter } = require('./routes/user.js');

const environment = process.env.NODE_ENV; // Fixed typo
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
