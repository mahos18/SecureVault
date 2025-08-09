import React from 'react'
import Beams from './components/Beams'
import ScrambledText from './ui-components/ScrambledText'
import Navbar from './components/Navbar'
import DecryptedText from './ui-components/DecryptedText'
import SpotlightCard from './ui-components/SpotlightCard'
import Section2 from './Section2'
import Footer from './Footer'




export default function Landing() {
  return (
    <>

        <Navbar />
        <div style={{ width: '100%', height: '100vh', position: 'fixed' }}  className="landing-beams z-8">
            <Beams
                beamWidth={3}
                beamHeight={30}
                beamNumber={10}
                lightColor="#CB24F9"
                speed={2}
                noiseIntensity={1.75}
                scale={0.2}
                rotation={30}
                color='#CB24F9'
                
            />
        </div> 
        <div className="section-1 scroll-smooth h-140 lg:h-screen    flex items-center justify-between flex-col lg:my-5 mt-30   " id="section-1">
            <div className="section-2-content text-center flex w-full flex-col  items-center text-white">
                {/* <h1 className="text-5xl font-bold">Secure Your Digital Life in One Place</h1> */}
                <DecryptedText
                    text="Secure Your Digital Life in One Place"
                    speed={70}
                    maxIterations={10}
                    useOriginalCharsOnly={true}
                    className="revealed text-5xl font-bold"
                    sequential={true}
                    encryptedClassName="encrypted text-5xl font-bold"
                    animateOn="view"
                    revealDirection="start"
                    />
                <ScrambledText
                className="scrambled-text-demo hidden lg:flex text-center text-3xl my-10"
                radius={100}
                duration={1.2}
                speed={0.5}
                scrambleChars={".:"}
                >
                <p className="pt-6 text-2xl flex ">Store passwords, links, and notes — safely and seamlessly.</p>
                <p className="pt-1  hidden text-xl text-gray-200 lg:block">No more forgotten credentials or scattered notes.</p>
                </ScrambledText>
               <a href="/login"className="text-white text-lg font-semibold mt-10 lg:mt-1">
                <SpotlightCard className="custom-spotlight-card h-6 w-40 m-0 flex justify-center items-center " spotlightColor="rgba(173, 30, 154, 0.38)">
                    Get Started
                </SpotlightCard>
                </a>
                
            </div>
        </div> 
        <Section2 />
        <Footer/>
        
       
        
    
    </>
  )
}
