import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import { useLogout } from '../hooks/useLogout';
const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  return (
    <header>
      <div className='container'>
        {/* LOGO */}
        {/* <Link to="/"> */}
          <h1>Polling App</h1>
        {/* </Link> */}
        {/* NAVBAR */}
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={logout}>Logout</button>
            </div>
          )}
          {!user && (<div>
            <NavLink className={({ isActive }) => (isActive ? "active" : "")} to='/vote'>Polls</NavLink>
            <NavLink className={({ isActive }) => (isActive ? "active" : "")} to='/login'>Login</NavLink>
            <NavLink className={({ isActive }) => (isActive ? "active" : "")} to='/signup'>Signup</NavLink>
          </div>)}
        </nav>
      </div>
    </header>
  )
}

export default Navbar