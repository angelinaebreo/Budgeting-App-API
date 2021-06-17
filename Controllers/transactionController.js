const express = require("express");
const transactions = express.Router();
const transactionsArray = require("../Models/transactions.js");

const verify = (req, res, next) => {
  next();
};

const validateBody = (req, res, next) => {
  const { name, date, type, amount } = req.body;
  if (!name || !date || !type || !amount) {
    res.status(400).send();
  }
  return next();
};

//transactions.use(validateBody);

// Get a list (index) of all transactions
transactions.get("/", (req, res) => {
  console.log(transactionsArray);
  res.status(200).json(transactionsArray);
});

// Get an individual view of one transaction
transactions.get("/:id", (req, res) => {
  const { id } = req.params;
  if (transactionsArray[id]) {
    res.status(200).json(transactionsArray[id]);
  } else {
    res.redirect("/404");
  }
});

// Create a new transaction
transactions.post("/", validateBody, (req, res) => {
  transactionsArray.push(req.body);
  res.json(transactionsArray[transactionsArray.length - 1]);
  res.redirect("/");
});

// Delete a transaction
transactions.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (transactionsArray[id]) {
    const deleted = transactionsArray.splice(id, 1);
    res.json(deleted[0]);
  } else {
    res.redirect("/404");
  }
});

// Update a transaction
transactions.put("/:id", validateBody, (req, res) => {
  const { id } = req.params;
  if (transactionsArray[id]) {
    transactionsArray[id] = req.body;
    res.json(transactionsArray[id]);
  } else {
    res.redirect("/404");
  }
});

module.exports = transactions;
