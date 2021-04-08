const productInput = document.querySelector("#products");
const ordersInput = document.querySelector("#orders");
const listItem1 = document.querySelector("#listItem1");
const listItem2 = document.querySelector("#listItem2");
const listItem3 = document.querySelector("#listItem3");
const listItem4 = document.querySelector("#listItem4");
const listItem5 = document.querySelector("#listItem5");
const totalContainer = document.querySelector(".summary__total");
const selectInput = document.querySelector("#package");
const package = document.querySelector(".select__input");
const ulSummary = document.querySelector(".calc__summary ul");
const accountCheck = document.querySelector("#accounting");
const terminalCheck = document.querySelector("#terminal");
const PRODUCT_PRICE = 0.5;
const ORDER_PRICE = 0.25;
let ACCOUNTING_PRICE = 35; //jest let bo zmienna jest modyfikowana w funkcji calcSum
let TERMINAL_PRICE = 5; //jest let bo zmienna jest modyfikowana w funkcji calcSum
let total = 0; //jest let bo zmienna jest modyfikowana w funkcji calcSum
const allInputs = document.querySelectorAll(".calc input");
const totalPrice = document.querySelector(".total__price");
//------------------------------------------------------------------------------
// edit z 4.4.2021 : dodany znak >= w warunku w productInput i orderInput
// edit z 4.4.2021: do funkcji calcSum dodany przypadek select
// edit z 4.4.2021: kolejność działań w funkcji jest ważny, nie zmieniać
// edit z 4.4.2021: dodane funkcje executeProductsinput i executeordersinput i przypisane do eventów keyup i change  w obu przypadkach
//FUNKCJE-----------------------------------------------------------------------
function generateTile(listItem, item, calc, sum, dataId) {
  listItem.classList.add("open");
  listItem.dataset.id = dataId;
  listItem.innerHTML = `
        <span class="item__type">${item}</span>
        <span class="item__calc">${calc}</span>
        <span class="item__price">${sum}</span>
        `;
}
function calcSum() {
  //------------------------inputs--------------------------------------------------
  const prodVal = Number(productInput.value) * PRODUCT_PRICE;
  const orderVal = Number(ordersInput.value) * ORDER_PRICE;
  //--------------------------checkbox----------------------------------------------
  accountCheck.checked ? (ACCOUNTING_PRICE = 35) : (ACCOUNTING_PRICE = 0);
  terminalCheck.checked ? (TERMINAL_PRICE = 5) : (TERMINAL_PRICE = 0);
  //--------------------------total-------------------------------------------------
  total = prodVal + orderVal + ACCOUNTING_PRICE + TERMINAL_PRICE;
  //------------------------select--------------------------------------------
  if (package.innerText === "Basic") {
    total += 0;
  } else if (package.innerText === "Professional") {
    total += 25;
  } else if (package.innerText === "Premium") {
    total += 60;
  }
  //-----------------------total----------------------------------------------
  totalPrice.innerText = "$" + total;
}
function executeProductsInput(e) {
  const messageInput = e.target.value === "" ? "" : `${e.target.value}*$${PRODUCT_PRICE}`;
  if (e.target.value.length >= 0) {
    generateTile(
      listItem1,
      "Products",
      message,
      `$${Number(e.target.value) * PRODUCT_PRICE}`,
      "products"
    );
    totalContainer.classList.add("open");
    calcSum();
  }
  if (e.target.value < 0) {
    generateTile(
      listItem1,
      "Products",
      `Value should be grater than`,
      "0",
      "products"
    );
    totalContainer.classList.remove("open");
  }
}
function executeOrdersInput(e) {
  const messageOrders = e.target.value === "" ? "" : `${e.target.value}*$${ORDER_PRICE}`;
  if (e.target.value.length >= 0) {
    generateTile(
      listItem2,
      "Orders",
      messageOrders,
      `$${Number(e.target.value) * ORDER_PRICE}`,
      "orders"
    );
    totalContainer.classList.add("open");
    calcSum();
  }
  if (e.target.value < 0) {
    generateTile(
      listItem2,
      "Orders",
      `Value should be grater than`,
      "0",
      "orders"
    );
    totalContainer.classList.remove("open");
  }
}
//PRODUCT INPUT--------------------------------------------------------------------------------------------------------
productInput.addEventListener("keyup", executeProductsInput);
productInput.addEventListener("change", executeProductsInput);
//ORDERS INPUT-------------------------------------------------------------------------------------------
ordersInput.addEventListener("keyup", executeOrdersInput);
ordersInput.addEventListener("change", executeOrdersInput);
// CHECKBOXY--------------------------------------------------------------------------------------------
accountCheck.addEventListener("click", function (e) {
  if (e.target.checked === true) {
    listItem4.classList.add("open");
    totalContainer.classList.add("open");
  } else {
    listItem4.classList.remove("open");
    totalContainer.classList.remove("open");
  }
  calcSum();
});
terminalCheck.addEventListener("click", function (e) {
  if (e.target.checked === true) {
    listItem5.classList.add("open");
    totalContainer.classList.add("open");
  } else {
    listItem5.classList.remove("open");
    totalContainer.classList.remove("open");
  }
  calcSum();
});
//SELECT--------------------------------------------------------------------------------------------
selectInput.addEventListener("click", function () {
  if (selectInput.classList.contains("open")) {
    selectInput.classList.remove("open");
  } else {
    selectInput.classList.add("open");
  }
});
const dropdown = document.querySelector(".select__dropdown");
const itemCalc = listItem3.querySelector(".item__calc");
const itemPrice = listItem3.querySelector(".item__price");
dropdown.addEventListener("click", function (e) {
  switch (e.target.innerText) {
    case "Basic":
      listItem3.classList.add("open");
      itemCalc.innerText = "Basic";
      itemPrice.innerText = `0$`;
      package.innerText = "Basic";
      calcSum();
      break;
    case "Professional":
      listItem3.classList.add("open");
      itemCalc.innerText = "Professional";
      itemPrice.innerText = `25$`;
      package.innerText = "Professional";
      calcSum();
      break;
    case "Premium":
      listItem3.classList.add("open");
      itemCalc.innerText = "Premium";
      itemPrice.innerText = `60$`;
      package.innerText = "Premium";
      calcSum();
      break;
  }
  totalContainer.classList.add("open");
});

