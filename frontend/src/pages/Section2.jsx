import React from 'react'
import PixelTransition from './ui-components/PixelTransition'
import TiltedCard from '@/pages/ui-components/TiltedCard'
import Lottie from 'lottie-react';
import Gif from './assets/gif.json'


function Section2() {
  return (
    <>
    <div className="">
        <div className="section-2  scroll-smooth   min-h-screen  flex items-center justify-center z-9 lg:h-70 " id="section-2">   
            <div className="section-2-content text-center text-white">
                <h2 className="text-4xl  text-white font-bold mb-4">Why Choose SecureVault?</h2>
                <p className="text-xl mb-6">Your all-in-one solution for secure storage and easy access.</p>
                <div className="lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-10 gap-5  lg:m-4 m-1 flex flex-col items-center justify-center">
                    
                        <PixelTransition 
                        firstContent={
                            <>
                            <img
                            src="/assets/png1.png"
                            alt=""
                            style={{ width: "100%", height: "100%", objectFit: "cover"  }}
                            className='rounded-lg shadow-lg border border-gray-300 z-10'
                            />
                            <h1 className='text-white z-11 '> Keep your passwords safe </h1>
                            </>
                        }
                        secondContent={
                            <div
                            style={{
                                width: "100%",
                                height: "100%",
                                display: "grid",
                                placeItems: "center",
                                backgroundColor: "#111"
                            }}
                            >
                            <p style={{ fontWeight: 900, fontSize: "3rem", color: "#ffffff" }}>
                                Secure Credential Storage
                            </p>
                            </div>
                        }
                        gridSize={12}
                        pixelColor='#000'
                        animationStepDuration={0.4}
                        className="custom-pixel-card "
                        />
                   
                        <PixelTransition
                        firstContent={
                            <img
                            src="/assets/png2.png"
                            alt=""
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        }
                        secondContent={
                            <div
                            style={{
                                width: "100%",
                                height: "100%",
                                display: "grid",
                                placeItems: "center",
                                backgroundColor: "#111"
                            }}
                            >
                            <p style={{ fontWeight: 900, fontSize: "3rem", color: "#ffffff" }}>Categorized Vault Display</p>
                            </div>
                        }
                        gridSize={12}
                        pixelColor='#000'
                        animationStepDuration={0.4}
                        className="custom-pixel-card "
                        />
                        <PixelTransition
                        firstContent={
                            <img
                            src="/assets/png3.png"
                            alt=""
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        }
                        secondContent={
                            <div
                            style={{
                                width: "100%",
                                height: "100%",
                                display: "grid",
                                placeItems: "center",
                                backgroundColor: "#111"
                            }}
                            >
                            <p style={{ fontWeight: 900, fontSize: "3rem", color: "#ffffff" }}> Cloud-Synced and User-Specific Data</p>
                            </div>
                        }
                        gridSize={12}
                        pixelColor='#000'
                        animationStepDuration={0.4}
                        className="custom-pixel-card "
                        />
                </div>    
                
            </div>
            
        </div>
        <div className="section-3  scroll-smooth h-screen min-h-screen flex items-center justify-center z-9 lg:top-200vh my-50 lg:my-1 " id="section-2"> 

             <div className="cardximg lg:grid grid-cols-[2fr_1fr] gap-10  items-center justify-center" >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4  h-1/4 ">
                    
            
                    <TiltedCard
                    imageSrc="./assets/whitebg.jpg"
                    altText=""
                    captionText="END TO END ENCRPTION"
                    containerHeight="300px"
                    containerWidth="300px"
                    imageHeight="300px"
                    imageWidth="300px"
                    rotateAmplitude={12}
                    scaleOnHover={1.2}
                    showMobileWarning={false}
                    showTooltip={false}
                    displayOverlayContent={true}
                    overlayContent={
                        
                        <>
                        <h2 className="text-3xl font-bold mb-2 text-black p-4">🛡️ Why End-to-End Encryption?</h2>
                        <p className="text-base text-black p-4 text-xl">
                            Only you can access your data not even we can. No leaks. No breaches.Just total control.
                        </p>
                        </>
                    }
                    />
                    <TiltedCard
                    imageSrc="./assets/whitebg.jpg"
                    altText=""
                    captionText="END TO END ENCRPTION"
                    containerHeight="300px"
                    containerWidth="300px"
                    imageHeight="300px"
                    imageWidth="300px"
                    rotateAmplitude={12}
                    scaleOnHover={1.2}
                    showMobileWarning={false}
                    showTooltip={false}
                    displayOverlayContent={true}
                    overlayContent={
                        
                        <>
                        <h2 className="text-3xl font-bold mb-2 text-black p-4">🔐 Advanced Data Encryption</h2>
                        <p className="text-base text-black p-4 text-xl">
                            Your passwords, links, and notes are secured with AES-256 & RSA encryption, ensuring top-tier protection in storage and transit.
                        </p>
                        </>
                    }
                    />
                </div>
                <div className="person-conatiner h-70 w-70   lg:h-100 lg:w-100  m-1  z-8">
                    <Lottie animationData={Gif} loop={true} />
                </div>
            </div>           
            
                
            </div>
    </div>
        
    </>        
  )
}

export default Section2
