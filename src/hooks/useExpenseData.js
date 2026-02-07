import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { auth } from '../config/firebase-config';

export const useExpenseData = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const currentUser = auth.currentUser;
        if (!currentUser) {
          setTransactions([]);
          setCategories([]);
          setLoading(false);
          return;
        }

        // Fetch transactions for current user
        const transactionsQuery = query(
          collection(db, 'transactions'),
          where('userId', '==', currentUser.uid)
        );
        const transactionsSnapshot = await getDocs(transactionsQuery);
        const transactionsData = transactionsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Fetch categories for current user
        const categoriesQuery = query(
          collection(db, 'categories'),
          where('userId', '==', currentUser.uid)
        );
        const categoriesSnapshot = await getDocs(categoriesQuery);
        const categoriesData = categoriesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setTransactions(transactionsData);
        setCategories(categoriesData);
        setError(null);
      } catch (err) {
        console.error('Error fetching expense data:', err);
        setError(err.message);
        setTransactions([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    // Set up auth listener
    const unsubscribe = auth.onAuthStateChanged(() => {
      fetchData();
    });

    return () => unsubscribe();
  }, []);

  return { transactions, categories, loading, error };
};
