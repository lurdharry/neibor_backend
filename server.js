require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.on("error", err => {
  console.log("Mongoose Connection ERROR: " + err.message);
});

mongoose.connection.once("open", () => {
  console.log("MongoDB Connected!");
});

const app = require("./index");

const server = app.listen(7000, "0.0.0.0", () => {
  console.log("server listening on port 7000");
});
