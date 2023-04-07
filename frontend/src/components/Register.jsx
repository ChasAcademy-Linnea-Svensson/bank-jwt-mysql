import React, { useState } from 'react';

function Register() {
  const [formInfo, setFormInfo] = useState({
    name: '',
    email: '',
    balance: 0,
    password: '',
    password2: '',
  });

  const [text, setText] = useState('');
  const [color, setColor] = useState('bg-green-200');

  const handleSubmit = (e) => {
    //POST request
    if (formInfo.password === formInfo.password2) {
      const user = {
        name: formInfo.name,
        email: formInfo.email,
        password: formInfo.password,
        balance: formInfo.balance,
      };
      fetch('http://localhost:5001/users', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(user),
      }).then((res) => {
        if (res.status == 200) {
          setText('New user registered');
          setTimeout(() => {
            setText('');
          }, 2000);
        }
        setFormInfo({
          ...formInfo,
          name: '',
          email: '',
          balance: 0,
          password: '',
          password2: '',
        });
      });
    } else {
      setColor('bg-red-200');
      setText('Password does not match');
      setTimeout(() => {
        setText('');
        setColor('bg-green-200');
      }, 2000);
    }
    e.preventDefault();
  };

  return (
    <section className='flex flex-col items-center justify-center pt-36'>
      <div
        className={`fixed top-20 rounded-lg p-4 ${color} ${
          text === '' ? 'hidden' : 'block'
        }`}
      >
        {text}
      </div>
      <h1 className=' text-3xl'>Register new user</h1>
      <form
        className='flex flex-col my-10  w-96'
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type='text'
          id='name'
          placeholder='Enter name'
          required
          className='border-2 mb-4 px-1'
          value={formInfo.name}
          onChange={(e) => setFormInfo({ ...formInfo, name: e.target.value })}
        />
        <input
          type='email'
          id='email'
          placeholder='Enter email'
          required
          className='border-2 mb-4 px-1'
          value={formInfo.email}
          onChange={(e) => setFormInfo({ ...formInfo, email: e.target.value })}
        />
        <label htmlFor='balance'>Balance:</label>
        <input
          type='number'
          id='balance'
          placeholder='Balance'
          min={0}
          required
          className='border-2 mb-4 px-1'
          value={formInfo.balance}
          onChange={(e) =>
            setFormInfo({ ...formInfo, balance: e.target.value })
          }
        />
        <input
          type='password'
          id='password'
          placeholder='Enter password'
          required
          className='border-2 mb-4 px-1'
          value={formInfo.password}
          onChange={(e) =>
            setFormInfo({ ...formInfo, password: e.target.value })
          }
        />
        <input
          type='password'
          id='password2'
          placeholder='Repeat password'
          required
          className='border-2 mb-4 px-1'
          value={formInfo.password2}
          onChange={(e) =>
            setFormInfo({ ...formInfo, password2: e.target.value })
          }
        />
        <button className='bg-slate-200 p-2'>Submit</button>
      </form>
    </section>
  );
}

export default Register;
