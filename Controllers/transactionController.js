const express = require("express")
const transactions = express.Router()
const transactionsArray = require("../Models/transactions.js")

const validateBody = (req, res, next) => {
    const { name, date, type, amount } = req.body;
    if (!name || !date || !type || !amount) {
      res.status(400).send();
    }
    return next();
  };

transactions.use(validateBody)

transactions.get("/", (req, res))