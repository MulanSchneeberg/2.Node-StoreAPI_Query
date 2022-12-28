require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const port = process.env.port || 3000;
const connectDB = require("./db/connect");
const route = require("./route/route");
const not_found = require("./middleware/not-found");

app.use(express.json());
app.use("/api/v1/products", route); // mistake: forgot about the / before api ends up gettting 404
app.use(not_found);

const start = async () => {
  try {
    // connecting on DB
    await connectDB(process.env.MONGO_URL);
    console.log("connect with DB is successful");
    // Start server
    app.listen(port, () => {
      console.log(`The app is listening on port ${port}`);
    });
  } catch (error) {
    console.log(err);
  }
};

start();
