"use client";
import { motion } from "framer-motion";

const HeadShow1 = () => {
  const animatedBox = {
    width: 30,
    height: 30,
    backgroundColor: "#ff0088",
    borderRadius: 50,
    position: "absolute",
    left: 0,
    top: 0,
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
          animate={{ x: 20, y: 180, opacity: 1 }}
          transition={{
            type: "tween",
            duration: 1,
            ease: "linear",
            delay: 0.2,
          }}
        />
        <motion.div
          style={animatedBox}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ x: 50, y: 200, opacity: 1 }}
          transition={{
            type: "tween",
            duration: 1,
            ease: "linear",
            delay: 0.4,
          }}
        />

        <motion.div
          style={animatedBox}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ x: 90, y: 140, opacity: 1 }}
          transition={{
            type: "tween",
            duration: 1,
            ease: "linear",
            delay: 0.6,
          }}
        />

        <motion.div
          style={animatedBox}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ x: 120, y: 40, opacity: 1 }}
          transition={{
            type: "tween",
            duration: 1,
            ease: "linear",
            delay: 0.8,
          }}
        />

        <motion.div
          style={animatedBox}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ x: 190, y: 50, opacity: 1 }}
          transition={{
            type: "tween",
            duration: 1,
            ease: "linear",
            delay: 1.0,
          }}
        />

        <motion.div
          style={animatedBox}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ x: 230, y: 10, opacity: 1 }}
          transition={{
            type: "tween",
            duration: 1,
            ease: "linear",
            delay: 1.2,
          }}
        />

        <motion.div
          style={animatedBox}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ x: 270, y: 20, opacity: 1 }}
          transition={{
            type: "tween",
            duration: 1,
            ease: "linear",
            delay: 1.4,
          }}
        />

        <motion.div
          style={animatedBox}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ x: 320, y: 22, opacity: 1 }}
          transition={{
            type: "tween",
            duration: 1,
            ease: "linear",
            delay: 1.6,
          }}
        />

        <motion.div
          style={animatedBox}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ x: 360, y: 120, opacity: 1 }}
          transition={{
            type: "tween",
            duration: 1,
            ease: "linear",
            delay: 1.4,
          }}
        />

        <motion.div
          style={animatedBox}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ x: 380, y: 80, opacity: 1 }}
          transition={{
            type: "tween",
            duration: 1,
            ease: "linear",
            delay: 1.4,
          }}
        />

        <motion.div
          style={animatedBox}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ x: 280, y: 180, opacity: 1 }}
          transition={{
            type: "tween",
            duration: 1,
            ease: "linear",
            delay: 1.4,
          }}
        />
        <motion.div
          style={animatedBox}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ x: 320, y: 220, opacity: 1 }}
          transition={{
            type: "tween",
            duration: 1,
            ease: "linear",
            delay: 1.4,
          }}
        />
        <motion.div
          style={animatedBox}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ x: 260, y: 220, opacity: 1 }}
          transition={{
            type: "tween",
            duration: 1,
            ease: "linear",
            delay: 1.4,
          }}
        />
        <motion.div
          style={animatedBox}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ x: 200, y: 180, opacity: 1 }}
          transition={{
            type: "tween",
            duration: 1,
            ease: "linear",
            delay: 1.4,
          }}
        />
      </div>
    </div>
  );
};

export default HeadShow1;
