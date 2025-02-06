const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const Customer = require("./models/Customer.js");
const prompt = require("prompt-sync")();

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");
  await runQueries();

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
  process.exit();
};

const runQueries = async () => {
  let isRunning = true;

  while (isRunning) {
    const start = prompt(
      `
Welcome to the CRM

What would you like to do?
  1. Create a customer
  2. View all customers
  3. Update a customer
  4. Delete a customer
  5. quit

Number of action to run:
      `
    );
    if (start === "1") {
      await createCustomer();
    } else if (start === "2") {
      await viewCustomers();
    } else if (start === "3") {
      await updateCustomer();
    } else if (start === "4") {
      await deleteCustomer();
    } else if (start === "5") {
      console.log("Exiting application...");
      isRunning = false;
    } else {
      console.log("Invalid option. Please choose a valid number.");
    }

    const createCustomer = async () => {
      const customerName = prompt(`What is the name of the customer?`);
      const customerAge = prompt(`What is the age of the customer?`);
      const customerData = {
        name: customerName,
        age: customerAge,
      };
      const customer = await Customer.create(customerData);
      console.log("New customer:", customer);
    };

    const viewCustomers = async () => {
      const customers = await Customer.find();
      if (customers.length === 0) {
        console.log("No customer found");
        return;
      }
      console.log("List of customers:");
      customers.forEach((customer) => {
        console.log(`
                id: ${customer._id},
                Name: ${customer.name},
                Age: ${customer.age}
                `);
      });
    };

    const updateCustomer = async () => {
      await viewCustomers(); //view latest list of customers
      const updateId = prompt(
        `Copy and paste the id of the customer you would like to update here:`
      );
      const customer = await Customer.findById(updateId);

      const newName = prompt("What is the customer's updated name?");
      const newAge = prompt("What is the customer's updated age?");
      customer.name = newName;
      customer.age = newAge;
      await customer.save();
      console.log("Customer updated successfully:", customer);
    };

    const deleteCustomer = async () => {
      await viewCustomers();
      const deleteId = prompt(
        `Copy and paste the id of the customer you would like to delete here:`
      );
      const customer = await Customer.findByIdAndDelete(deleteId);
      console.log("Customer deleted successfully.");
    };
  }
};

connect();
