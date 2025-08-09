import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import axios from "axios";
import { useRef } from "react";
import SpotlightCard from './ui-components/SpotlightCard'
import DotGrid from './ui-components/DotGrid'
import Footer from "./Footer";
import { handleSuccess } from "./utils/Toasts";
import { useApi } from "@/context/ApiContext";
import { Link } from "react-router-dom";
import { useCallback } from "react";

export default function MyVault() {
  const [vaultItems, setVaultItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [formType, setFormType] = useState("");
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const popupRef = useRef(null);
  const [deletingIds, setDeletingIds] = useState([]);
  
  

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.user_id;
  const aesKey = user?.aes_key;
  const { backend_url } = useApi();

  useEffect(() => {
    
    if (userId) {
      const url=`${backend_url}/home/${userId}`
      console.log(url)
      axios
        .get(url)
        .then((res) => {
          if (res.data.success) {
            const decrypted = res.data.vault.map((item) => ({
              ...item,
              decryptedData: CryptoJS.AES.decrypt(
                item.encrypted_data,
                aesKey
              ).toString(CryptoJS.enc.Utf8)
            }));
            setVaultItems(decrypted);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [userId, aesKey]);

const handleDelete = async (vaultId) => {
  const confirmed = window.confirm("Delete this item? This cannot be undone.");
  if (!confirmed) return;

  // Trigger animation
  setDeletingIds((prev) => [...prev, vaultId]);

  setTimeout(async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${backend_url}/home/${vaultId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Remove from UI after animation
      setVaultItems((prev) => prev.filter((item) => item._id !== vaultId));
    } catch (err) {
      console.error("delete error:", err);
      const msg = err.response?.data?.message || err.message;
      alert(msg);
    } finally {
      // Clean up deleting state
      setDeletingIds((prev) => prev.filter((id) => id !== vaultId));
    }
  }, 500); // match CSS animation duration
};


const handleLogout = useCallback(() => {
  // Clear stored data
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  handleSuccess("Logged out successfully");
  setCurrUser(null);
  setTimeout(() => {
    navigate("/", { replace: true });
  }, 1000);
}, [navigate, setCurrUser]);
  const [visibleItems, setVisibleItems] = useState({}); 

  const toggleVisibility = (id) => {
    setVisibleItems((prev) => ({
      ...prev,
      [id]: !prev[id] // toggle
    }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        handleSuccess("Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Copy failed", err);
      });
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
      <div className="nav-container  flex justify-center items-center top-0 mt-9 w-full  relative z-11   ">
        <SpotlightCard className="navbar fixed text-xl text-black bg-gray-700 h-20 w-full sm:w-full sm:px-5  lg:w-3/4 lg:px-10 lg:rounded flex gap-10 justify-between items-center m-0" spotlightColor="rgba(88, 10, 161, 0.74)">
          <div className="navbar-start  font-bold">
            <a className="btn btn-ghost  normal-case text-2xl text-white hover:text-purple-300 transition ease-out duration-500" href="/landing" >
              SecureVault
            </a>
          </div>
          <div className="navbar-center hidden lg:flex flex-row w-full justify-end  items-center">
            <ul className="menu menu-horizontal flex gap-10 p-0">
              <li><Link to="/home">Dashboard</Link></li>
                
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




      <div className="p-4 text-white w-full relative min-h-100 flex flex-col items-center  z-10 mt-5">
      <div className="header w-full  flex items-center mb-2 justify-around lg:justify-center">
        <h2 className="text-2xl font-bold mb-4 text-white">My Vault</h2>
        <h2 className="text-2xl font-bold mb-4 text-white flex lg:hidden underline cursor-pointer" href='/home'><a href="/home">Dashboard</a></h2>
        
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 w-3/4">
        
        {vaultItems.map((item) => (
          <SpotlightCard key={item._id}
            className={`p-4 border flex flex-col w-full items-center justify-center rounded back-drop transition-all duration-500 ease-in-out transform ${
              deletingIds.includes(item._id) ? "opacity-0 scale-75" : "opacity-100 scale-100"
            }`}
            spotlightColor="rgba(77, 43, 226, 0.5)">
          
            <h3 className="text-lg font-bold">{item.title}</h3>
            <p className="text-sm">{item.type}</p>

            {/* Show hidden or decrypted data */}
            <p className="mt-2 break-words">
              {visibleItems[item._id] ? item.decryptedData : "••••••••••••••••"}
            </p>

            <div className="flex gap-2 mt-3">
              {/* Toggle decrypt/hide */}
              <button
                onClick={() => toggleVisibility(item._id)}
                className="bg-blue-900 px-3 py-1 rounded"
              >
                {visibleItems[item._id] ? "Hide" : "Decrypt"}
              </button>

              {/* Copy button */}
              {visibleItems[item._id] && (
                <button
                  onClick={() => copyToClipboard(item.decryptedData)}
                  className="back-drop px-3 py-1 rounded"
                >
                  Copy
                </button>
              )}

              {/* Delete button */}
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-900 px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          
          </SpotlightCard>
        ))}
        
      </div>
    </div>
    
    <Footer/>
    </>
    


  );
}
