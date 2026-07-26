"use client";

// TransactionList component: Displays transaction table and summary cards
interface Transaction {
    id: number;
    date: string;
    desc: string;
    type: string;
    amount: number;
}

interface TransactionListProps {
    transactions: Transaction[];
    onDelete: () => void;
}

function formatMoney(amount: number) {
    return "$" + parseFloat(String(amount)).toFixed(2);
}

export default function TransactionList({ transactions, onDelete }: TransactionListProps) {
    function handleDelete(id: number) {
        fetch("api/transactions/" + id, { method: "DELETE" })
        .then(function() { onDelete(); })
        .catch(function(err) { console.error("Failed to delete transaction:", err); })
    }

    // Calculate summary totals
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(function(t) {
        if (t.type === "Income") {
            totalIncome += t.amount;
        } else {
            totalExpense += t.amount;
        }
    });

    const netBalance = totalIncome - totalExpense;

    return (
         <>
      {/* Summary Cards */}
      <section>
        <h2>Summary</h2>
        <div className="summary-cards">
          <div className="card">
            <p>Total Income</p>
            <span className="Income">{formatMoney(totalIncome)}</span>
          </div>
          <div className="card">
            <p>Total Expenses</p>
            <span className="Expense">{formatMoney(totalExpense)}</span>
          </div>
          <div className="card">
            <p>Net Balance</p>
            <span className="Balance">{formatMoney(netBalance)}</span>
          </div>
        </div>
      </section>
 
      {/* Transaction Table */}
      <section>
        <h2>Transaction History</h2>
        {transactions.length === 0 ? (
          <p id="empty-msg">No transactions yet. Add one above.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(function(t) {
                return (
                  <tr key={t.id}>
                    <td>{t.date}</td>
                    <td>{t.desc}</td>
                    <td>{t.type}</td>
                    <td style={{ color: t.type === "Income" ? "#2e7d32" : "#c62828", fontWeight: "bold" }}>
                      {t.type === "Income" ? "+" : "-"}{formatMoney(t.amount)}
                    </td>
                    <td>
                      <button className="delete-btn" onClick={function() { handleDelete(t.id); }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
}
