import totalbaalnce from '../../assets/totalBalance.png';
import increasingLogo from '../../assets/increasing.png';
import incomeLogo from '../../assets/incomeLogo.png';
import decreasingLogo from '../../assets/decreasingLogo.png';
import expensesLogo from '../../assets/expensesLogo.png';



export default function Dashboard() {
  return (
    <div className='bg-emerald-950 h-screen'>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">

        <div className='flex flex-col justify-between items-center rounded-lg border-none px-6 py-5 gap-4 my-5 bg-emerald-900'>
          <div className='flex justify-start items-center gap-2'>
            <img src={totalbaalnce} className='w-7 h-8' />
            <p className='text-gray-200 text-xl'>Total Balance</p>
          </div>
          <div className='flex justify-start items-center'>
            <p className='font-bold text-3xl text-white'>12990.39
            </p>
          </div>
          <div className='flex justify-start items-center gap-2'>
            <img src={increasingLogo} className='w-7 h-8' />
            <p className='text-green-400 font-bold text-xl'>+3.9% </p>
            <p className='text-gray-300 text-xl '>vs last month</p>
          </div>
        </div>

        <div className='flex flex-col justify-between items-center rounded-lg border-none px-6 py-5 gap-4 bg-emerald-900 my-5'>
          <div className='flex justify-start items-center gap-2'>
            <img src={incomeLogo} className='w-7 h-8' />
            <p className='text-gray-200 text-xl'>Total Income</p>
          </div>
          <div className='flex justify-start items-center'>
            <p className='font-bold text-3xl text-white'>12390.39
            </p>
          </div>
          <div className='flex justify-start items-center gap-2'>
            <img src={decreasingLogo} className='w-7 h-8' />
            <p className='text-red-400 font-bold text-xl'>+3.9% </p>
            <p className='text-gray-300 text-xl '>vs last month</p>
          </div>
        </div>



        <div className='flex flex-col justify-between items-center rounded-lg border-none px-6 py-5 gap-4 bg-emerald-900 my-5'>
          <div className='flex justify-start items-center gap-2'>
            <img src={expensesLogo} className='w-7 h-8' />
            <p className='text-gray-200 text-xl'>Total Balance</p>
          </div>
          <div className='flex justify-start items-center'>
            <p className='font-bold text-3xl text-white'>12990.39
            </p>
          </div>
          <div className='flex justify-start items-center gap-2'>
            <img src={increasingLogo} className='w-7 h-8' />
            <p className='text-green-400 font-bold text-xl'>+3.9% </p>
            <p className='text-gray-300 text-xl '>vs last month</p>
          </div>
        </div>

        <div class="col-span-2 bg-emerald-900 flex flex-col gap-44 p-3 rounded-xl">
          <div className='flex justify-between items-center'>
            <div className='flex flex-col justify-between items-center'>
              <p className='text-white text-2xl font-bold'>Spndign Analytics</p>
              <p className='text-gray-300 text-md'>Monthly breakdown of expenses</p>
            </div>
            <div className='flex justify-evenly items-center gap-2'>
              <button className=' bg-emerald-800 px-5 py-1 text-white font-bold rounded-2xl hover:text-black hover:bg-emerald-500'>Week</button>
              <button className=' bg-emerald-800 px-5 py-1 text-white font-bold rounded-2xl hover:text-black hover:bg-emerald-500'>Month</button>
              <button className=' bg-emerald-800 px-5 py-1 text-white font-bold rounded-2xl hover:text-black hover:bg-emerald-500'>Year</button>
            </div>
          </div>
          <div className='flex justify-evenly items-center text-gray-400 font-bold '>
            <span className='hover:text-white active:text-white'>Mon</span>
            <span className='hover:text-white  active:text-white'>Tue</span>
            <span className='hover:text-white  active:text-white'>Wed</span>
            <span className='hover:text-white  active:text-white'>Thu</span>
            <span className='hover:text-white  active:text-white'>Fri</span>
            <span className='hover:text-white  active:text-white'>Sat</span>
            <span className='hover:text-white  active:text-white'>Sun</span>
          </div>
        </div>

        <div class="col-span-1 bg-emerald-900 flex flex-col justify-evenly items-center rounded-xl">
          <div>
            <p className='text-2xl text-white font-bold'>Top Categories</p>
          </div>

          <div className='flex flex-col justify-between items-center text-gray-300'>
            <div className='flex justify-between items-center gap-20'>
              <p>Food & Dining</p>
              <p>43%</p>
            </div>
            <div>
              prgress bar
            </div>
          </div>

          <div className='flex flex-col justify-between items-center text-gray-300'>
            <div className='flex justify-between items-center gap-20'>
              <p>Shopping</p>
              <p>23%</p>
            </div>
            <div>
              prgress bar
            </div>
          </div>

          <div className='flex flex-col justify-between items-center text-gray-300 '>
            <div className='flex justify-between items-center gap-20'>
              <p>Transport</p>
              <p>18%</p>
            </div>
            <div>
              prgress bar
            </div>
          </div>

          <div className='flex flex-col justify-between items-center text-gray-300 '>
            <div className='flex justify-between items-center gap-24'>
              <p>others</p>
              <p>13%</p>
            </div>
            <div>
              prgress bar
            </div>
          </div>
        </div>

      </div>
    </div>
  )
};
