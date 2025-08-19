let transactions = [];

const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const typeInput = document.getElementById("type");
const addBtn = document.getElementById("addBtn");
const transactionList = document.getElementById("transactionList");

// Summary
const balanceDiv = document.querySelector(".summary div:nth-child(1)");
const incomeDiv  = document.querySelector(".summary div:nth-child(2)");
const expenseDiv = document.querySelector(".summary div:nth-child(3)");

// Filters
const filterType = document.getElementById("filterType");
const searchCategory = document.getElementById("searchCategory");

// Bonus: theme & currency
const toggleThemeBtn = document.getElementById("toggleTheme");
const convertCurrencyBtn = document.getElementById("convertCurrency");

let isDarkMode = false;
let showUSD = false;
let usdRate = null; // INR -> USD

// Chart
let chart;


function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function loadTransactions() {
  const data = localStorage.getItem("transactions");
  transactions = data ? JSON.parse(data) : [];
}

function saveTheme() {
  localStorage.setItem("darkMode", isDarkMode ? "true" : "false");
}

function loadTheme() {
  const savedTheme = localStorage.getItem("darkMode");
  if (savedTheme === "true") {
    document.body.classList.add("dark-mode");
    isDarkMode = true;
  }
}

function formatMoneyINR(n) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(n);
}
function formatMoneyUSD(n) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}
function displayAmount(number) {
  if (showUSD && usdRate) return formatMoneyUSD(number * usdRate);
  return `₹${formatMoneyINR(number)}`;
}
async function fetchUSDRate() {
  try {
    const res = await fetch("https://api.exchangerate-api.com/v4/latest/INR");
    const data = await res.json();
    usdRate = data?.rates?.USD;
    if (!usdRate) throw new Error("USD rate missing");
  } catch (e) {
    alert("Failed to fetch USD rate. Please try again later.");
  }
}

// -------------------------------
// Rendering
// -------------------------------
function renderTransactions() {
  transactionList.innerHTML = "";

  // Apply filter + search to list (summary/chart use ALL data)
  const filtered = transactions.filter(tx => {
    if (filterType.value !== "all" && tx.type !== filterType.value) return false;
    const q = searchCategory.value.trim().toLowerCase();
    if (q && !tx.category.toLowerCase().includes(q)) return false;
    return true;
  });

  if (filtered.length === 0) {
    transactionList.innerHTML = "<li>No matching transactions...</li>";
  } else {
    filtered.forEach(tx => {
      const li = document.createElement("li");

      const left = document.createElement("div");
      left.className = "tx-left";

      const badge = document.createElement("span");
      badge.className = `badge ${tx.type}`;
      badge.textContent = tx.type === "income" ? "INCOME" : "EXPENSE";

      const info = document.createElement("span");
      info.textContent = `${tx.date} • ${tx.category}`;

      const amount = document.createElement("span");
      amount.className = "amount";
      amount.textContent = displayAmount(tx.amount);

      left.appendChild(badge);
      left.appendChild(info);
      left.appendChild(amount);

      const right = document.createElement("div");
      right.className = "tx-actions";

      const delBtn = document.createElement("button");
      delBtn.className = "delete";
      delBtn.textContent = "❌";
      delBtn.title = "Delete";
      delBtn.addEventListener("click", () => deleteTransaction(tx.id));

      right.appendChild(delBtn);

      li.appendChild(left);
      li.appendChild(right);
      transactionList.appendChild(li);
    });
  }

  updateSummary();  // based on ALL transactions
  updateChart();    // based on ALL transactions
}

