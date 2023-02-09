require("dotenv").config();
require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const restaurantRoutes = require("./routes/restaurantRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const userRoutes = require("./routes/userRoutes");
const { errorMiddleware } = require("./middleware/errorMiddleware");
const { notFoundMiddleware } = require("./middleware/notFoundMiddleware");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Processing ${req.method} request to ${req.path}`);
  // when above code executed; go on to next middleware/routing
  next();
});

app.use("/helloWorld", (request, response) => {
  return response.send("Hello World!");
});

app.use("/api/v1/restaurants" /* /... = see Router => */, restaurantRoutes);
app.use("/api/v1/reviews" /* /... = see Router => */, reviewRoutes);
app.use("/api/v1/users" /* /... = see Router => */, userRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 4000;

async function run() {
  app.listen(5001, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}
run();
