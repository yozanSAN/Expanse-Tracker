export const getTotals = (transactions, categories) => {
  if (!transactions || !categories || transactions.length === 0) {
    return {
      income: 0,
      expense: 0,
      balance: 0,
      change: 0,
    };
  }

  // Calculate totals using reduce
  const totals = transactions.reduce(
    (acc, transaction) => {
      const foundCategory = categories.find(
        (cat) => cat.id === transaction.categoryId
      );

      if (!foundCategory) {
        console.warn(`Category not found for transaction: ${transaction.id}`);
        return acc;
      }

      if (foundCategory.type === "income") {
        acc.totalIncome += transaction.amount || 0;
      } else {
        acc.totalExpenses += transaction.amount || 0;
      }

      return acc;
    },
    { totalIncome: 0, totalExpenses: 0 }
  );

  // Calculate month-over-month change
  const now = new Date();
  const currentMonth = now.getMonth();
  
  const thisMonthTransactions = transactions.filter((t) => {
    const transactionDate = new Date(t.date?.toDate?.() || t.date);
    return transactionDate.getMonth() === currentMonth;
  });

  const lastMonthTransactions = transactions.filter((t) => {
    const transactionDate = new Date(t.date?.toDate?.() || t.date);
    return transactionDate.getMonth() === (currentMonth - 1 + 12) % 12;
  });

  const thisMonthTotal = thisMonthTransactions.reduce(
    (sum, t) => sum + (t.amount || 0),
    0
  );
  const lastMonthTotal = lastMonthTransactions.reduce(
    (sum, t) => sum + (t.amount || 0),
    0
  );

  let changePercent = 0;
  if (lastMonthTotal > 0) {
    changePercent = Math.round(((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100);
  }

  const totalBalance = totals.totalIncome - totals.totalExpenses;

  return {
    income: totals.totalIncome,
    expense: totals.totalExpenses,
    balance: totalBalance,
    change: Math.abs(changePercent),
  };
};