function updateSummary() {
  const { income, expense } = getTotals(transactions);
  const balance = income - expense;

  if (showUSD && usdRate) {
    balanceDiv.innerHTML = `<strong>Balance:</strong> ${formatMoneyUSD(balance * usdRate)}`;
    incomeDiv.innerHTML  = `<strong>Total Income:</strong> ${formatMoneyUSD(income * usdRate)}`;
    expenseDiv.innerHTML = `<strong>Total Expense:</strong> ${formatMoneyUSD(expense * usdRate)}`;
  } else {
    balanceDiv.innerHTML = `<strong>Balance:</strong> ₹${formatMoneyINR(balance)}`;
    incomeDiv.innerHTML  = `<strong>Total Income:</strong> ₹${formatMoneyINR(income)}`;
    expenseDiv.innerHTML = `<strong>Total Expense:</strong> ₹${formatMoneyINR(expense)}`;
  }
}

function getTotals(list) {
  return list.reduce(
    (acc, tx) => {
      if (tx.type === "income") acc.income += tx.amount;
      else acc.expense += tx.amount;
      return acc;
    },
    { income: 0, expense: 0 }
  );
}

function updateChart() {
  const { income, expense } = getTotals(transactions);
  const ctx = document.getElementById("expenseChart").getContext("2d");

  // Optionally convert chart values when USD toggle is on
  const values = showUSD && usdRate
    ? [income * usdRate, expense * usdRate]
    : [income, expense];

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Income", "Expense"],
      datasets: [
        {
          data: values,
          // No explicit colors to keep it simple & accessible theme-wise
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const v = ctx.raw || 0;
              return showUSD && usdRate
                ? ` ${formatMoneyUSD(v)}`
                : ` ₹${formatMoneyINR(v)}`;
            }
          }
        }
      }
    }
  });
}

// -------------------------------
// Mutations
// -------------------------------
function addTransaction() {
  const amount = parseFloat(amountInput.value);
  const category = categoryInput.value.trim();
  const date = dateInput.value;
  const type = typeInput.value;

  if (!amount || amount <= 0 || !category || !date) {
    alert("Please fill all fields with valid values.");
    return;
  }

  const transaction = {
    id: Date.now(),
    type,
    amount,
    category,
    date
  };

  transactions.push(transaction);
  saveTransactions();
  resetForm();
  renderTransactions();
}

function deleteTransaction(id) {
  transactions = transactions.filter(tx => tx.id !== id);
  saveTransactions();
  renderTransactions();
}

function resetForm() {
  amountInput.value = "";
  categoryInput.value = "";
  dateInput.value = "";
  typeInput.value = "income";
}


addBtn.addEventListener("click", addTransaction);
filterType.addEventListener("change", renderTransactions);
searchCategory.addEventListener("input", renderTransactions);

// Bonus: Theme toggle
toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  isDarkMode = document.body.classList.contains("dark-mode");
  saveTheme();
});

// Bonus: Currency toggle (INR <-> USD)
convertCurrencyBtn.addEventListener("click", async () => {
  // If first time, fetch rate
  if (!usdRate) await fetchUSDRate();
  if (!usdRate) return; // fetch failed
  showUSD = !showUSD;
  convertCurrencyBtn.textContent = showUSD
    ? "₹ Show Balance in INR"
    : "Show Balance in USD";
  renderTransactions();
});

// Prefill date with today for convenience
(function setToday() {
  const today = new Date().toISOString().slice(0, 10);
  dateInput.value = today;
})();

// Load state & (optional) demo seed if first run
loadTheme();
loadTransactions();

if (transactions.length === 0) {
  // Seed data for first-time UX (can remove if you want empty start)
  transactions = [
    { id: 1, type: "income",  amount: 5000, category: "Salary",    date: "2025-08-01" },
    { id: 2, type: "income",  amount: 2000, category: "Freelance", date: "2025-08-05" },
    { id: 3, type: "expense", amount: 1500, category: "Food",      date: "2025-08-10" },
    { id: 4, type: "expense", amount: 800,  category: "Transport", date: "2025-08-12" },
    { id: 5, type: "income",  amount: 1200, category: "Gift",      date: "2025-08-15" }
  ];
  saveTransactions();
}

renderTransactions();
