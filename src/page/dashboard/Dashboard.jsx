import totalbaalnceIcon from '../../assets/totalBalance.png';
import increasingLogo from '../../assets/increasing.png';
import incomeLogo from '../../assets/incomeLogo.png';
import decreasingLogo from '../../assets/decreasingLogo.png';
import expensesLogo from '../../assets/expensesLogo.png';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import AddTransactionModal from '../../components/AddTransactionModal';
import SpendingChart from '../../components/SpendingChart';
import { useExpenseData } from '../../hooks/useExpenseData.js';
import { getTotals } from '../../utils/helper.js';

export default function Dashboard() {
  const { transactions, categories, loading, error } = useExpenseData();
  const [showModal, setShowModal] = useState(false);

  const { income = 0, expense = 0, balance = 0 } =
    transactions.length > 0 && categories.length > 0
      ? getTotals(transactions, categories)
      : { income: 0, expense: 0, balance: 0 };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-primary">
        <p className="text-textPrimary text-2xl">Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-primary">
        <p className="text-danger text-2xl">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-primary min-h-screen px-6 py-5 max-w-7xl mx-auto">

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-stretch gap-4 mb-6">

        <div className="flex flex-col justify-between items-center rounded-lg px-6 py-5 gap-4 bg-secondary">
          <div className="flex justify-start items-center gap-2">
            <img src={totalbaalnceIcon} className="w-7 h-8" />
            <p className="text-textSecondary text-xl">Total Balance</p>
          </div>
          <p className="font-bold text-3xl text-textPrimary">{balance.toLocaleString()}</p>
          <div className="flex items-center gap-2">
            <img src={balance >= 0 ? increasingLogo : decreasingLogo} className="w-7 h-8" />
            <p className="text-success font-bold text-xl">+2%</p>
            <p className="text-textSecondary text-xl">vs last month</p>
          </div>
        </div>

        <div className="flex flex-col justify-between items-center rounded-lg px-6 py-5 gap-4 bg-secondary">
          <div className="flex justify-start items-center gap-2">
            <img src={incomeLogo} className="w-7 h-8" />
            <p className="text-textSecondary text-xl">Total Income</p>
          </div>
          <p className="font-bold text-3xl text-textPrimary">{income.toLocaleString()}</p>
          <div className="flex items-center gap-2">
            <img src={income > 0 ? increasingLogo : decreasingLogo} className="w-7 h-8" />
            <p className="text-success font-bold text-xl">+5%</p>
            <p className="text-textSecondary text-xl">vs last month</p>
          </div>
        </div>

        <div className="flex flex-col justify-between items-center rounded-lg px-6 py-5 gap-4 bg-secondary">
          <div className="flex justify-start items-center gap-2">
            <img src={expensesLogo} className="w-7 h-8" />
            <p className="text-textSecondary text-xl">Total Expenses</p>
          </div>
          <p className="font-bold text-3xl text-textPrimary">{expense.toLocaleString()}</p>
          <div className="flex items-center gap-2">
            <img src={expense > 0 ? increasingLogo : decreasingLogo} className="w-7 h-8" />
            <p className="text-danger font-bold text-xl">+3%</p>
            <p className="text-textSecondary text-xl">vs last month</p>
          </div>
        </div>

        {/* CHART */}
        <SpendingChart transactions={transactions} categories={categories} />

        {/* TOP CATEGORIES */}
        <div className="col-span-1 bg-secondary flex flex-col p-6 rounded-xl gap-4">
          <p className="text-2xl text-textPrimary font-bold">Top Categories</p>
          {categories.length > 0 ? (
            categories.map((cat) => (
              <div className="flex flex-col gap-2 w-full" key={cat.id}>
                <div className="flex justify-between items-center w-full">
                  <p className="text-textSecondary">{cat.name}</p>
                  <p className="text-textSecondary">{cat.percentage ?? 0}%</p>
                </div>
                <div className="w-full bg-primary rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${cat.percentage ?? 0}%`,
                      backgroundColor: cat.color,
                    }}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-info text-center">No categories found</p>
          )}
        </div>

      </div>

      {/* RECENT TRANSACTIONS HEADER */}
      <div className="text-textPrimary flex justify-between items-center mb-5">
        <div className="flex items-center gap-4">
          <p className="text-xl font-bold">Recent Transactions</p>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-accent hover:bg-accent-soft text-primary font-bold px-4 py-2 rounded-xl transition-colors"
          >
            <Plus size={18} />
            Add
          </button>
        </div>
        <div className="flex items-center gap-4">
          <select className="bg-secondary text-textPrimary px-3 py-2 rounded-xl">
            <option value="This Month">This Month</option>
            <option value="This Week">This Week</option>
            <option value="This Year">This Year</option>
          </select>
          <select className="bg-secondary text-textPrimary px-3 py-2 rounded-xl">
            <option value="All categories">All categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* RECENT TRANSACTIONS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {Array.isArray(transactions) && transactions.length > 0 ? (
          transactions.map((transaction) => {
            const cat = categories.find((c) => c.id === transaction.categoryId);
            const date = transaction.date?.toDate?.() || new Date(transaction.date);
            return (
              <div
                key={transaction.id}
                className="flex justify-evenly items-center bg-secondary text-textPrimary rounded-lg py-5 px-4 gap-2"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-primary font-bold text-lg flex-shrink-0"
                  style={{ backgroundColor: cat?.color ?? '#22c55e' }}
                >
                  {transaction.title?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="font-bold mb-1">{transaction.title}</p>
                  <p className="text-textSecondary text-sm">{cat?.name ?? 'Uncategorized'}</p>
                </div>
                <div className="text-right">
                  <p className={`text-xl font-bold mb-1 ${cat?.type === 'income' ? 'text-success' : 'text-danger'}`}>
                    {cat?.type === 'income' ? '+' : '-'}{transaction.amount.toLocaleString()}
                  </p>
                  <p className="text-textMuted text-sm">
                    {date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-textMuted col-span-3">No transactions found</p>
        )}
      </div>

      {showModal && (
        <AddTransactionModal
          categories={categories}
          onClose={() => setShowModal(false)}
          onSuccess={() => window.location.reload()}
        />
      )}

    </div>
  );
}