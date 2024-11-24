import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import { useLogout } from '../hooks/useLogout';
const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  return (
    <header>
      <div className='container'>
        {/* LOGO */}
        <Link to="/">
          <h1>Polling App</h1>
        </Link>
        {/* NAVBAR */}
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={logout}>Logout</button>
            </div>
          )}
          {!user && (<div>
            <Link to='/vote'>Polls</Link>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Signup</Link>
          </div>)}
        </nav>
      </div>
    </header>
  )
}

export default Navbar