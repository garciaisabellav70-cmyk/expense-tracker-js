const expenseNameInput = document.querySelector("#expense-name");
const expenseAmountInput = document.querySelector("#expense-amount");

const addButton = document.querySelector("#add-btn");
const expenseList = document.querySelector("#expense-list");
const totalElement = document.querySelector("#total");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function saveExpenses() {
    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );
}

function calculateTotal() {
    const total = expenses.reduce((sum, expense) => {
        return sum + expense.amount;
    }, 0);

    totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

function renderExpenses(list = expenses) {
    expenseList.innerHTML = "";

    list.forEach((expense, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
      <span>${expense.name} - $${expense.amount.toFixed(2)}</span>

      <button
        class="delete-btn"
        onclick="deleteExpense(${index})"
      >
        Delete
      </button>
    `;

        expenseList.appendChild(li);
    });

    calculateTotal();
}

function addExpense() {
    const name = expenseNameInput.value.trim();
    const amount = Number(expenseAmountInput.value);

    if (name === "" || amount <= 0) {
        return;
    }

    expenses.push({
        name,
        amount
    });

    saveExpenses();
    renderExpenses();

    expenseNameInput.value = "";
    expenseAmountInput.value = "";
}

function deleteExpense(index) {
    expenses.splice(index, 1);

    saveExpenses();
    renderExpenses();
}

addButton.addEventListener("click", addExpense);

renderExpenses();