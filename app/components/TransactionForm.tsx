"use client";


// TransactionForm component: Handles adding new transactions via a form
interface TransactionFormProps {
    onAdd: () => void;
}

export default function TransactionForm({ onAdd }: TransactionFormProps) {
    const today = new Date().toISOString().split("T")[0];

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget;
        const date = (form.elements.namedItem("date") as HTMLInputElement).value;
        const desc = (form.elements.namedItem("desc") as HTMLInputElement).value.trim();
        const type = (form.elements.namedItem("type") as HTMLSelectElement).value;
        const amount = (form.elements.namedItem("amount") as HTMLInputElement).value;

        if (!date || !desc || !type || parseFloat(amount) <= 0) {
            alert("Fill in all fields with valid values.");
            return;
        }

        // Send new transaction to API
        fetch("/api/transactions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ date, desc, type, amount }),
        })
        .then(function(res) { return res.json(); })
        .then(function() {
            form.reset();
            (form.elements.namedItem("date") as HTMLInputElement).value = today;
            onAdd();
        })
        .catch(function(err) { console.error("Failed to add transaction:", err); });
    }

    return (
        <section>
            <h2>Add Transaction</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="date" name="date" defaultValue={today} />
                    </div>
                    <div className="form-group">
            <label htmlFor="desc">Description</label>
            <input type="text" id="desc" name="desc" placeholder="ex. Paycheck" />
          </div>
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <select id="type" name="type">
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount ($)</label>
            <input type="number" id="amount" name="amount" min="0.01" step="0.01" placeholder="0.00" />
          </div>
        </div>
        <button type="submit">Add Transaction</button>
      </form>
    </section>
  );
}
