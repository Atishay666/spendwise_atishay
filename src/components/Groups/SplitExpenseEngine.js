import React, { useState } from 'react';

export default function SplitExpenseEngine() {
  const [memberInput, setMemberInput] = useState('');
  const [members, setMembers] = useState([]);
  
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [payer, setPayer] = useState('');
  const [expenses, setExpenses] = useState([]);
  
  const [transactions, setTransactions] = useState([]);

  // 1. Add a member to the pool
  const handleAddMember = (e) => {
    e.preventDefault();
    if (!memberInput.trim() || members.includes(memberInput.trim())) return;
    setMembers([...members, memberInput.trim()]);
    setMemberInput('');
  };

  // 2. Add an expense and track who paid
  const handleAddExpense = (e) => {
    e.preventDefault();
    const amount = parseFloat(expenseAmount);
    if (!expenseName.trim() || isNaN(amount) || !payer) return;

    const newExpense = {
      id: Date.now(),
      name: expenseName.trim(),
      amount: amount,
      payer: payer,
    };

    setExpenses([...expenses, newExpense]);
    setExpenseName('');
    setExpenseAmount('');
  };

  // 3. Core Greedy Optimization Algorithm Engine
  const computeSettleBalances = () => {
    // Step A: Calculate net balances for everyone
    // Positive balance = Person is owed money; Negative balance = Person owes money
    let netBalances = {};
    members.forEach(m => netBalances[m] = 0);

    expenses.forEach(exp => {
      const splitShare = exp.amount / members.length;
      members.forEach(m => {
        if (m === exp.payer) {
          netBalances[m] += (exp.amount - splitShare);
        } else {
          netBalances[m] -= splitShare;
        }
      });
    });

    // Step B: Separate into Debtors (owes) and Creditors (is owed) arrays
    let debtors = [];
    let creditors = [];

    Object.keys(netBalances).forEach(person => {
      // Rounding to 2 decimal places to prevent float inequalities
      let bal = Math.round(netBalances[person] * 100) / 100;
      if (bal < 0) {
        debtors.push({ name: person, amount: -bal });
      } else if (bal > 0) {
        creditors.push({ name: person, amount: bal });
      }
    });

    // Step C: Greedy Matching Loop
    let optimizedTransactions = [];
    let i = 0, j = 0;

    while (i < debtors.length && j < creditors.length) {
      let debtor = debtors[i];
      let creditor = creditors[j];

      // Settle the minimum amount possible between the pair
      let settledAmount = Math.min(debtor.amount, creditor.amount);
      
      optimizedTransactions.push({
        from: debtor.name,
        to: creditor.name,
        amount: Math.round(settledAmount * 100) / 100
      });

      debtor.amount -= settledAmount;
      creditor.amount -= settledAmount;

      if (debtor.amount === 0) i++;
      if (creditor.amount === 0) j++;
    }

    setTransactions(optimizedTransactions);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-gray-800">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <h2 className="text-3xl font-black tracking-tight text-gray-900 mb-2">Group Expense Splitter</h2>
        <p className="text-gray-500 mb-8">Minimize group debts instantly using a greedy transaction minimization algorithm.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Left Column: Manage Members */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <h3 className="text-lg font-bold mb-4">1. Add Group Members</h3>
            <form onSubmit={handleAddMember} className="flex gap-2 mb-4">
              <input 
                type="text" 
                value={memberInput}
                onChange={(e) => setMemberInput(e.target.value)}
                placeholder="Name (e.g. Rahul)" 
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">Add</button>
            </form>
            <div className="flex flex-wrap gap-2">
              {members.map((m, index) => (
                <span key={index} className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm font-medium">{m}</span>
              ))}
            </div>
          </div>

          {/* Right Column: Log Expenses */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <h3 className="text-lg font-bold mb-4">2. Log an Expense</h3>
            <form onSubmit={handleAddExpense} className="space-y-3">
              <input 
                type="text" 
                value={expenseName}
                onChange={(e) => setExpenseName(e.target.value)}
                placeholder="What was this bill for?" 
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="grid grid-cols-2 gap-2">
                <input 
                  type="number" 
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  placeholder="Amount (₹)" 
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select 
                  value={payer} 
                  onChange={(e) => setPayer(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Who Paid?</option>
                  {members.map((m, idx) => <option key={idx} value={m}>{m}</option>)}
                </select>
              </div>
              <button type="submit" className="w-full py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition">Log Bill</button>
            </form>
          </div>
        </div>

        {/* Expenses Feed */}
        {expenses.length > 0 && (
          <div className="mb-8 border border-gray-200 rounded-xl p-5">
            <h4 className="font-bold text-gray-700 mb-3">Logged Expenses</h4>
            <div className="space-y-2">
              {expenses.map(exp => (
                <div key={exp.id} className="flex justify-between items-center text-sm bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <span><strong>{exp.payer}</strong> paid for <em>{exp.name}</em></span>
                  <span className="font-bold text-gray-900">₹{exp.amount}</span>
                </div>
              ))}
            </div>
            <button 
              onClick={computeSettleBalances}
              className="mt-5 w-full py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 hover:shadow-indigo-200 transition"
            >
              Calculate Optimized Settlements
            </button>
          </div>
        )}

        {/* Output Settlements */}
        {transactions.length > 0 && (
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
            <h3 className="text-xl font-black text-indigo-950 mb-4">Optimized Cash Flow Settlements</h3>
            <div className="space-y-3">
              {transactions.map((tx, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-indigo-100 font-medium">
                  <span className="text-red-600 font-bold">{tx.from}</span>
                  <span className="text-gray-400 text-xs">should pay</span>
                  <span className="text-emerald-600 font-bold">₹{tx.amount}</span>
                  <span className="text-gray-400 text-xs">to</span>
                  <span className="text-indigo-900 font-bold">{tx.to}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
