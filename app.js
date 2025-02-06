/*------------------------------ Starter Code ------------------------------*/

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const Customer = require("./models/Customer.js");

const prompt = require("prompt-sync")();
const action = prompt(
  `Welcome to the CRM
What would you like to do?
1. Create a customer
2. View all customers
3. Update a customer
4. Delete a customer
5. quit
Number of action to run:
    `
);
console.log(`You would like to run ${action}`);

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");
  await runQueries();

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
  process.exit();
};

connect();

/*----------------------------- Query Functions -----------------------------*/
const createCustomer = async () => {
  const customerData = {
    name: "Harry",
    age: 12,
  };
  const customer = await Customer.create(customerData);
  console.log("New customer:", customer);
};

/*------------------------------- Run Queries -------------------------------*/

const runQueries = async () => {
  console.log("Queries running.");
  //   await createCustomer();
};
