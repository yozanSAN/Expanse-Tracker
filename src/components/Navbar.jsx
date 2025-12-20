import { useState, useEffect } from 'react';
import expenseTrackerLogo from '../assets/expenses.png';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase-config';
import userDefaultPhoto from '../assets/default-avatar.png'
export default function Navbar() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className='bg-gradient-to-t from-secondary to-secondary  py-4 gap-20 '>
      {
        user ? (
          <div className='flex justify-around items-center  gap-20 '>
            <section className='flex justify-between items-center gap-3'>
              <img src={expenseTrackerLogo} className='w-10 h-19 rounded bg-accent' />
              <p className='font-bold text-2xl text-textPrimary'>ExpenseTracker</p>
            </section>
            <img src={user.photoURL || userDefaultPhoto} className='w-10 h-19 rounded-full' />
          </div>
        )
          :
          (
            <div className='flex justify-around items-center'>
              <p className='font-bold text-2xl text-textPrimary'>ExpenseTracker</p>
              <img src={expenseTrackerLogo} className='w-10 h-19 rounded bg-accent' />
            </div>
          )
      }
    </nav>
  )
};
