"use client";
import { motion } from "framer-motion";

const HeadShow = () => {
  const animatedBox = {
    width: 30,
    height: 30,
    backgroundColor: "#ff0088",
    borderRadius: 50,
  };

  return (
    <div className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl p-8 border-2 border-yellow-400 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">HEAD</h2>
        <div className="text-6xl mb-4">👑</div>
        <div className="text-2xl font-bold text-gray-800 mb-2">1:0.7</div>
        <div className="flex justify-end">
          <span className="text-yellow-500 text-2xl">⚡</span>
        </div>
      </div>

      {/* Animated boxes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={animatedBox}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: [0, 20],
            y: [0, 180],
            opacity: [0, 1],
          }}
          transition={{
            duration: 1,
            ease: "anticipate",
            delay: 0.2,
          }}
        />
        <motion.div
          style={animatedBox}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: [0, 50],
            y: [0, 200],
            opacity: [0, 1],
          }}
          transition={{
            duration: 1,
            ease: "backIn",
            delay: 0.4,
          }}
        />
        <motion.div
          style={animatedBox}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: [0, 90],
            y: [0, 140],
            opacity: [0, 1],
          }}
          transition={{
            duration: 1,
            ease: "backInOut",
            delay: 0.6,
          }}
        />

        <motion.div
          style={animatedBox}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: [0, 120],
            y: [0, 40],
            opacity: [0, 1],
          }}
          transition={{
            duration: 1,
            ease: "circIn",
            delay: 0.8,
          }}
        />

        <motion.div
          style={animatedBox}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: [0, 190],
            y: [0, 50],
            opacity: [0, 1],
          }}
          transition={{
            duration: 1,
            ease: "circInOut",
            delay: 1.0,
          }}
        />

        <motion.div
          style={animatedBox}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: [0, 230],
            y: [0, 10],
            opacity: [0, 1],
          }}
          transition={{
            duration: 1,
            ease: "easeIn",
            delay: 1.2,
          }}
        />

        <motion.div
          style={animatedBox}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: [0, 270],
            y: [0, 20],
            opacity: [0, 1],
          }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            delay: 1.4,
          }}
        />

        <motion.div
          style={animatedBox}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: [0, 320],
            y: [0, 22],
            opacity: [0, 1],
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
            delay: 1.6,
          }}
        />

        <motion.div
          style={animatedBox}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: [0, 380],
            y: [0, -100],
            opacity: [0, 1],
          }}
          transition={{
            duration: 1,
            ease: "linear",
            delay: 1.4,
          }}
        />
      </div>
    </div>
  );
};

export default HeadShow;
