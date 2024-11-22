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
        <Link to="/">
          <h1>Polling Application</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={logout}>Logout</button>
            </div>
          )}
          {!user && (<div>
            <Link to='/vote'>Voting polls</Link>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Signup</Link>
          </div>)}
        </nav>
      </div>
    </header>
  )
}

export default Navbar