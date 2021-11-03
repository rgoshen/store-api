require("dotenv").config();
// async errors

const express = require("express");
const app = express();

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

// products routes

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;
const start = () => {
  try {
    // connectDB
    app.listen(
      PORT,
      console.log(`Server it listening on http://localhost:${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
