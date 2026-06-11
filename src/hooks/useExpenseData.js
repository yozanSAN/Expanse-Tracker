import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../config/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

export const useExpenseData = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let unsubscribeTransactions = null;
    let unsubscribeCategories = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      // Clean up any previous Firestore listeners
      if (unsubscribeTransactions) unsubscribeTransactions();
      if (unsubscribeCategories) unsubscribeCategories();

      if (!currentUser) {
        setTransactions([]);
        setCategories([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      // Real-time listener for transactions
      const transactionsQuery = query(
        collection(db, 'transactions'),
        where('userId', '==', currentUser.uid)
      );
      unsubscribeTransactions = onSnapshot(
        transactionsQuery,
        (snapshot) => {
          setTransactions(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
          setLoading(false);
        },
        (err) => {
          console.error('Error fetching transactions:', err);
          setError(err.message);
          setLoading(false);
        }
      );

      // Real-time listener for categories
      const categoriesQuery = query(
        collection(db, 'categories'),
        where('userId', '==', currentUser.uid)
      );
      unsubscribeCategories = onSnapshot(
        categoriesQuery,
        (snapshot) => {
          setCategories(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        },
        (err) => {
          console.error('Error fetching categories:', err);
          setError(err.message);
        }
      );
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeTransactions) unsubscribeTransactions();
      if (unsubscribeCategories) unsubscribeCategories();
    };
  }, []);

  return { transactions, categories, loading, error };
};