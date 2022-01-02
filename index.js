const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Setup Cross origin
app.use(require("cors")());

//Bring in the routes
app.use(fileUpload());
app.use("/user", require("./routes/user"));
app.use("/requisition", require("./routes/requisition"));

//Setup Error Handlers

const errorHandlers = require("./handlers/errorHandler");
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongooseErrors);

if (process.env.ENV === "DEVELOPMENT") {
  app.use(errorHandlers.developmentErrors);
} else {
  app.use(errorHandlers.productionErrors);
}

module.exports = app;
// crypto.randomBytes(60).toString('base64')
