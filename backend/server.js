import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import morgan from 'morgan';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';


dotenv.config();

const app = express();

//That will allow us to accept JSON data in the body
app.use(express.json())

app.use(morgan('dev'));

connectDB();

//Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// //Middleware: definition
// app.use((req, res, next) => {
//   console.log(req.originalUrl);
//   next();
// });
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.bgRed
      .underline
  )
);
