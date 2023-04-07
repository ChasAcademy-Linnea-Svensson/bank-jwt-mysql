import React, { useState } from 'react';
import Balance from './Balance';

function UserPage({ user }) {
  const [account, setAccount] = useState({
    show: false,
    amount: 0,
    userName: '',
    userId: '',
    id: 0,
  });
  const handleClick = () => {
    const cookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1];
    fetch('http://localhost:5001/me/accounts', {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        accept: 'application/json',
        'Content-type': 'application/json',
        authorization: cookie,
      },
    })
      .then((res) => res.json())
      .then((data) =>
        setAccount({
          ...account,
          amount: data.amount,
          show: true,
          userName: data.userName,
          userId: data.userId,
          id: data.id,
        })
      );
  };
  return (
    <div className='flex flex-col items-center justify-center pt-36'>
      {account.show ? (
        <Balance account={account} />
      ) : (
        <button className='bg-blue-200 p-4 rounded-lg' onClick={handleClick}>
          Show balance
        </button>
      )}
    </div>
  );
}

export default UserPage;
