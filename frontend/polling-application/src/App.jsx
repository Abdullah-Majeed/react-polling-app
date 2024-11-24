import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useAuthContext } from './context/AuthContext'
import VotePolling from './pages/VotePolling'

const App = () => {
  const { user } = useAuthContext();
  return (
    <div className='App'>
      {/* ROUTES  */}
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            {/* HOME */}
            <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
            {/* LOGIN */}
            <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
            {/* SIGNUP */}
            <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
            {/* ANONYMOUS VOTING */}
            <Route path='/vote' element={!user ? <VotePolling /> : <Navigate to='/' />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
