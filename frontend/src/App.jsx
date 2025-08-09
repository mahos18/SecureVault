import { useState } from 'react'

import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RefreshHandler from './pages/utils/RefreshHandler'
import Landing from './pages/Landing'
import MyVault from './pages/MyVault'
// import {LoginForm} from './components/login-form'

function App() {
 const [isAuthenticated, setIsAuthenticated] = useState(false);
 const PrivateRoute=({element}) => {
   return isAuthenticated ? element : <Navigate to="/login" />;
 }

  return (
    <>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/" element={<Navigate to="/landing"/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/home" element={<PrivateRoute element={<Home/>}/>} />
        <Route path="/my_vault" element={<MyVault/>} />

      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
