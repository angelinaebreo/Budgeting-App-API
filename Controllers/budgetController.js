const express = require("express");
const budget = express.Router();
const budgetAmount = require("../Models/budget.js");
const bodyParser = require('body-parser');

const verify = (req, res, next) => {
  next();
};

const jsonParser = bodyParser.json();


budget.get("/", (req, res) => {
  res.status(200).json(budgetAmount);
  
 
});

budget.put("/", jsonParser, (req, res) => {
    console.log(budgetAmount)
    console.log(req.body)
    budgetAmount[0] = req.body
    res.json(budgetAmount)
    console.log(budgetAmount)
})




// Update a transaction
// transactions.put("/:id", validateBody, (req, res) => {
//   const { id } = req.params;
//   if (transactionsArray[id]) {
//     transactionsArray[id] = req.body;
//     res.json(transactionsArray[id]);
//   } else {
//     res.redirect("/404");
//   }
// });

module.exports = budget;
