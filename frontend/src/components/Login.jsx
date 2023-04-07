import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Login() {
  const [formInfo, setFormInfo] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleLogin = (e) => {
    fetch('http://localhost:5001/sessions', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(formInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        document.cookie = `token=${data.token}`;
        document.cookie = `username=${data.username}`;
        navigate('/user-page');
      });

    e.preventDefault();
  };

  return (
    <section className='flex flex-col items-center justify-center pt-36'>
      <h1 className=' text-3xl'>Login</h1>
      <form
        className='flex flex-col my-10  w-96'
        onSubmit={(e) => handleLogin(e)}
      >
        <input
          type='email'
          id='email'
          placeholder='Enter email'
          required
          className='border-2 mb-4 px-1'
          value={formInfo.email}
          onChange={(e) => setFormInfo({ ...formInfo, email: e.target.value })}
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

        <button className='bg-slate-200 p-2'>Submit</button>
      </form>
    </section>
  );
}

export default Login;
