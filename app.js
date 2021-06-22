const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const transactionController = require("./Controllers/transactionController.js");
const budgetController = require("./Controllers/budgetController.js");
const totalController = require("./Controllers/totalController.js");

//___________________
//Middleware
//___________________

app.use(express.json()); // returns middleware that only parses JSON

app.use(bodyParser.json());

// this allows any app/site from anywhere access your API. This is a great way to start to get things up and running. Later, add restrictions, as needed.
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the budgeting app");
});

app.use("/transactions", transactionController);
app.use("/budget", budgetController);

app.use("/total", totalController);

app.get("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

module.exports = app;
