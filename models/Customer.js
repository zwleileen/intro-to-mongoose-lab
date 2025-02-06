// models/Todo.js
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

// models/todo.js
const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
