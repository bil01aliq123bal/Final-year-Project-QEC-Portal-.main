import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect after 3 seconds
    const timer = setTimeout(() => {
      navigate("/home"); // Redirect to the home page after the splash screen time
    }, 3000); // Adjust the duration for your desired splash screen time

    return () => clearTimeout(timer); // Clean up the timer
  }, [navigate]);

  return (
    <motion.div
      className="flex justify-center items-center h-screen"
      initial={{ backgroundColor: "#D1C4E9" }} // Initial background color (light purple)
      animate={{ backgroundColor: "#AB8BFF" }} // Final background color (darker purple)
      transition={{ duration: 3 }} // Duration for the background color change
    >
      {/* Logo Animation */}
      <motion.img
        src="/Images/qecSplash.png"
        alt="qec"
        className="w-24 sm:w-32 h-auto"
        initial={{ opacity: 0, scale: 0.5, y: -50 }} // Start with opacity 0, smaller scale, and position slightly above
        animate={{
          opacity: 1,  // Final opacity
          scale: 1,    // Final scale (normal size)
          y: 0,        // Final position (centered vertically)
        }}
        transition={{
          duration: 1,  // Animation duration for logo
          ease: "easeOut",  // Animation easing for logo
        }}
      />
    </motion.div>
  );
};

export default SplashScreen;
