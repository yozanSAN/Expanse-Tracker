export const getTotals = (transactions, categories) => {
  if (!transactions || !categories || transactions.length === 0) {
    return {
      income: 0,
      expense: 0,
      balance: 0,
      change: 0,
      categoriesWithPercentage: [],
    };
  }

  const totals = transactions.reduce(
    (acc, transaction) => {
      const foundCategory = categories.find(
        (cat) => cat.id === transaction.categoryId
      );

      if (!foundCategory) {
        console.warn(`Category not found for transaction: ${transaction.id}`);
        return acc;
      }

      if (foundCategory.type === 'income') {
        acc.totalIncome += transaction.amount || 0;
      } else {
        acc.totalExpenses += transaction.amount || 0;
        // Track spending per expense category
        acc.categoryTotals[foundCategory.id] =
          (acc.categoryTotals[foundCategory.id] || 0) + (transaction.amount || 0);
      }

      return acc;
    },
    { totalIncome: 0, totalExpenses: 0, categoryTotals: {} }
  );

  // Compute percentage of total expenses for each expense category
  const categoriesWithPercentage = categories
    .filter((cat) => cat.type === 'expense')
    .map((cat) => ({
      ...cat,
      total: totals.categoryTotals[cat.id] || 0,
      percentage:
        totals.totalExpenses > 0
          ? Math.round(((totals.categoryTotals[cat.id] || 0) / totals.totalExpenses) * 100)
          : 0,
    }))
    .filter((cat) => cat.total > 0) // only show categories that have been used
    .sort((a, b) => b.percentage - a.percentage); // highest first

  // Month-over-month change
  const now = new Date();
  const currentMonth = now.getMonth();

  const thisMonthTotal = transactions
    .filter((t) => {
      const d = new Date(t.date?.toDate?.() || t.date);
      return d.getMonth() === currentMonth;
    })
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  const lastMonthTotal = transactions
    .filter((t) => {
      const d = new Date(t.date?.toDate?.() || t.date);
      return d.getMonth() === (currentMonth - 1 + 12) % 12;
    })
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  const changePercent =
    lastMonthTotal > 0
      ? Math.round(((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100)
      : 0;

  return {
    income: totals.totalIncome,
    expense: totals.totalExpenses,
    balance: totals.totalIncome - totals.totalExpenses,
    change: Math.abs(changePercent),
    categoriesWithPercentage,
  };
};