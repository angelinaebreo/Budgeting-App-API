const express = require("express");
const total = express.Router();
const transactionsArray = require("../Models/transactions.js");

total.get("/", (req, res) => {
  const totalSum = transactionsArray.reduce(
    (a, b) => a + parseFloat(b.amount),
    0
  );
  res.status(200).json(totalSum);
});

module.exports = total;
