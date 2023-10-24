/* sophisticated_code.js */

// This code is a simulation of a bank management system
// It includes functionality for creating customer accounts, managing transactions, and generating reports

// Customer class definition
class Customer {
  constructor(id, name, accountNumber, balance) {
    this.id = id;
    this.name = name;
    this.accountNumber = accountNumber;
    this.balance = balance;
  }

  // Method to deposit funds into customer's account
  deposit(amount) {
    this.balance += amount;
    console.log(`$${amount} successfully deposited into Account number ${this.accountNumber}`);
  }

  // Method to withdraw funds from customer's account
  withdraw(amount) {
    if (this.balance >= amount) {
      this.balance -= amount;
      console.log(`$${amount} successfully withdrawn from Account number ${this.accountNumber}`);
    } else {
      console.log("Insufficient funds");
    }
  }
}

// Bank class definition
class Bank {
  constructor() {
    this.customers = [];
  }

  // Method to create a new customer account
  createCustomer(name, initialDeposit) {
    const id = this.customers.length + 1;
    const accountNumber = this.generateAccountNumber();

    const customer = new Customer(id, name, accountNumber, initialDeposit);
    this.customers.push(customer);

    console.log(`Customer '${name}' successfully created with Account number ${accountNumber}`);
  }

  // Private method to generate a unique account number
  generateAccountNumber() {
    const randomNumber = Math.floor(Math.random() * 10000);
    const accountNumber = `ACCT-${randomNumber.toString().padStart(4, '0')}`;
    return accountNumber;
  }

  // Method to perform a transaction between two customers
  performTransaction(senderAccountNumber, receiverAccountNumber, amount) {
    const sender = this.getCustomerByAccountNumber(senderAccountNumber);
    const receiver = this.getCustomerByAccountNumber(receiverAccountNumber);

    if (!sender || !receiver) {
      console.log("Invalid account number(s)");
      return;
    }

    if (sender.balance >= amount) {
      sender.withdraw(amount);
      receiver.deposit(amount);
      console.log(`$${amount} transferred from Account ${senderAccountNumber} to Account ${receiverAccountNumber}`);
    } else {
      console.log("Insufficient funds");
    }
  }

  // Method to get customer details by account number
  getCustomerByAccountNumber(accountNumber) {
    return this.customers.find(customer => customer.accountNumber === accountNumber);
  }

  // Method to generate a report of all customer accounts
  generateReport() {
    console.log("============ REPORT ============");
    this.customers.forEach(customer => {
      console.log(`\nID: ${customer.id}\nName: ${customer.name}\nAccount Number: ${customer.accountNumber}\nBalance: $${customer.balance}`);
    });
    console.log("================================");
  }
}

// Creating a bank object
const bank = new Bank();

// Creating customer accounts
bank.createCustomer("John Doe", 5000);
bank.createCustomer("Alice Smith", 0);
bank.createCustomer("Bob Johnson", 10000);

// Performing transactions
bank.performTransaction("ACCT-0001", "ACCT-0002", 2000);
bank.performTransaction("ACCT-0003", "ACCT-0002", 500);

// Generating a report
bank.generateReport();  // Prints account details of all customers in the bank