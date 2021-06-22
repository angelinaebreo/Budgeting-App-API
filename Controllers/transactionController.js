const express = require("express");
const transactions = express.Router();
const transactionsArray = require("../Models/transactions.js");

const validateBody = (req, res, next) => {
  const { name, date, type, amount, from } = req.body;
  if (!name || !date || !amount || !from) {
    res.status(400).send();
  }
  return next();
};

// Get a list (index) of all transactions
transactions.get("/", (req, res) => {
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
  console.log(req.body.amount);
  // transactionsArray.push(req.body);
  if (req.body.amount > 0) {
    req.body.type = "credit";
    console.log(req.body);
    transactionsArray.push(req.body);
  } else {
    req.body.type = "debit";
    transactionsArray.push(req.body);
  }
  res.json(transactionsArray[transactionsArray.length - 1]);
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
  if (transactionsArray[id] && req.body.amount > 0) {
    req.body.type = "credit";
    transactionsArray[id] = req.body;
    res.json(transactionsArray[id]);
  } else if (transactionsArray[id] && req.body.amount < 0) {
    req.body.type = "debit";
    transactionsArray[id] = req.body;
    res.json(transactionsArray[id]);
  } else {
    res.redirect("/404");
  }
});

module.exports = transactions;
