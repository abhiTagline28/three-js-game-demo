"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import ReusableDice, { useDiceController } from "./ReusableDice";

// Example 1: Basic usage with ref
const ExampleOne = () => {
  const basicDiceRef = useRef();
  const [basicResult, setBasicResult] = useState(null);

  const handleBasicResult = (value) => {
    setBasicResult(value);
  };

  const handleBasicRoll = () => {
    if (basicDiceRef.current) {
      basicDiceRef.current.roll();
    }
  };

  return (
    <motion.section
      className="mb-12 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <h2 className="text-2xl font-semibold text-white mb-4">Basic Usage</h2>
      <div className="flex flex-col items-center space-y-4">
        <ReusableDice
          ref={basicDiceRef}
          size={120}
          onRollComplete={handleBasicResult}
          className="mb-4"
        />
        <button
          onClick={handleBasicRoll}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
        >
          Roll Basic Dice
        </button>
        {basicResult && (
          <motion.div
            className="text-white text-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            key={basicResult}
          >
            Result: {basicResult}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

// Example 2: Multiple dice with controller hook
const ExampleTwo = () => {
  const { diceRef: dice1Ref, rollDice: rollDice1 } = useDiceController();
  const { diceRef: dice2Ref, rollDice: rollDice2 } = useDiceController();
  const [pairResults, setPairResults] = useState([null, null]);

  const handlePairRoll = () => {
    rollDice1();
    rollDice2();
  };

  const handlePair1Result = (value) => {
    setPairResults((prev) => [value, prev[1]]);
  };

  const handlePair2Result = (value) => {
    setPairResults((prev) => [prev[0], value]);
  };

  return (
    <motion.section
      className="mb-12 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h2 className="text-2xl font-semibold text-white mb-4">
        Pair Roll (Hook Controller)
      </h2>
      <div className="flex flex-col items-center space-y-6">
        <div className="flex space-x-8">
          <ReusableDice
            ref={dice1Ref}
            size={100}
            animationType="throw"
            pipColor="bg-red-600"
            onRollComplete={handlePair1Result}
          />
          <ReusableDice
            ref={dice2Ref}
            size={100}
            animationType="throw"
            pipColor="bg-blue-600"
            onRollComplete={handlePair2Result}
          />
        </div>
        <button
          onClick={handlePairRoll}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
        >
          Roll Pair
        </button>
        {pairResults[0] && pairResults[1] && (
          <motion.div
            className="text-white text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={`${pairResults[0]}-${pairResults[1]}`}
          >
            Results: {pairResults[0]} + {pairResults[1]} ={" "}
            {pairResults[0] + pairResults[1]}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

// Example 3: Custom styled dice
const ExampleThree = () => {
  const customDiceRef = useRef();
  const [customResult, setCustomResult] = useState(null);

  const handleCustomRoll = (targetValue = null) => {
    if (customDiceRef.current) {
      customDiceRef.current.roll(targetValue);
    }
  };

  const handleCustomResult = (value) => {
    setCustomResult(value);
  };

  return (
    <motion.section
      className="mb-12 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <h2 className="text-2xl font-semibold text-white mb-4">Custom Styling</h2>
      <div className="flex flex-col items-center space-y-6">
        <ReusableDice
          ref={customDiceRef}
          size={140}
          pipColor="bg-yellow-400"
          faceColor="bg-purple-800"
          borderColor="border-yellow-400"
          shadowColor="shadow-2xl"
          animationType="spin"
          onRollComplete={handleCustomResult}
        />
        <div className="flex space-x-3">
          <button
            onClick={() => handleCustomRoll()}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
          >
            Random Roll
          </button>
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <button
              key={num}
              onClick={() => handleCustomRoll(num)}
              className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
            >
              {num}
            </button>
          ))}
        </div>
        {customResult && (
          <motion.div
            className="text-white text-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            key={customResult}
          >
            Custom Result: {customResult}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

// Example 4: Different animation types
const ExampleFour = () => {
  const animationDiceRefs = {
    bounce: useRef(),
    spin: useRef(),
    throw: useRef(),
    tumble: useRef(),
  };
  const [animationResults, setAnimationResults] = useState({
    bounce: null,
    spin: null,
    throw: null,
    tumble: null,
  });

  const handleAnimationRoll = (animationType) => {
    const diceRef = animationDiceRefs[animationType];
    if (diceRef.current) {
      diceRef.current.roll();
    }
  };

  const rollAllAnimations = () => {
    Object.keys(animationDiceRefs).forEach((type) => {
      setTimeout(() => handleAnimationRoll(type), Math.random() * 500);
    });
  };

  const handleAnimationResult = (type) => (value) => {
    setAnimationResults((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <motion.section
      className="mb-12 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <h2 className="text-2xl font-semibold text-white mb-4">
        Animation Types
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        {Object.entries(animationDiceRefs).map(([type, ref]) => (
          <div key={type} className="flex flex-col items-center space-y-3">
            <h3 className="text-white font-medium capitalize">{type}</h3>
            <ReusableDice
              ref={ref}
              size={80}
              animationType={type}
              pipColor={
                type === "bounce"
                  ? "bg-pink-500"
                  : type === "spin"
                  ? "bg-cyan-500"
                  : type === "throw"
                  ? "bg-orange-500"
                  : "bg-lime-500"
              }
              onRollComplete={handleAnimationResult(type)}
            />
            <button
              onClick={() => handleAnimationRoll(type)}
              className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm transition-colors"
            >
              Roll
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
          onClick={rollAllAnimations}
          className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
        >
          🎰 Roll All Animations
        </button>
      </div>
    </motion.section>
  );
};

const DiceExample = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-white text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🎲 Reusable Dice Component Demo
        </motion.h1>

        {/* Example 1: Basic Usage */}
        <ExampleOne />
        {/* Example 2: Multiple Dice with Controller Hook */}
        <ExampleTwo />
        {/* Example 3: Custom Styling */}
        <ExampleThree />
        {/* Example 4: Different Animation Types */}
        <ExampleFour />

        {/* Usage Code Example */}
        <motion.section
          className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-white mb-4">
            Usage Examples
          </h2>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-green-400 text-sm">
              {`// Basic usage
                import ReusableDice from './ReusableDice';

                const MyComponent = () => {
                  const diceRef = useRef();
                  
                  const handleRoll = () => {
                    diceRef.current.roll(); // Random roll
                    // or diceRef.current.roll(3); // Force specific value
                  };
                  
                  return (
                    <ReusableDice
                      ref={diceRef}
                      size={120}
                      animationType="bounce"
                      pipColor="bg-red-500"
                      onRollComplete={(value) => console.log(\`Rolled: \${value}\`)}
                    />
                  );
                };

                // Using the controller hook
                import { useDiceController } from './ReusableDice';

                const PairDice = () => {
                  const { diceRef, setDiceRef, rollDice } = useDiceController();
                  
                  return (
                    <div>
                      <ReusableDice ref={setDiceRef} />
                      <button onClick={() => rollDice()}>Roll!</button>
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

export default DiceExample;
