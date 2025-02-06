/*------------------------------ Starter Code ------------------------------*/

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const Customer = require("./models/Customer.js");

const prompt = require("prompt-sync")();
const username = prompt("What is your name? ");
console.log(`Your name is ${username}`);

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
  await createCustomer();
};
