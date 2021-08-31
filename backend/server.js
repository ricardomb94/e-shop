import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

import colors from "colors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//That will allow us to accept JSON data in the body
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
 app.use(express.urlencoded({extended:true}))

 //Monted routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

//Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});



//When we pay we will hit this route and Fetch the Paypal client id
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

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
