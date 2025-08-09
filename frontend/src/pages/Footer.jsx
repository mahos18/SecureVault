import React from 'react'

const Footer = () => {
  return (
    <>
        <div className="footer-conatiner  h-50vh w-full z-20">
            <footer className=" footer text-white py-10 px-1 flex flex-col items-center justify-center">
                
                
                    {/* App Description */}
                    <div className='w-full lg:w-1/2'>
                    <h2 className="text-2xl text-center font-bold mb-3">SecureVault</h2>
                    <p className="text-sm text-center leading-relaxed text-gray-300">
                        Your data. Your rules. SecureVault encrypts everything — and only you hold the key. </p>
                    </div>
                    
                

                    
                    <div className="mt-5 text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} SecureVault. All rights reserved.
                    </div>

                

                
            </footer>


        </div>
    
    
    </>
  )
}

export default Footer
