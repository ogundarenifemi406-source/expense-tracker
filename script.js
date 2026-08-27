document.addEventListener("DOMContentLoaded", function () {

  const expenseName = document.getElementById("expenseName");
  const expenseAmount = document.getElementById("expenseAmount");
  const expenseCategory = document.getElementById("expenseCategory");
  const addExpenseBtn = document.getElementById("addExpenseBtn");

  const expenseList = document.getElementById("expenseList");
  const totalAmount = document.getElementById("totalAmount");

  const categoryTotals = {
    Food: 0,
    Transport: 0,
    School: 0,
    Other: 0
  };

  function updateTotals() {

    const total =
      categoryTotals.Food +
      categoryTotals.Transport +
      categoryTotals.School +
      categoryTotals.Other;

    totalAmount.textContent = total.toLocaleString();

    document.getElementById("foodTotal").textContent =
      categoryTotals.Food.toLocaleString();

    document.getElementById("transportTotal").textContent =
      categoryTotals.Transport.toLocaleString();

    document.getElementById("schoolTotal").textContent =
      categoryTotals.School.toLocaleString();

    document.getElementById("otherTotal").textContent =
      categoryTotals.Other.toLocaleString();
  }

  function addExpense() {

    const name = expenseName.value.trim();
    const amount = Number(expenseAmount.value);
    const category = expenseCategory.value;

    if (name === "" || amount <= 0 || category === "") {
      return;
    }

    const expense = document.createElement("li");

    const expenseInfo = document.createElement("div");
    expenseInfo.className = "expense-info";

    const expenseNameText = document.createElement("div");
    expenseNameText.className = "expense-name";
    expenseNameText.textContent = name;

    const expenseCategoryText = document.createElement("div");
    expenseCategoryText.className = "expense-category";
    expenseCategoryText.textContent = category;

    const expenseAmountText = document.createElement("div");
    expenseAmountText.className = "expense-amount";
    expenseAmountText.textContent =
      "₦" + amount.toLocaleString();

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";

    expenseInfo.appendChild(expenseNameText);
    expenseInfo.appendChild(expenseCategoryText);

    expense.appendChild(expenseInfo);
    expense.appendChild(expenseAmountText);
    expense.appendChild(deleteBtn);

    expenseList.appendChild(expense);

    categoryTotals[category] += amount;

    updateTotals();

    deleteBtn.addEventListener("click", function () {

      expense.remove();

      categoryTotals[category] -= amount;

      updateTotals();
    });

    expenseName.value = "";
    expenseAmount.value = "";
    expenseCategory.value = "";
  }

  addExpenseBtn.addEventListener("click", addExpense);

  expenseName.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addExpense();
    }
  });

  expenseAmount.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addExpense();
    }
  });

  updateTotals();

});
