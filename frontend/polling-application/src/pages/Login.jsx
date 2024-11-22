import React, { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <form className='login'>
      <h3>Login</h3>
      <label>Email address:</label>
      <input type='email' onChange={(e) => setEmail(e.target.value)} value={email} />
      <label>Password:</label>
      <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} />
      <button>Login</button>
    </form>
  )
}

export default Login