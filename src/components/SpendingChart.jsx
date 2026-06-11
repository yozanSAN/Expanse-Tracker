import { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const FILTERS = ['Week', 'Month', 'Year'];

const getWeekData = (transactions, categories) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  startOfWeek.setHours(0, 0, 0, 0);

  return days.map((day, i) => {
    const dayDate = new Date(startOfWeek);
    dayDate.setDate(startOfWeek.getDate() + i);

    const dayTransactions = transactions.filter((t) => {
      const d = new Date(t.date?.toDate?.() || t.date);
      return d.toDateString() === dayDate.toDateString();
    });

    return {
      label: day,
      income: dayTransactions
        .filter((t) => categories.find((c) => c.id === t.categoryId)?.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0),
      expense: dayTransactions
        .filter((t) => categories.find((c) => c.id === t.categoryId)?.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0),
    };
  });
};

const getMonthData = (transactions, categories) => {
  const now = new Date();
  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

  return weeks.map((label, i) => {
    const weekTransactions = transactions.filter((t) => {
      const d = new Date(t.date?.toDate?.() || t.date);
      if (d.getMonth() !== now.getMonth() || d.getFullYear() !== now.getFullYear()) return false;
      const week = Math.floor((d.getDate() - 1) / 7);
      return week === i;
    });

    return {
      label,
      income: weekTransactions
        .filter((t) => categories.find((c) => c.id === t.categoryId)?.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0),
      expense: weekTransactions
        .filter((t) => categories.find((c) => c.id === t.categoryId)?.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0),
    };
  });
};

const getYearData = (transactions, categories) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const now = new Date();

  return months.map((label, i) => {
    const monthTransactions = transactions.filter((t) => {
      const d = new Date(t.date?.toDate?.() || t.date);
      return d.getMonth() === i && d.getFullYear() === now.getFullYear();
    });

    return {
      label,
      income: monthTransactions
        .filter((t) => categories.find((c) => c.id === t.categoryId)?.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0),
      expense: monthTransactions
        .filter((t) => categories.find((c) => c.id === t.categoryId)?.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0),
    };
  });
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-secondary border border-tertiary rounded-xl px-4 py-3 text-sm">
      <p className="text-textPrimary font-bold mb-2">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }} className="font-medium">
          {entry.name.charAt(0).toUpperCase() + entry.name.slice(1)}: {entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

export default function SpendingChart({ transactions, categories }) {
  const [filter, setFilter] = useState('Month');

  const data = useMemo(() => {
    if (filter === 'Week')  return getWeekData(transactions, categories);
    if (filter === 'Month') return getMonthData(transactions, categories);
    return getYearData(transactions, categories);
  }, [filter, transactions, categories]);

  return (
    <div className="col-span-2 bg-secondary flex flex-col p-6 rounded-xl gap-6">

      <div className="flex justify-between items-start">
        <div>
          <p className="text-textPrimary text-2xl font-bold">Spending Analytics</p>
          <p className="text-textSecondary text-sm mt-1">Income vs expenses breakdown</p>
        </div>
        <div className="flex items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1 rounded-2xl font-bold text-sm transition-colors ${
                filter === f
                  ? 'bg-accent text-primary'
                  : 'bg-primary text-textPrimary hover:bg-tertiary'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barCategoryGap="30%" barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f5c47" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: '#9fbdb0', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#9fbdb0', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => v === 0 ? '0' : `${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1f5c47', opacity: 0.4 }} />
          <Legend
            wrapperStyle={{ fontSize: '13px', color: '#9fbdb0', paddingTop: '12px' }}
            formatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}
          />
          <Bar dataKey="income"  fill="#22c55e" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}