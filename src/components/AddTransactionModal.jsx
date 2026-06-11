import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useAddTransaction } from '../hooks/useAddTransaction';

export default function AddTransactionModal({ categories, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    categoryId: '',
    date: new Date().toISOString().split('T')[0],
  });

  const { addTransaction, loading, error } = useAddTransaction(() => {
    onSuccess();
    onClose();
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount || !formData.categoryId) return;
    addTransaction(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-secondary rounded-2xl p-8 w-full max-w-md mx-4 shadow-xl">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-textPrimary">Add Transaction</h2>
          <button onClick={onClose} className="text-textMuted hover:text-textPrimary transition-colors">
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div className="flex flex-col gap-1">
            <label className="text-sm text-textMuted font-medium">Title</label>
            <input
              name="title"
              type="text"
              placeholder="e.g. Monthly Salary"
              value={formData.title}
              onChange={handleChange}
              required
              className="bg-primary border border-tertiary rounded-xl px-4 py-3 text-textPrimary focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-textMuted font-medium">Amount</label>
            <input
              name="amount"
              type="number"
              placeholder="0.00"
              min="0"
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
              required
              className="bg-primary border border-tertiary rounded-xl px-4 py-3 text-textPrimary focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-textMuted font-medium">Category</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
              className="bg-primary border border-tertiary rounded-xl px-4 py-3 text-textPrimary focus:outline-none focus:border-accent transition-colors"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.type === 'income' ? '↑' : '↓'} {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-textMuted font-medium">Date</label>
            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="bg-primary border border-tertiary rounded-xl px-4 py-3 text-textPrimary focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {error && <p className="text-danger text-sm">{error}</p>}

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-tertiary text-textSecondary hover:bg-tertiary transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-accent hover:bg-accent-soft text-primary font-bold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : null}
              {loading ? 'Saving...' : 'Add Transaction'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}