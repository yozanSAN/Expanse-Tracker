import React from 'react'
import expenseTrackerLogo from '../assets/expenses.png';

export default function Navbar() {
  return (
    <nav className='bg-gradient-to-t from-emerald-300 to-emerald-400 flex justify-between items-center px-6 py-4'>
        <div>
            <p className='font-bold text-2xl'>ExpenseTracker</p>
        </div>
        <div>
            <img src={expenseTrackerLogo} className='w-10 h-19 rounded bg-emerald-500' />
        </div>
    </nav>
  )
};
