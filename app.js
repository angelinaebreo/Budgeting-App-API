const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
const transactionController = require("./Controllers/transactionController.js");
// const cors = cors();

//___________________
//Middleware
//___________________

app.use(express.json()); // returns middleware that only parses JSON
app.use(bodyParser.json());
// this allows any app/site from anywhere access your API. This is a great way to start to get things up and running. Later, add restrictions, as needed.
app.use(cors());
// const corsOptions ={
//   origin:'http://localhost:3000', 
//   credentials:true,            //access-control-allow-credentials:true
//   optionSuccessStatus:200
// }
// app.use(cors(corsOptions));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the budgeting app");
});

app.use("/transactions", transactionController);

app.get("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

module.exports = app;
