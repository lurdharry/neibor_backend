const express = require("express");
const fileUpload = require("express-fileupload");
const lessMiddleware = require('less-middleware');

const hbs  = require( 'hbs');
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(lessMiddleware(path.join(__dirname, 'public')));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('view options', { layout: 'layout/main' });

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

hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(path.join(__dirname, 'views/public')));//this is for the css and js files in the template folder


if (process.env.ENV === "DEVELOPMENT") {
  app.use(errorHandlers.developmentErrors);
} else {
  app.use(errorHandlers.productionErrors);
}

module.exports = app;
// crypto.randomBytes(60).toString('base64')
