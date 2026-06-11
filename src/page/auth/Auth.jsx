import { useState, useEffect } from 'react';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { auth, provider, db } from '../../config/firebase-config.js';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

const DEFAULT_CATEGORIES = [
  { name: 'Salary',        type: 'income',  icon: 'wallet',        color: '#4CAF50' },
  { name: 'Freelance',     type: 'income',  icon: 'laptop',        color: '#8BC34A' },
  { name: 'Rent',          type: 'expense', icon: 'home',          color: '#F44336' },
  { name: 'Groceries',     type: 'expense', icon: 'shopping-cart', color: '#FF9800' },
  { name: 'Dining Out',    type: 'expense', icon: 'utensils',      color: '#E91E63' },
  { name: 'Entertainment', type: 'expense', icon: 'play',          color: '#9C27B0' },
  { name: 'Transport',     type: 'expense', icon: 'car',           color: '#2196F3' },
  { name: 'Health',        type: 'expense', icon: 'heart',         color: '#00BCD4' },
];

const seedCategories = async (userId) => {
  const q = query(
    collection(db, 'categories'),
    where('userId', '==', userId)
  );
  const snapshot = await getDocs(q);
  if (!snapshot.empty) return;

  const writes = DEFAULT_CATEGORIES.map((cat) =>
    addDoc(collection(db, 'categories'), { ...cat, userId })
  );
  await Promise.all(writes);
};

const Auth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        navigate('/Dashboard');
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      await seedCategories(result.user.uid);
      setUser(result.user);
      navigate('/Dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-secondary">
        <p className="text-textPrimary text-2xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-primary">
      {!user && (
        <button
          className="px-6 py-5 text-3xl font-bold rounded-xl bg-secondary hover:bg-tertiary text-textPrimary border border-tertiary transition-colors"
          onClick={handleLogin}
        >
          Sign up with Google
        </button>
      )}
    </div>
  );
};

export default Auth;