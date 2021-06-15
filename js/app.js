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
let ACCOUNTING_PRICE = 35;
let TERMINAL_PRICE = 5;
let total = 0;
const allInputs = document.querySelectorAll(".calc input");
const totalPrice = document.querySelector(".total__price");

//FUNCTIONS
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
  //inputs
  const prodVal = Number(productInput.value) * PRODUCT_PRICE;
  const orderVal = Number(ordersInput.value) * ORDER_PRICE;
  //checkbox
  accountCheck.checked ? (ACCOUNTING_PRICE = 35) : (ACCOUNTING_PRICE = 0);
  terminalCheck.checked ? (TERMINAL_PRICE = 5) : (TERMINAL_PRICE = 0);
  //total sum
  total = prodVal + orderVal + ACCOUNTING_PRICE + TERMINAL_PRICE;
  //------------------------select--------------------------------------------
  if (productInput.value.length > 0) {
    if (package.innerText === "Basic") {
      total += 0;
    } else if (package.innerText === "Professional") {
      total += 25;
    } else if (package.innerText === "Premium") {
      total += 60;
    }
  }
  if (productInput.value.length <= 0) {
    listItem3.classList.remove("open");
  }
  //total summary
  totalPrice.innerText = "$" + total;
}

function executeProductsInput(e) {
  const message =
    e.target.value === "" ? "" : `${e.target.value}*$${PRODUCT_PRICE}`;
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
  const message =
    e.target.value === "" ? "" : `${e.target.value}*$${ORDER_PRICE}`;
  if (e.target.value.length >= 0) {
    generateTile(
      listItem2,
      "Orders",
      message,
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
//Event listeners
//product input

productInput.addEventListener("keyup", executeProductsInput);
productInput.addEventListener("change", executeProductsInput);

//orders input

ordersInput.addEventListener("keyup", executeOrdersInput);
ordersInput.addEventListener("change", executeOrdersInput);

//checkboxes

accountCheck.addEventListener("click", function (e) {
  if (e.target.checked === true) {
    listItem4.classList.add("open");
    totalContainer.classList.add("open");
  } else {
    listItem4.classList.remove("open");
  }
  calcSum();
});
terminalCheck.addEventListener("click", function (e) {
  if (e.target.checked === true) {
    listItem5.classList.add("open");
    totalContainer.classList.add("open");
  } else {
    listItem5.classList.remove("open");
  }
  calcSum();
});

//select

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