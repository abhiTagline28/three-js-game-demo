"use client";
import { motion } from "framer-motion";

const HeadShow2 = () => {
  const animatedBox = {
    width: 30,
    height: 30,
    backgroundColor: "#ff0088",
    borderRadius: 50,
    position: "absolute",
    left: 0,
    top: 0,
  };

  // 1s go → 5s wait → 1s return
  const roundTripDuration = 7; // seconds
  const roundTripTimes = [0, 1 / 7, 6 / 7, 1];

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
            x: [0, 20, 20, 0],
            y: [0, 180, 180, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: roundTripDuration,
            times: roundTripTimes,
            ease: "linear",
            delay: 0.2,
          }}
        />
        <motion.div
          style={animatedBox}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: [0, 50, 50, 0],
            y: [0, 200, 200, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: roundTripDuration,
            times: roundTripTimes,
            ease: "linear",
            delay: 0.4,
          }}
        />

        <motion.div
          style={animatedBox}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: [0, 90, 90, 0],
            y: [0, 140, 140, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: roundTripDuration,
            times: roundTripTimes,
            ease: "linear",
            delay: 0.6,
          }}
        />

        <motion.div
          style={animatedBox}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: [0, 120, 120, 0],
            y: [0, 40, 40, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: roundTripDuration,
            times: roundTripTimes,
            ease: "linear",
            delay: 0.8,
          }}
        />

        <motion.div
          style={animatedBox}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: [0, 190, 190, 0],
            y: [0, 50, 50, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: roundTripDuration,
            times: roundTripTimes,
            ease: "linear",
            delay: 1.0,
          }}
        />

        <motion.div
          style={animatedBox}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: [0, 230, 230, 0],
            y: [0, 10, 10, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: roundTripDuration,
            times: roundTripTimes,
            ease: "linear",
            delay: 1.2,
          }}
        />

        <motion.div
          style={animatedBox}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: [0, 270, 270, 0],
            y: [0, 20, 20, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: roundTripDuration,
            times: roundTripTimes,
            ease: "linear",
            delay: 1.4,
          }}
        />

        <motion.div
          style={animatedBox}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: [0, 320, 320, 0],
            y: [0, 22, 22, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: roundTripDuration,
            times: roundTripTimes,
            ease: "linear",
            delay: 1.6,
          }}
        />

        <motion.div
          style={animatedBox}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: [0, 360, 360, 0],
            y: [0, 120, 120, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: roundTripDuration,
            times: roundTripTimes,
            ease: "linear",
            delay: 1.4,
          }}
        />

        <motion.div
          style={animatedBox}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: [0, 380, 380, 0],
            y: [0, 80, 80, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: roundTripDuration,
            times: roundTripTimes,
            ease: "linear",
            delay: 1.4,
          }}
        />

        <motion.div
          style={animatedBox}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: [0, 280, 280, 0],
            y: [0, 180, 180, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: roundTripDuration,
            times: roundTripTimes,
            ease: "linear",
            delay: 1.4,
          }}
        />
        <motion.div
          style={animatedBox}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: [0, 320, 320, 0],
            y: [0, 220, 220, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: roundTripDuration,
            times: roundTripTimes,
            ease: "linear",
            delay: 1.4,
          }}
        />
        <motion.div
          style={animatedBox}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: [0, 260, 260, 0],
            y: [0, 220, 220, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: roundTripDuration,
            times: roundTripTimes,
            ease: "linear",
            delay: 1.4,
          }}
        />
        <motion.div
          style={animatedBox}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: [0, 200, 200, 0],
            y: [0, 180, 180, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: roundTripDuration,
            times: roundTripTimes,
            ease: "linear",
            delay: 1.4,
          }}
        />
      </div>
    </div>
  );
};

export default HeadShow2;
