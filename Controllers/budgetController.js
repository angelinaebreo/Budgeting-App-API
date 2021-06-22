const express = require("express");
const budget = express.Router();
const budgetAmount = require("../Models/budget.js");
const bodyParser = require("body-parser");

const verify = (req, res, next) => {
  next();
};

const jsonParser = bodyParser.json();

budget.get("/", (req, res) => {
  res.status(200).json(budgetAmount);
});

budget.put("/", jsonParser, (req, res) => {
  budgetAmount[0] = req.body;
  res.json(budgetAmount);
});

module.exports = budget;
