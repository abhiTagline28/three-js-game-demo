"use client";
import { motion } from "framer-motion";

const FramerExample = () => {
  const box = {
    width: 50,
    height: 50,
    backgroundColor: "#ff0088",
    borderRadius: 5,
  };

  return (
    <div style={container}>
      <motion.div
        style={box}
        animate={{
          y: [0, 300], // Move from top (0) to bottom (300px)
        }}
        transition={{
          duration: 1, // 1 second duration
          ease: "easeInOut", // Smooth easing
          // repeat: 0, // Repeat infinitely
          repeat: Infinity, // Repeat infinitely
          repeatType: "reverse", // Reverse the animation (go back up)
          // repeatType: "reverse", // Reverse the animation (go back up)
        }}
      />
      <motion.div
        style={box}
        animate={{
          y: [0, 300],
        }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          // repeat: 0,
          repeat: Infinity, // Repeat infinitely
          repeatType: "loop",
        }}
      />
      <motion.div
        style={box}
        animate={{
          y: [0, 300],
        }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          // repeat: 0,
          repeat: Infinity, // Repeat infinitely
          repeatType: "mirror",
        }}
      />
    </div>
  );
};

export default FramerExample;

const container = {
  position: "relative",
  width: "400px",
  height: "400px",
  backgroundColor: "#1a1a2e", // Dark background to match the image description
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start", // Start from top
  paddingTop: "20px", // Small padding from the very top
  borderRadius: "10px",
  border: "2px solid rgba(255, 0, 136, 0.3)",
  boxShadow: "0 0 20px rgba(255, 0, 136, 0.2)",
};
