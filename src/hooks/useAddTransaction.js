import { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db, auth } from '../config/firebase-config';

export const useAddTransaction = (onSuccess) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addTransaction = async (formData) => {
    try {
      setLoading(true);
      setError(null);

      await addDoc(collection(db, 'transactions'), {
        userId: auth.currentUser.uid,
        title: formData.title,
        amount: parseFloat(formData.amount),
        categoryId: formData.categoryId,
        date: Timestamp.fromDate(new Date(formData.date)),
        createdAt: Timestamp.now(),
      });

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Error adding transaction:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { addTransaction, loading, error };
};