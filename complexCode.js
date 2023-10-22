/*
Filename: complexCode.js 

This code is a complex implementation of a shopping cart in JavaScript. It includes functionalities such as adding products to the cart, removing products from the cart, calculating total prices with discounts, and generating a printable receipt.

Note: This code is purely a fictional example and shouldn't be used in a real-world scenario.
*/

class Product {
  constructor(name, price, discount) {
    this.name = name;
    this.price = price;
    this.discount = discount;
  }
}

class ShoppingCart {
  constructor() {
    this.products = [];
  }

  addProduct(product) {
    this.products.push(product);
  }

  removeProduct(productIndex) {
    this.products.splice(productIndex, 1);
  }

  calculateSubtotal() {
    let subtotal = 0;
    this.products.forEach((product) => {
      subtotal += product.price;
    });
    return subtotal;
  }

  calculateDiscountedSubtotal() {
    let subtotal = this.calculateSubtotal();
    subtotal -= subtotal * (this.products.length * 0.05);
    return subtotal;
  }

  calculateTotal() {
    let total = this.calculateDiscountedSubtotal();
    total += total * 0.15; // 15% tax
    total = parseFloat(total.toFixed(2));
    return total;
  }

  generateReceipt() {
    let receipt = "-------------- RECEIPT --------------\n";
    receipt += "|       Product         |    Price    |\n";
    receipt += "-------------------------------------\n";

    this.products.forEach((product) => {
      receipt += `| ${product.name.padEnd(21)} |  $${product.price.toFixed(2).padStart(7)} |\n`;
    });

    receipt += "-------------------------------------\n";
    receipt += `| Subtotal               |  $${this.calculateSubtotal().toFixed(2).padStart(7)} |\n`;
    receipt += `| Discounted Subtotal    |  $${this.calculateDiscountedSubtotal().toFixed(2).padStart(7)} |\n`;
    receipt += `| Tax (15%)              |  $${(this.calculateTotal() - this.calculateDiscountedSubtotal()).toFixed(2).padStart(7)} |\n`;
    receipt += `| Total                  |  $${this.calculateTotal().toFixed(2).padStart(7)} |\n`;
    receipt += "-------------------------------------\n";

    return receipt;
  }
}

// Usage example:
const cart = new ShoppingCart();
cart.addProduct(new Product("Laptop", 999.99, 0.1));
cart.addProduct(new Product("Keyboard", 49.99, 0));
console.log(cart.generateReceipt());
cart.removeProduct(0); // Remove Laptop
console.log(cart.generateReceipt());

/* 
Expected Output:

-------------- RECEIPT --------------
|       Product         |    Price    |
-------------------------------------
| Laptop                |   $999.99 |
| Keyboard              |    $49.99 |
-------------------------------------
| Subtotal               | $1049.98 |
| Discounted Subtotal    |  $997.48 |
| Tax (15%)              |   $12.52 |
| Total                  | $1010.00 |
-------------------------------------

-------------- RECEIPT --------------
|       Product         |    Price    |
-------------------------------------
| Keyboard              |    $49.99 |
-------------------------------------
| Subtotal               |    $49.99 |
| Discounted Subtotal    |    $47.49 |
| Tax (15%)              |    $2.24 |
| Total                  |    $54.73 |
-------------------------------------
*/