"use client";
import { animate, motion } from "framer-motion";
import { useState, useEffect } from "react";
import useSound from "use-sound";

const CoinDistribution = () => {
  const [replayKey, setReplayKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const [playCoinDrop] = useSound("/sounds/coin-drop.mp3", {
    volume: 0.5,
  });

  const animatedBox = {
    width: 30,
    height: 30,
    backgroundColor: "#ff0088",
    borderRadius: 50,
    position: "absolute",
    left: 0,
    top: 0,
  };

  const roundTripDuration = 4.5; // seconds
  const roundTripTimes = [0, 0.05, 0.95, 1];

  const coinsArr = [
    {
      animate: {
        x: [0, 20, 20, 0],
        y: [0, 180, 180, 0],
        opacity: [0, 1, 1, 0],
      },
    },
    {
      animate: {
        x: [0, 50, 50, 0],
        y: [0, 200, 200, 0],
        opacity: [0, 1, 1, 0],
      },
    },
    {
      animate: {
        x: [0, 90, 90, 0],
        y: [0, 140, 140, 0],
        opacity: [0, 1, 1, 0],
      },
    },
    {
      animate: {
        x: [0, 120, 120, 0],
        y: [0, 40, 40, 0],
        opacity: [0, 1, 1, 0],
      },
    },
    {
      animate: {
        x: [0, 190, 190, 0],
        y: [0, 50, 50, 0],
        opacity: [0, 1, 1, 0],
      },
    },
    {
      animate: {
        x: [0, 230, 230, 0],
        y: [0, 10, 10, 0],
        opacity: [0, 1, 1, 0],
      },
    },
    {
      animate: {
        x: [0, 270, 270, 0],
        y: [0, 20, 20, 0],
        opacity: [0, 1, 1, 0],
      },
    },
    {
      animate: {
        x: [0, 320, 320, 0],
        y: [0, 22, 22, 0],
        opacity: [0, 1, 1, 0],
      },
    },
    {
      animate: {
        x: [0, 360, 360, 0],
        y: [0, 120, 120, 0],
        opacity: [0, 1, 1, 0],
      },
    },
    {
      animate: {
        x: [0, 380, 380, 0],
        y: [0, 80, 80, 0],
        opacity: [0, 1, 1, 0],
      },
    },
    {
      animate: {
        x: [0, 280, 280, 0],
        y: [0, 180, 180, 0],
        opacity: [0, 1, 1, 0],
      },
    },
    {
      animate: {
        x: [0, 320, 320, 0],
        y: [0, 220, 220, 0],
        opacity: [0, 1, 1, 0],
      },
    },
    {
      animate: {
        x: [0, 260, 260, 0],
        y: [0, 220, 220, 0],
        opacity: [0, 1, 1, 0],
      },
    },
    {
      animate: {
        x: [0, 200, 200, 0],
        y: [0, 180, 180, 0],
        opacity: [0, 1, 1, 0],
      },
    },
  ];


  return (
    <div className="max-w-md w-full bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl p-8 border-2 border-yellow-400 shadow-lg hover:shadow-xl transition-all duration-300  relative overflow-hidden">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">HEAD</h2>
        <div className="text-6xl mb-4">👑</div>
        <div className="text-2xl font-bold text-gray-800 mb-2">1:0.7</div>
        <div className="flex justify-end">
          <span className="text-yellow-500 text-2xl">⚡</span>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <motion.button
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.1 },
          }}
          whileTap={{ scale: 0.8 }}
          className={`px-4 py-2 rounded-md bg-yellow-500 text-white font-semibold shadow ${
            isPlaying ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-600"
          }`}
          disabled={isPlaying}
          onClick={() => {
            setIsPlaying(true);
            setReplayKey(Date.now());
          }}
        >
          Show again
        </motion.button>
      </div>

      {/* Animated boxes */}
      <div key={replayKey} className="absolute inset-0 pointer-events-none">
        {coinsArr.map(({ animate }, index) => (
          <motion.div
            key={index}
            style={animatedBox}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={animate}
            transition={{
              duration: roundTripDuration,
              times: roundTripTimes,  // to take control on phase of animation
              ease: "linear",
              delay: 0.1 + Math.random() * 0.5,
            }}
            onAnimationStart={() => {
              // Play coin drop sound when animation starts (coin moving down)
              setTimeout(() => playCoinDrop(), 200);
            }}
            onAnimationComplete={() => {
              if (coinsArr.length - 1 === index) {
                setIsPlaying(false);
              }
            }}
            onUpdate={(latest) => {
              // Play coin return sound when coin starts moving back up
              if (latest.y === 180 && latest.x === 20) {
                setTimeout(() => playCoinDrop(), 100);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CoinDistribution;
