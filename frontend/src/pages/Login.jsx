import React from 'react'
import { useState } from 'react'
import { handleError, handleSuccess } from './utils/Toasts';
import { useNavigate } from 'react-router-dom';
import DarkVeil from './components/DarkVeil';


const Login = () => {

  const [Logininfo, setLogininfo] =useState({
    email: '',
    password: ''
  });
  const [isForgotPasswordMode, setIsForgotPasswordMode] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogininfo({
      ...Logininfo,
      [name]: value
    });


  };
  const navigate= useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = Logininfo;
    if (!email || !password) {
      return handleError('Please fill all the fields');
    
    }
    try{
      const url= 'http://localhost:8080/auth/login';
      const response= await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Logininfo)
      });
      const result = await response.json();
      const { message, success,token,user } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('user', JSON.stringify(user));
        setTimeout(() => {
          navigate('/home');
        },2000);
        
        }
        else{
            handleError(message);
            
        }
      }catch(err){{
          handleError(err)

        }
    }

  };

    const handleSendResetEmail = async (e) => {
    e.preventDefault();
    const { email } = Logininfo;

    if (!email) return handleError('Please enter your email.');

    try {
      const response = await fetch('http://localhost:8080/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const result = await response.json();
      const { message, success } = result;

      if (success) {
        handleSuccess(message || 'Reset email sent!');
        resetForm();
        setIsForgotPasswordMode(false);
      } else {
        handleError(message || 'Email not found');
        resetForm();
      }
    } catch (err) {
      handleError('Failed to send reset email.');
      resetForm();
    }
  };
  const resetForm = () => {
    setLogininfo({ email: '', password: '' });
  };




  return (
    <>
      
      <div className='login-container  min-h-screen flex items-center justify-center w-full bg-black '>
        <div  className='Darkveli-bg'style={{ width: '100%', height: '800px', position: 'fixed' }}>
          <DarkVeil
          hueShift={333}
          warpAmount={5} />
        </div>
        <div className='login-form  p-8 rounded shadow-md  max-w-sm smll:w-450 m-4 flex flex-col items-center'>
          <h2 className='text-3xl font-bold mb-2 text-center text-white'>Login</h2>
          <form onSubmit={isForgotPasswordMode ? handleSendResetEmail : handleLoginSubmit}> 
            <div className=' mb-8  flex flex-col gap-2'> 
              <label  autoFocus className='block text-white  text-xl' htmlFor='email'>Email</label>
              <input autoFocus onChange={handleChange} className='w-full p-2 border border-purple-300 text-white rounded' type='email' name="email"id='email' placeholder='Enter your email' />

              {!isForgotPasswordMode && (
              <>
              <label className='block text-white m-2 text-xl' htmlFor='password'>Password</label>
              <input onChange={handleChange} className='w-full p-2 border border-purple-300  text-white rounded' type='password' name="password"id='password' placeholder='Enter your password' /> 
              </>)}
            
            <button className='w-60 bg-purple-700 text-white p-2 m-2 rounded hover:bg-purple-600 transition duration-200' type='submit'> {isForgotPasswordMode ? 'Send Reset Email' : 'Login'}</button>
            
              {/* {!isForgotPasswordMode && (
              <p className='mt-2 text-center text-purple-300 cursor-pointer hover:underline hover:text-purple-400' onClick={() => {
                
                setIsForgotPasswordMode(true);
              }}>
                Forgot Password? Click Here
              </p>
            )} */}

            {isForgotPasswordMode && (
              <p className='mt-2 text-center text-purple-300 cursor-pointer hover:underline' onClick={() => {
                resetForm();
                setIsForgotPasswordMode(false);
              }}>
                Back to Login
              </p>
            )}

            {!isForgotPasswordMode && (
              <p className='mt-2 text-center text-purple-300'>
                Don't have an account? <a href='/register' className='text-purple-400 hover:underline'>Register</a>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
    
    </>
  )
}

export default Login