//aplikacja kalkulatora za pomocą constructor function
// function Calculator(form, summary) {
//     this.prices = {
//       products: 0.5,
//       orders: 0.25,
//       package: {
//         basic: 0,
//         professional: 25,
//         premium: 60
//       },
//       accounting: 35,
//       terminal: 5
//     };

//     /**
//      * Inputs / Select / Checkbox
//      */
//     this.form = {
//       products: form.querySelector("#products"),
//       orders: form.querySelector("#orders"),
//       package: form.querySelector("#package"),
//       accounting: form.querySelector("#accounting"),
//       terminal: form.querySelector("#terminal")
//     };

//     /**
//      * Summary elements
//      */
//     this.summary = {
//       list: summary.querySelector("ul"),
//       items: summary.querySelector("ul").children,
//       total: {
//         container: summary.querySelector("#total-price"),
//         price: summary.querySelector(".total__price")
//       }
//     };


//     // Init
//     this.addEvents();
//   }

//   Calculator.prototype.addEvents = function () {
//     // Inputs
//     this.form.products.addEventListener("change", this.inputEvent.bind(this));
//     this.form.products.addEventListener("keyup", this.inputEvent.bind(this));
//     this.form.orders.addEventListener("change", this.inputEvent.bind(this));
//     this.form.orders.addEventListener("keyup", this.inputEvent.bind(this));

//     // Select
//     this.form.package.addEventListener("click", this.selectEvent.bind(this));

//     // Checkboxes
//     this.form.accounting.addEventListener("change", this.checkboxEvent.bind(this));
//     this.form.terminal.addEventListener("change", this.checkboxEvent.bind(this));
//   };

//   Calculator.prototype.updateTotal = function () {
//     const show = this.summary.list.querySelectorAll(".open").length > 0;

//     if (show) {
//       const productSum = this.form.products.value < 0 ? 0 : this.form.products.value * this.prices.products;
//       const ordersSum = this.form.orders.value < 0 ? 0 : this.form.orders.value * this.prices.orders;
//       const packagePrice = this.form.package.dataset.value.length === 0 ? 0 : this.prices.package[this.form.package.dataset.value];
//       const accounting = this.form.accounting.checked ? this.prices.accounting : 0;
//       const terminal = this.form.terminal.checked ? this.prices.terminal : 0;

//       this.summary.total.price.innerText = "$" + (productSum + ordersSum + packagePrice + accounting + terminal);

//       this.summary.total.container.classList.add("open");
//     } else {
//       this.summary.total.container.classList.remove("open");
//     }
//   };

//   Calculator.prototype.updateSummary = function (id, calc, total, callback) {
//     const summary = this.summary.list.querySelector("[data-id=" + id + "]");
//     const summaryCalc = summary.querySelector(".item__calc");
//     const summaryTotal = summary.querySelector(".item__price");

//     summary.classList.add("open");

//     if (summaryCalc !== null) {
//       summaryCalc.innerText = calc;
//     }

//     summaryTotal.innerText = "$" + total;

//     if (typeof callback === "function") {
//       callback(summary, summaryCalc, summaryTotal);
//     }
//   };

//   Calculator.prototype.inputEvent = function (e) {
//     const id = e.currentTarget.id;
//     const value = e.currentTarget.value;
//     const singlePrice = this.prices[id];
//     const totalPrice = value * singlePrice;

//     this.updateSummary(id, value + " * $" + singlePrice, totalPrice, function (item, calc, total) {
//       if (value < 0) {
//         calc.innerHTML = null;
//         total.innerText = "Value should be greater than 0";
//       }

//       if (value.length === 0) {
//         item.classList.remove("open");
//       }
//     });

//     this.updateTotal();
//   };


//   Calculator.prototype.selectEvent = function (e) {
//     this.form.package.classList.toggle("open");

//     const value = typeof e.target.dataset.value !== "undefined" ? e.target.dataset.value : "";
//     const text = typeof e.target.dataset.value !== "undefined" ? e.target.innerText : "Choose package";

//     if (value.length > 0) {
//       this.form.package.dataset.value = value;
//       this.form.package.querySelector(".select__input").innerText = text;

//       this.updateSummary("package", text, this.prices.package[value]);
//       this.updateTotal();
//     }
//   };

//   Calculator.prototype.checkboxEvent = function (e) {
//     const checkbox = e.currentTarget;
//     const id = checkbox.id;
//     const checked = e.currentTarget.checked;

//     this.updateSummary(id, undefined, this.prices[id], function (item) {
//       if (!checked) {
//         item.classList.remove("open");
//       }
//     });

//     this.updateTotal();
//   };


//   document.addEventListener("DOMContentLoaded", function () {
//     const form = document.querySelector(".calc__form");
//     const summary = document.querySelector(".calc__summary");

//     new Calculator(form, summary);
// });