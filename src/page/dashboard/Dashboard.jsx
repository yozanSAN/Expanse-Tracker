import totalbaalnce from '../../assets/totalBalance.png';
import increasingLogo from '../../assets/increasing.png';
import incomeLogo from '../../assets/incomeLogo.png';
import decreasingLogo from '../../assets/decreasingLogo.png';
import expensesLogo from '../../assets/expensesLogo.png';

//DUMMY DATA IMPORTS
import { categories } from './../../data/categories';
import { transactions } from './../../data/transactions';
import { stats } from '../../data/stats';


export default function Dashboard() {
  return (
    <div className='bg-primary h-screen'>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-stretch gap-4 max-w-full ml-44 my-5 ">

        <div className='flex flex-col justify-between items-center rounded-lg border-none px-6 py-5 gap-4 my-5 bg-secondary'>
          <div className='flex justify-start items-center gap-2'>
            <img src={totalbaalnce} className='w-7 h-8' />
            <p className='text-textSecondary text-xl'>Total Balance</p>
          </div>
          <div className='flex justify-start items-center'>
            <p className='font-bold text-3xl text-textPrimary'>{stats.totalBalance.amount}
            </p>
          </div>
          <div className='flex justify-start items-center gap-2'>
            {
              stats?.totalBalance?.trend === 'up' ? (<img src={increasingLogo} className='w-7 h-8' />) : (<img src={decreasingLogo} className='w-7 h-8' />)
            }

            <p className='text-success font-bold text-xl'>{stats.totalBalance.change}% </p>
            <p className='text-textSecondary text-xl '>vs last month</p>
          </div>
        </div>

        <div className='flex flex-col justify-between items-center rounded-lg border-none px-6 py-5 gap-4 bg-secondary my-5'>
          <div className='flex justify-start items-center gap-2'>
            <img src={incomeLogo} className='w-7 h-8' />
            <p className='text-textSecondary text-xl'>Total Income</p>
          </div>
          <div className='flex justify-start items-center'>
            <p className='font-bold text-3xl text-textPrimary'>{stats.totalIncome.amount}
            </p>
          </div>
          <div className='flex justify-start items-center gap-2'>
            {
              stats?.totalIncome?.trend === 'up' ? (<img src={increasingLogo} className='w-7 h-8' />) : (<img src={decreasingLogo} className='w-7 h-8' />)
            }
            <p className='text-danger font-bold text-xl'>{stats.totalIncome.change}% </p>
            <p className='text-textSecondary text-xl '>vs last month</p>
          </div>
        </div>

        <div className='flex flex-col justify-between items-center rounded-lg border-none px-6 py-5 gap-4 bg-secondary my-5'>
          <div className='flex justify-start items-center gap-2'>
            <img src={expensesLogo} className='w-7 h-8' />
            <p className='text-textSecondary text-xl'>Total Expenses</p>
          </div>
          <div className='flex justify-start items-center'>
            <p className='font-bold text-3xl text-textPrimary'>{stats.totalExpenses.amount}
            </p>
          </div>
          <div className='flex justify-start items-center gap-2'>
            {
              stats?.totalExpenses?.trend === 'up' ? (<img src={increasingLogo} className='w-7 h-8' />) : (<img src={decreasingLogo} className='w-7 h-8' />)
            }
            <p className='text-success font-bold text-xl'>{stats.totalExpenses.change}% </p>
            <p className='text-textSecondary text-xl '>vs last month</p>
          </div>
        </div>

        <div class="col-span-2 bg-secondary flex flex-col justify-between p-3 rounded-xl">
          <div className='flex justify-between items-center'>
            <div className='flex flex-col justify-between items-center'>
              <p className='text-textPrimary text-2xl font-bold'>Spndign Analytics</p>
              <p className='text-textSecondary text-md'>Monthly breakdown of expenses</p>
            </div>
            <div className='flex justify-evenly items-center gap-2'>
              <button className='bg-primary px-5 py-1 text-textPrimary font-bold rounded-2xl hover:text-primary hover:bg-accent'>Week</button>
              <button className='bg-primary px-5 py-1 text-textPrimary font-bold rounded-2xl hover:text-primary hover:bg-accent'>Month</button>
              <button className='bg-primary px-5 py-1 text-textPrimary font-bold rounded-2xl hover:text-primary hover:bg-accent'>Year</button>
            </div>
          </div>
          <div className='flex justify-between  items-center text-textMuted font-bold '>
            <span className='hover:text-textPrimary active:text-textPrimary'>Mon</span>
            <span className='hover:text-textPrimary active:text-textPrimary'>Tue</span>
            <span className='hover:text-textPrimary active:text-textPrimary'>Wed</span>
            <span className='hover:text-textPrimary active:text-textPrimary'>Thu</span>
            <span className='hover:text-textPrimary active:text-textPrimary'>Fri</span>
            <span className='hover:text-textPrimary active:text-textPrimary'>Sat</span>
            <span className='hover:text-textPrimary active:text-textPrimary'>Sun</span>
          </div>
        </div>

        {/* TOP CATEGORIES */}

        <div className="col-span-1 bg-secondary flex flex-col justify-start p-6 rounded-xl gap-6">
          <div>
            <p className='text-2xl text-textPrimary font-bold'>Top Categories</p>
            {
              categories.length > 0 ? categories.map(cat => (
                <div className='flex flex-col gap-2 w-full' key={cat.name}>
                  <div className='flex justify-between items-center w-full'>
                    <p className='text-textSecondary'>{cat.name}</p>
                    <p className='text-textSecondary'>{cat.percentage}%</p>
                  </div>
                  <div className='w-full bg-primary rounded-full h-2'>
                    <div className={"h-2 rounded-full"} style={{
                      width: `${cat.percentage}%`,
                      backgroundColor: cat.color
                    }}></div>
                  </div>
                </div>
              ))
                :
                <h1 className='text-2xl text-info text-center'>NO CATEGORIES FOUND</h1>
            }
          </div>
        </div>
        {/* --------------------------------------------------- */}
      </div>

      <div className='text-textPrimary flex justify-around items-center'>
        <div>
          <p className='text-xl font-bold'>Recent Transactions</p>
        </div>
        <div className='flex justify-between items-center gap-4'>
          <select className='bg-secondary px-3 py-2 rounded-xl'>
            <option value="This Month">This Month</option>
            <option value="This Week">This Week</option>
            <option value="This Year">This Year</option>
          </select>
          <select className='bg-secondary  px-3 py-2 rounded-xl'>
            <option value="All categories">All categories</option>
            <option value="Food & Dinning">Food & Dinning</option>
            <option value="Shopping">Shopping</option>
            <option value="Transport">Transport</option>
            <option value="Others">Others</option>
          </select>
        </div>
      </div>

      {/* RECENT TRANSACTIONS GRID*/}

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3      lg:grid-cols-3 items-stretch
      gap-7  mx-auto max-w-7xl my-5'>

        {
          Array.isArray(transactions) && transactions.length > 0 ? (
            transactions.map(transaction =>
              <div key={transaction.id} className='flex justify-evenly items-center bg-secondary text-textPrimary rounded-lg border-none py-5 px-4 h-full gap-2'>

                <div >
                  <p >{transaction.icon}</p>
                </div>
                <div >
                  <p className='text-md  font-bold mb-3'>{transaction.title}</p>
                  <p className='text-textSecondary'>{transaction.category}</p>
                </div>
                <div>
                  <p className='text-xl font-bold mb-3'>{transaction.amount}</p>
                  <p className='text-textMuted'>{transaction.date}</p>
                </div>
              </div>
            )
          )
            :
            (
              <h1>No transactions found!!</h1>
            )
        }
      </div>

    </div>
  )
};
