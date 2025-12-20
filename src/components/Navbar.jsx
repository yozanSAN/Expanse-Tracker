import React from 'react'
import expenseTrackerLogo from '../assets/expenses.png';

export default function Navbar() {
  return (
    <nav className='bg-gradient-to-t from-secondary to-secondary flex justify-around items-center py-4 gap-20 '>
        <div>
            <p className='font-bold text-2xl text-textPrimary'>ExpenseTracker</p>
        </div>
        <div>
            <img src={expenseTrackerLogo} className='w-10 h-19 rounded bg-accent' />
        </div>
    </nav>
  )
};
