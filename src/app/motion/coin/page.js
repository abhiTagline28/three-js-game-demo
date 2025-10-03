"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import ReusableCoin, { useCoinController, CoinPresets } from "./ReusableCoin";

const CoinDemo = () => {
  // Example 1: Basic usage with ref
  const basicCoinRef = useRef();
  const [basicResult, setBasicResult] = useState(null);

  // Example 2: Multiple coins with controller hook
  const { coinRef: coin1Ref, flipCoin: flipCoin1 } = useCoinController();
  const { coinRef: coin2Ref, flipCoin: flipCoin2 } = useCoinController();
  const [doubleResults, setDoubleResults] = useState([null, null]);

  // Example 3: Preset designs
  const presetRefs = {
    classic: useRef(),
    bitcoin: useRef(),
    dollar: useRef(),
    euro: useRef(),
    custom: useRef(),
  };
  const [presetResults, setPresetResults] = useState({
    classic: null,
    bitcoin: null,
    dollar: null,
    euro: null,
    custom: null,
  });

  // Example 4: Different animation types
  const animationRefs = {
    flip: useRef(),
    spin: useRef(),
    toss: useRef(),
    wobble: useRef(),
  };
  const [animationResults, setAnimationResults] = useState({
    flip: null,
    spin: null,
    toss: null,
    wobble: null,
  });

  // Example 5: Statistics tracking
  const statsRef = useRef();
  const [stats, setStats] = useState({ heads: 0, tails: 0, total: 0 });

  // Flip handlers
  const handleBasicFlip = () => {
    if (basicCoinRef.current) {
      basicCoinRef.current.flip();
    }
  };

  const handleDoubleFlip = () => {
    flipCoin1();
    flipCoin2();
  };

  const handlePresetFlip = (preset) => {
    const coinRef = presetRefs[preset];
    if (coinRef.current) {
      coinRef.current.flip();
    }
  };

  const handleAnimationFlip = (animationType) => {
    const coinRef = animationRefs[animationType];
    if (coinRef.current) {
      coinRef.current.flip();
    }
  };

  const flipAllAnimations = () => {
    Object.keys(animationRefs).forEach((type, index) => {
      setTimeout(() => handleAnimationFlip(type), index * 200);
    });
  };

  const flipAllPresets = () => {
    Object.keys(presetRefs).forEach((preset, index) => {
      setTimeout(() => handlePresetFlip(preset), index * 150);
    });
  };

  const handleStatsFlip = () => {
    if (statsRef.current) {
      statsRef.current.flip();
    }
  };

  // Result handlers
  const handleBasicResult = (result) => {
    setBasicResult(result);
  };

  const handleDouble1Result = (result) => {
    setDoubleResults((prev) => [result, prev[1]]);
  };

  const handleDouble2Result = (result) => {
    setDoubleResults((prev) => [prev[0], result]);
  };

  const handlePresetResult = (preset) => (result) => {
    setPresetResults((prev) => ({ ...prev, [preset]: result }));
  };

  const handleAnimationResult = (type) => (result) => {
    setAnimationResults((prev) => ({ ...prev, [type]: result }));
  };

  const handleStatsResult = (result) => {
    setStats((prev) => ({
      heads: prev.heads + (result === "heads" ? 1 : 0),
      tails: prev.tails + (result === "tails" ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const resetStats = () => {
    setStats({ heads: 0, tails: 0, total: 0 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 p-8">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-white text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🪙 Reusable Coin Flip Component Demo
        </motion.h1>

        {/* Example 1: Basic Usage */}
        <motion.section
          className="mb-12 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-2xl font-semibold text-white mb-4">
            Basic Coin Flip
          </h2>
          <div className="flex flex-col items-center space-y-4">
            <ReusableCoin
              ref={basicCoinRef}
              size={120}
              onFlipComplete={handleBasicResult}
              className="mb-4"
            />
            <button
              onClick={handleBasicFlip}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors"
            >
              Flip Coin
            </button>
            {basicResult && (
              <motion.div
                className="text-white text-lg font-semibold"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                key={basicResult}
              >
                Result:{" "}
                {basicResult.charAt(0).toUpperCase() + basicResult.slice(1)} 🎉
              </motion.div>
            )}
          </div>
        </motion.section>

        {/* Example 2: Double Coin Flip */}
        <motion.section
          className="mb-12 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-white mb-4">
            Double Coin Flip
          </h2>
          <div className="flex flex-col items-center space-y-6">
            <div className="flex space-x-8">
              <div className="flex flex-col items-center space-y-2">
                <span className="text-white text-sm">Coin 1</span>
                <ReusableCoin
                  ref={coin1Ref}
                  size={100}
                  animationType="toss"
                  headColor="bg-red-500"
                  tailColor="bg-red-400"
                  edgeColor="bg-red-600"
                  borderColor="border-red-300"
                  onFlipComplete={handleDouble1Result}
                />
              </div>
              <div className="flex flex-col items-center space-y-2">
                <span className="text-white text-sm">Coin 2</span>
                <ReusableCoin
                  ref={coin2Ref}
                  size={100}
                  animationType="toss"
                  headColor="bg-blue-500"
                  tailColor="bg-blue-400"
                  edgeColor="bg-blue-600"
                  borderColor="border-blue-300"
                  onFlipComplete={handleDouble2Result}
                />
              </div>
            </div>
            <button
              onClick={handleDoubleFlip}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold transition-colors"
            >
              Flip Both Coins
            </button>
            {doubleResults[0] && doubleResults[1] && (
              <motion.div
                className="text-white text-lg text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={`${doubleResults[0]}-${doubleResults[1]}`}
              >
                <div>
                  Results: {doubleResults[0]} & {doubleResults[1]}
                </div>
                <div className="text-sm mt-1">
                  {doubleResults[0] === doubleResults[1]
                    ? "🎯 Match!"
                    : "🔄 Different"}
                </div>
              </motion.div>
            )}
          </div>
        </motion.section>

        {/* Example 3: Preset Designs */}
        <motion.section
          className="mb-12 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl font-semibold text-white mb-4">
            Preset Coin Designs
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-6">
            {Object.entries(presetRefs).map(([preset, ref]) => {
              const presetConfig = CoinPresets[preset];
              return (
                <div
                  key={preset}
                  className="flex flex-col items-center space-y-3"
                >
                  <h3 className="text-white font-medium capitalize">
                    {preset}
                  </h3>
                  <ReusableCoin
                    ref={ref}
                    size={90}
                    animationType="spin"
                    {...presetConfig}
                    onFlipComplete={handlePresetResult(preset)}
                  />
                  <button
                    onClick={() => handlePresetFlip(preset)}
                    className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm transition-colors"
                  >
                    Flip
                  </button>
                  {presetResults[preset] && (
                    <span className="text-white text-xs">
                      {presetResults[preset]}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <div className="text-center">
            <button
              onClick={flipAllPresets}
              className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
            >
              💰 Flip All Presets
            </button>
          </div>
        </motion.section>

        {/* Example 4: Different Animation Types */}
        <motion.section
          className="mb-12 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold text-white mb-4">
            Animation Styles
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            {Object.entries(animationRefs).map(([type, ref]) => (
              <div key={type} className="flex flex-col items-center space-y-3">
                <h3 className="text-white font-medium capitalize">{type}</h3>
                <ReusableCoin
                  ref={ref}
                  size={85}
                  animationType={type}
                  headColor={
                    type === "flip"
                      ? "bg-purple-500"
                      : type === "spin"
                      ? "bg-indigo-500"
                      : type === "toss"
                      ? "bg-pink-500"
                      : "bg-orange-500"
                  }
                  tailColor={
                    type === "flip"
                      ? "bg-purple-400"
                      : type === "spin"
                      ? "bg-indigo-400"
                      : type === "toss"
                      ? "bg-pink-400"
                      : "bg-orange-400"
                  }
                  edgeColor={
                    type === "flip"
                      ? "bg-purple-600"
                      : type === "spin"
                      ? "bg-indigo-600"
                      : type === "toss"
                      ? "bg-pink-600"
                      : "bg-orange-600"
                  }
                  onFlipComplete={handleAnimationResult(type)}
                />
                <button
                  onClick={() => handleAnimationFlip(type)}
                  className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm transition-colors"
                >
                  {type}
                </button>
                {animationResults[type] && (
                  <span className="text-white text-sm">
                    {animationResults[type]}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              onClick={flipAllAnimations}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
            >
              🎪 Show All Animations
            </button>
          </div>
        </motion.section>

        {/* Example 5: Statistics Tracker */}
        <motion.section
          className="mb-12 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-white mb-4">
            Statistics Tracker
          </h2>
          <div className="flex flex-col items-center space-y-6">
            <ReusableCoin
              ref={statsRef}
              size={110}
              animationType="flip"
              headColor="bg-gradient-to-br from-yellow-400 to-yellow-600"
              tailColor="bg-gradient-to-br from-yellow-500 to-yellow-700"
              onFlipComplete={handleStatsResult}
            />

            <div className="flex space-x-4">
              <button
                onClick={handleStatsFlip}
                className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-semibold transition-colors"
              >
                Flip & Track
              </button>
              <button
                onClick={resetStats}
                className="px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
              >
                Reset
              </button>
            </div>

            {stats.total > 0 && (
              <motion.div
                className="bg-white/20 rounded-lg p-4 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <h3 className="text-white text-lg font-semibold mb-2">
                  Statistics
                </h3>
                <div className="grid grid-cols-3 gap-4 text-white">
                  <div>
                    <div className="text-2xl font-bold">{stats.heads}</div>
                    <div className="text-sm">Heads</div>
                    <div className="text-xs">
                      {stats.total > 0
                        ? ((stats.heads / stats.total) * 100).toFixed(1)
                        : 0}
                      %
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stats.tails}</div>
                    <div className="text-sm">Tails</div>
                    <div className="text-xs">
                      {stats.total > 0
                        ? ((stats.tails / stats.total) * 100).toFixed(1)
                        : 0}
                      %
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stats.total}</div>
                    <div className="text-sm">Total</div>
                    <div className="text-xs">Flips</div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.section>

        {/* Usage Code Example */}
        <motion.section
          className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold text-white mb-4">
            Usage Examples
          </h2>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-green-400 text-sm">
              {`// Basic usage
                  import ReusableCoin from './ReusableCoin';

                  const MyComponent = () => {
                    const coinRef = useRef();
                    
                    const handleFlip = () => {
                      coinRef.current.flip(); // Random flip
                      // or coinRef.current.flip('heads'); // Force heads
                    };
                    
                    return (
                      <ReusableCoin
                        ref={coinRef}
                        size={120}
                        animationType="flip"
                        headColor="bg-yellow-500"
                        onFlipComplete={(result) => console.log(\`Flipped: \${result}\`)}
                      />
                    );
                  };

                  // Using presets
                  import { CoinPresets } from './ReusableCoin';

                  <ReusableCoin
                    {...CoinPresets.bitcoin}
                    size={100}
                    animationType="spin"
                  />

                  // Using the controller hook
                  import { useCoinController } from './ReusableCoin';

                  const CoinGame = () => {
                    const { coinRef, setCoinRef, flipCoin } = useCoinController();
                    
                    return (
                      <div>
                        <ReusableCoin ref={setCoinRef} />
                        <button onClick={() => flipCoin()}>Flip!</button>
                      </div>
                    );
                  };`}
            </pre>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default CoinDemo;
