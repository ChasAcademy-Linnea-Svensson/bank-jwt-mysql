import React, { useState } from 'react';

function Balance({ account }) {
  const [withdraw, setWithdraw] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [amount, setBalance] = useState(account.amount);

  const handleDeposit = () => {
    if (deposit !== 0) {
      const cookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];

      fetch(`http://localhost:5001/me/accounts/${account.id}`, {
        method: 'PUT',
        cache: 'no-cache',
        headers: {
          accept: 'application/json',
          'Content-type': 'application/json',
          authorization: cookie,
        },
        body: JSON.stringify({ amount: deposit }),
      })
        .then((res) => res.json())
        .then((data) => (setBalance(data), setDeposit(0)));
    } else {
      alert('Amount can not be 0');
    }
  };

  const handleWithdraw = () => {
    if (withdraw !== 0) {
      const cookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];

      fetch(`http://localhost:5001/me/accounts/${account.id}`, {
        method: 'PUT',
        cache: 'no-cache',
        headers: {
          accept: 'application/json',
          'Content-type': 'application/json',
          authorization: cookie,
        },
        body: JSON.stringify({ amount: `-${withdraw}` }),
      })
        .then((res) => res.json())
        .then((data) => (setBalance(data), setWithdraw(0)));
    } else {
      alert('Amount can not be 0');
    }
  };

  const username = document.cookie
    .split('; ')
    .find((row) => row.startsWith('username='))
    ?.split('=')[1];

  return (
    <div className='flex flex-col items-center justify-center gap-8'>
      <p className='text-3xl font-semibold'>{username}'s account</p>
      <div className='bg-blue-200 w-96 h-80 rounded-lg flex flex-col items-center'>
        <p className='p-4'>Current balance:</p>
        <p className='bg-blue-100 w-full flex items-center justify-center h-28'>
          {amount} SEK
        </p>
        <div className='flex items-center justify-evenly w-full my-6'>
          <button
            className='bg-blue-500 text-blue-100 w-28 p-2 rounded-lg'
            onClick={handleDeposit}
          >
            Deposit
          </button>
          <button
            className='bg-blue-500 text-blue-100 w-28 p-2 rounded-lg'
            onClick={handleWithdraw}
          >
            Withdraw
          </button>
        </div>
        <div className='flex gap-4 h-10'>
          <input
            type='number'
            className=' rounded-md px-2 w-40'
            placeholder='Deposit money'
            value={deposit}
            onChange={(e) => setDeposit(e.target.value)}
            min={0}
          />
          <input
            type='number'
            className=' rounded-md px-2 w-40'
            placeholder='Withdraw money'
            value={withdraw}
            onChange={(e) => setWithdraw(e.target.value)}
            min={0}
          />
        </div>
      </div>
    </div>
  );
}

export default Balance;
