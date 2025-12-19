import totalbaalnce from '../../assets/totalBalance.png';
import increasingLogo from '../../assets/increasing.png';
export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-5">

      <div className='flex flex-col justify-between items-center rounded-md border-2 w-72'>
        <div className='flex justify-between items-center gap-3'>
          <img src={totalbaalnce} className='w-6 h-7' />
          <p className='text-gray-400'>Total Balance</p>
        </div>
        <div>
          <p className='font-bold text-xl'>12990.39</p>
          <div className='flex justify-between items-center gap-2'>
            <img src={increasingLogo} className='w-6 h-7' />
            <p className='text-green-600 font-bold'>+3.9% </p>
            <p className='text-gray-500 '>vs last month</p>
          </div>
        </div>
      </div>

    </div>
  )
};
