import React from 'react'
import SpotlightCard from '../ui-components/SpotlightCard';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {

  const [buttonText, setButtonText] = useState("Register");
  const [route, setNav] = useState("/register");

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setButtonText("Dashboard");
      setNav("/Home");
    } else {
      setButtonText("Register");
      setNav("/register");
    }
  }, []);

  return (
    <>
      <div className="nav-container  flex justify-center items-center top-5    my-5 w-full  fixed z-10   ">
         <SpotlightCard className="navbar fixed text-xl text-black bg-gray-700 h-20 w-full sm:w-full sm:px-5  lg:w-3/4 lg:px-10 lg:rounded flex gap-10 justify-between items-center m-0" spotlightColor="rgba(88, 10, 161, 0.38)">
          <div className="navbar-start  font-bold">
            <a className="btn btn-ghost  normal-case text-2xl text-white hover:text-purple-300 transition ease-out duration-500" href="#section-1" >
              SecureVault

            </a>
          </div>
          <div className="navbar-center hidden w-full lg:flex flex-row  justify-end items-center   ">
            <ul className="menu menu-horizontal flex gap-10 p-0">
              <li><a href="#section-2">About</a></li>
              
            </ul>
          </div>
          <div className="navbar-end cursor-pointer   "  >
          <Link to={route} >
           
            <SpotlightCard className="custom-spotlight-card h-3 m-0 flex justify-center items-center  " spotlightColor="rgba(173, 30, 154, 0.83)">
             {buttonText}
            </SpotlightCard>
           
          </Link>
          </div>
        </SpotlightCard>

      </div>
      
    </>
  )
}

export default Navbar

