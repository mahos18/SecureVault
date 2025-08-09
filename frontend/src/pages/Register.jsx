import React from 'react'
import { useState } from 'react'
import { handleError,handleSuccess } from './utils/Toasts';
import { useNavigate } from 'react-router-dom';
import DarkVeil from './components/DarkVeil';
import { useApi } from '@/context/ApiContext';
import { Link } from "react-router-dom";


const Register = () => {
  
  const [userinfo, setUserinfo] =useState({
    name: '',
    email: '',
    password: ''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserinfo({
      ...userinfo,
      [name]: value
    });


  };
const navigate= useNavigate();
const { backend_url } = useApi();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = userinfo;
    if (!name || !email || !password) {
      return handleError('Please fill all the fields');
    
    }
    try{
      const url= backend_url+'/auth/register';
      const response= await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userinfo)
    });
    const result = await response.json();
    const { message, success } = result;

    if (success) {
      handleSuccess(message);
      setTimeout(() => {
        navigate('/login');
      },2000);
      
    }
    else{
        handleError(message);
        
    }
   if (response.status === 400) {
      if(Array.isArray(message)) {
        message.forEach(msg => handleError(msg));
      }
      
      

    }
        
    }catch(err){{
        handleError(err)

    }
  }


  };


  return (
    <>
      
      <div className='login-container  min-h-screen flex items-center justify-center w-full bg-black '>
        <div  className='Darkveli-bg'style={{ width: '100%', height: '800px', position: 'fixed' }}>
          <DarkVeil
          hueShift={333}
          warpAmount={5} />
        </div>
        <div className='login-form bg-white p-8 rounded shadow-md  max-w-sm smll:w-450 m-4 flex flex-col items-center'>
          <h2 className='text-3xl font-bold mb-6 text-center text-white'>Register</h2>
          <form  onSubmit={handleSubmit}> 
            <div className=' mb-8  flex flex-col gap-2'> 
              <label className='block text-white m-1 text-xl' htmlFor='username'>Name</label>
              <input  autoFocus onChange={handleChange} className='w-full p-2 border border-purple-300 text-white rounded' name='name' type='text' id='name' placeholder='Enter your Name' />
              
              <label className='block text-white m-1 text-xl' htmlFor='email'>Email</label>
              <input onChange={handleChange} className='w-full p-2 border border-purple-300 text-white rounded'  name='email' type='email' id='email' placeholder='Enter your email' />
              <label className='block text-white m-1 text-xl' htmlFor='password'>Password</label>
              <input onChange={handleChange} className='w-full p-2 border border-purple-300  text-white rounded'  name='password' type='password' id='password' placeholder='Enter your password' /> 
            <button className=' mt-2 w-60 bg-purple-700 text-white p-2 m-2 rounded hover:bg-purple-600 transition duration-200' type='submit'>Register</button>
            <p className='mt-1 text-center text-white'>Already Have Account <Link to='/login' className='text-purple-400 hover:underline'>Login</Link></p>
            
             
            </div>
               
          </form>    
        </div> 
      </div>
    </>
  )
}

export default Register
