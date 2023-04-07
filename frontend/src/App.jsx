import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { IoLogoBitcoin, IoMdLogIn } from 'react-icons/io';
import { ImUser } from 'react-icons/im';
import Register from './components/Register';
import Login from './components/Login';
import UserPage from './components/UserPage';

function App() {
  return (
    <Router>
      <nav className='bg-blue-200 flex items-center justify-between p-4'>
        <Link to='/'>
          <IoLogoBitcoin className='text-3xl' />
        </Link>
        <div className='flex gap-4'>
          <Link to='/login' className='flex gap-1 items-center'>
            <IoMdLogIn /> Login
          </Link>
          <Link to='/register' className='flex gap-1 items-center'>
            <ImUser />
            Register
          </Link>
        </div>
      </nav>
      <Routes>
        <Route
          path='/'
          element={
            <div className='flex flex-col items-center justify-center mt-32'>
              <h1 className='text-3xl'>Welcome to the bank</h1>
              <p>Please login or register a new account</p>
            </div>
          }
        />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/user-page' element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
