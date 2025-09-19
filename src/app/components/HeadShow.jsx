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
      <div className="absolute inset-0 flex justify-center items-start pt-4 gap-1 pointer-events-none">
        <motion.div
          style={animatedBox}
          animate={{
            y: [0, 200],
          }}
          transition={{
            duration: 1,
            ease: "anticipate",
            // repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          style={animatedBox}
          animate={{
            y: [0, 155],
          }}
          transition={{
            duration: 1,
            ease: "backIn",
            // repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          style={animatedBox}
          animate={{
            y: [0, 200],
          }}
          transition={{
            duration: 1,
            ease: "backInOut",
            // repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          style={animatedBox}
          animate={{
            y: [0, 130],
          }}
          transition={{
            duration: 1,
            ease: "circIn",
            // repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          style={animatedBox}
          animate={{
            y: [0, 190],
          }}
          transition={{
            duration: 1,
            ease: "circInOut",
            // repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          style={animatedBox}
          animate={{
            y: [0, 150],
          }}
          transition={{
            duration: 1,
            ease: "easeIn",
            // repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          style={animatedBox}
          animate={{
            y: [0, 200],
          }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            // repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          style={animatedBox}
          animate={{
            y: [0, 160],
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
            // repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          style={animatedBox}
          animate={{
            y: [0, 180],
          }}
          transition={{
            duration: 1,
            ease: "linear",
            // repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>
    </div>
  );
};

export default HeadShow;
