import './App.css'
import { useState, useEffect } from 'react'
import Carousel from './components/CustomLogic'
import GsapComponent from './components/GsapSpinningTool'
import TailwindCarousel from './components/TailwindCarousel'
import VerticalCarousel from './components/VerticalCarousel'

function App() {
  const [isMobile, setIsMobile] = useState(false);

  // Function to check the screen size
  const checkIfMobile = () => {
    const isMobileDevice = window.innerWidth <= 768; // You can adjust the width limit if necessary
    setIsMobile(isMobileDevice);
  };

  useEffect(() => {
    // Initial check
    checkIfMobile();

    // Add a resize listener to update on window resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup the listener when component unmounts
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <>
      {isMobile ? (
        // Render the carousel or other mobile components
        <TailwindCarousel />
      ) : (
        // Message for desktop users
        <div className="desktop-warning">
          <h1>This app is only available on mobile devices.</h1>
          <p>Please open this application on a mobile device to use it.</p>
        </div>
      )}
    </>
  )
}

export default App;
