import React from 'react'
import PopupForm from './components/PopupForm'
import { useNavigate } from 'react-router-dom'
import { handleSuccess,handleError } from './utils/Toasts'
import SpotlightCard from './ui-components/SpotlightCard'
import { useState,useEffect ,useRef} from 'react'
import SplitText from './ui-components/SplitText'
import DotGrid from './ui-components/DotGrid'
import Lottie from 'lottie-react';
import Person from './assets/Login.json'
import Footer from './footer'
import { X } from 'lucide-react'



function Home ()  {
    const navigate = useNavigate()
    const [curr_user, setCurrUser] = useState({
      name:"",
      email:"",
      user_id:""
    })
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);
    const [showSetting,setShowSettings]=useState(false)
    const popupRef = useRef(null);
    const settingRef = useRef(null);
    const user_email=curr_user.email;
    
    

    useEffect(() => {
    const user = localStorage.getItem('user')
    // console.log(user)
    if (user) {
      setCurrUser(JSON.parse(user))

    } else {
      navigate('/')
    }
  }, [navigate]);
    useEffect(() => {
    const handleClickOutside = (e) => {
      if (showLogoutPopup && popupRef.current && !popupRef.current.contains(e.target)) {
        setShowLogoutPopup(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showLogoutPopup]);

    const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    handleSuccess('Logged out successfully');
    setCurrUser(null);
    setTimeout(() => {
      navigate('/landing')
    },1000)
  };
  // handle data
  const [showPopup, setShowPopup] = useState(false);
  const [formType, setFormType] = useState("");
    const handleAddClick = (type) => {
    setFormType(type);
    setShowPopup(true);
  };
  


  return (
    <>
      {/* logout popup */}
      <div className={`Logout fixed inset-0 z-20  flex items-center back-drop bg-white  justify-center ${showLogoutPopup ? 'flex' : 'hidden'}`}>
        <div    ref={popupRef} className="logout-popout bg-white h-1/4 w-full lg:w-1/4 lg:m-50 rounded m-2 back-drop text-white flex flex-col item-center justify-center ">
          <div className="alert text-2xl mt-3 flex item-center justify-center p-2"> Do you want to Logout?</div>
            <div className="options flex flex-row item-center justify-center">
              <div onClick={() => setShowLogoutPopup(false)} className="cursor-pointer ">
                <SpotlightCard className="custom-spotlight-card h-1  text-lg cursor-pointer m-2  flex justify-center items-center " spotlightColor="rgba(173, 30, 154, 0.38)"
                >
                  Cancel
                </SpotlightCard>
              </div>
              <div onClick={handleLogout} className="cursor-pointer ">
                <SpotlightCard className="custom-spotlight-card h-1 text-lg cursor-pointer m-1 bg-red-600 flex justify-center items-center " spotlightColor="rgba(173, 30, 154, 0.38)"
                onClick={handleLogout}>
                  Logout
                </SpotlightCard>
              </div>
          </div>
        </div>
      </div>
    
      {/* bg */}
      <div style={{ width: '100%', height: '100vh', position: 'fixed' }} className="DotGrid z-1 fixed bg-black ">
        <DotGrid
          dotSize={5}
          gap={20}
          baseColor="#1a162cff"
          activeColor="#5227FF"
          proximity={140}
          shockRadius={330}
          shockStrength={12}
          resistance={400}
          returnDuration={1.5}
            />
      </div>
      {/* navbar */}
      <div className="nav-container  flex justify-center items-center top-0 mt-9 w-full  fixed z-11   ">
        <SpotlightCard className="navbar fixed text-xl text-black bg-gray-700 h-20 w-full sm:w-full sm:px-5  lg:w-3/4 lg:px-10 lg:rounded flex gap-10 justify-between items-center m-0" spotlightColor="rgba(88, 10, 161, 0.74)">
          <div className="navbar-start  font-bold">
            <a className="btn btn-ghost  normal-case text-2xl text-white hover:text-purple-300 transition ease-out duration-500" href="/landing" >
              SecureVault
            </a>
          </div>
          <div className="navbar-center hidden lg:flex flex-row w-full justify-end  items-center">
            <ul className="menu menu-horizontal flex gap-10 p-0">
              <li><a href="/my_vault">Go to Vault</a></li>
                
            </ul>
          </div>
          <div className="navbar-end cursor-pointer   " >
          <a  onClick={() => setShowLogoutPopup(true)} >
            <SpotlightCard className="custom-spotlight-card h-3 m-0 flex justify-center items-center " spotlightColor="rgba(247, 6, 6, 0.38)">
            Logout
            </SpotlightCard>
            </a>
          </div>
        </SpotlightCard>
      </div>
      \

      <div className="maincontainer scroll-smooth h-screen min-h-screen   flex items-center  flex-col   " >
        <div className=" section1  text-white  h-20 lg:h-60 w-full flex flex-col items-center justify-end  lg:mt-5 z-10 mt-20 ">
        <h1 className="text-xl font-bold lg:mb-4 z-10">
          <SplitText
            text={`Welcome ${curr_user.name}`}
            className="text-5xl font-semibold text-center"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            
          />

          </h1>
          <p className="text-xl hidden lg:mb-6 px-2 sm:flex z-10">Your secure place for passwords, links, and notes.</p>
        </div>
      
        <div className="section2-conatiner  z-10 grid grid-col-1 lg:grid-cols-2 mt-1 h-80 gap-1 lg:gap-20 w-full  md:grid grid-col-2 ">
          <div className="quik-action  w-full h-70  p-5 flex flex-col gap-3 lg:gap-4 m-1 lg:items-end items-center justify-end  z-10 mt-1 lg:mt-15" >
            <SpotlightCard  className="custom-spotlight-card h-full lg:w-1/2 w-2/3 flex text-center justify-center items-center mt-1 p-2" spotlightColor="rgba(36, 12, 255, 0.38)">
              <a onClick={() => handleAddClick("password")} href="#add" className="text-white text-2xl">Add Password</a>
            </SpotlightCard>
            <SpotlightCard className="custom-spotlight-card h-full lg:w-1/2 w-2/3  flex text-center justify-center items-center mt-1 p-1  " spotlightColor="rgba(36, 12, 255, 0.38)">
              <a  onClick={() => handleAddClick("link")}href="#vault" className="text-white text-2xl">Add Link</a>
            </SpotlightCard>
            <SpotlightCard className="custom-spotlight-card h-full lg:w-1/2 w-2/3  flex text-center justify-center items-center mt-1 p-1" spotlightColor="rgba(36, 12, 255, 0.38)">
              <a onClick={() => handleAddClick("note")} href="#settings" className="text-white text-2xl">Add Notes</a>
            </SpotlightCard>
          </div>
          <div className="content  w-full grid grid-col-1 lg:grid-cols-[1fr_2fr] m-0 justify-center h-50  ">
            <div className="section1 z-8 flex flex-col justify-center lg:items-end items-center   ">
              <div className="person-conatiner h-50 w-50   lg:h-100 lg:w-100  m-1  z-8">
                <Lottie animationData={Person} loop={true} />
              </div>
              <SpotlightCard className="custom-spotlight-card h-1/6 lg:w-3/4 w-full   flex justify-center items-center lg:hidden  " spotlightColor="rgba(12, 198, 255, 0.45)">
                <a href="/my_vault" className="text-white text-2xl ">Go to Vault</a>
              </SpotlightCard>
              
              
            </div>
            
          </div>
        </div>
      </div>
      {showPopup && (
        <PopupForm
          type={formType}
          onClose={() => setShowPopup(false)}
          userid={curr_user.user_id}
          
        />
      )}
      <Footer/>     
    
    
   
    
    </>
    
  )
}

export default Home

