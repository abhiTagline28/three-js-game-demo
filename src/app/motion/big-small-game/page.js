"use client";

import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReusableDice from "../dice/ReusableDice";

// Game constants
const GAME_STATES = {
  BETTING: "betting",
  ROLLING: "rolling",
  RESULT: "result",
};

const BET_AMOUNTS = [10, 20, 30, 50, 100, 200, 300, 500];
const PAYOUT_MULTIPLIER = 1.95; // Slightly less than 2x for house edge

// Sound effects hook
const useSoundEffects = () => {
  const playSound = useCallback((type) => {
    // Create audio context for better browser compatibility
    if (typeof window !== "undefined" && window.AudioContext) {
      try {
        const audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();

        // Generate different tones for different actions
        const frequencies = {
          bet: 440, // A4 note
          win: 523.25, // C5 note
          lose: 220, // A3 note
          roll: 329.63, // E4 note
        };

        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(
          frequencies[type] || 440,
          audioContext.currentTime
        );
        oscillator.type =
          type === "win" ? "sine" : type === "lose" ? "sawtooth" : "square";

        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(
          0.1,
          audioContext.currentTime + 0.01
        );
        gainNode.gain.exponentialRampToValueAtTime(
          0.001,
          audioContext.currentTime + (type === "win" ? 0.5 : 0.2)
        );

        oscillator.start(audioContext.currentTime);
        oscillator.stop(
          audioContext.currentTime + (type === "win" ? 0.5 : 0.2)
        );
      } catch (error) {
        console.warn("Audio playback failed:", error);
      }
    }
  }, []);

  return { playSound };
};

// Custom hooks for game logic
const useGameState = (initialBalance = 411.54) => {
  const [balance, setBalance] = useState(initialBalance);
  const [gameState, setGameState] = useState(GAME_STATES.BETTING);
  const [bigBet, setBigBet] = useState(0);
  const [smallBet, setSmallBet] = useState(0);
  const [selectedBetAmount, setSelectedBetAmount] = useState(50);
  const [diceResults, setDiceResults] = useState([]);
  const [lastWin, setLastWin] = useState(0);
  const [gameHistory, setGameHistory] = useState([]);

  const totalBet = useMemo(() => bigBet + smallBet, [bigBet, smallBet]);
  const canBet = useMemo(
    () => gameState === GAME_STATES.BETTING && balance >= selectedBetAmount,
    [gameState, balance, selectedBetAmount]
  );

  const { playSound } = useSoundEffects();

  const resetBets = useCallback(() => {
    setBigBet(0);
    setSmallBet(0);
  }, []);

  const placeBet = useCallback(
    (type, shouldPlaySound = true) => {
      if (!canBet) return;

      if (type === "big") {
        setBigBet((prev) => prev + selectedBetAmount);
      } else {
        setSmallBet((prev) => prev + selectedBetAmount);
      }
      setBalance((prev) => prev - selectedBetAmount);

      if (shouldPlaySound && playSound) {
        playSound("bet");
      }
    },
    [canBet, selectedBetAmount, playSound]
  );

  return {
    balance,
    setBalance,
    gameState,
    setGameState,
    bigBet,
    setBigBet,
    smallBet,
    setSmallBet,
    selectedBetAmount,
    setSelectedBetAmount,
    diceResults,
    setDiceResults,
    lastWin,
    setLastWin,
    gameHistory,
    setGameHistory,
    totalBet,
    canBet,
    resetBets,
    placeBet,
  };
};

// Main game component
const BigSmallGame = () => {
  const gameState = useGameState();
  const { playSound } = useSoundEffects();
  const dice1Ref = useRef();
  const dice2Ref = useRef();
  const dice3Ref = useRef();
  const audioRef = useRef();

  const {
    balance,
    setBalance,
    gameState: currentGameState,
    setGameState,
    bigBet,
    setBigBet,
    smallBet,
    setSmallBet,
    selectedBetAmount,
    setSelectedBetAmount,
    diceResults,
    setDiceResults,
    lastWin,
    setLastWin,
    gameHistory,
    setGameHistory,
    totalBet,
    canBet,
    resetBets,
    placeBet,
  } = gameState;

  // Calculate dice sum and determine if it's big or small
  const diceSum = useMemo(
    () => diceResults.reduce((sum, val) => sum + val, 0),
    [diceResults]
  );
  const isBig = useMemo(() => diceSum >= 11 && diceSum <= 17, [diceSum]);
  const isSmall = useMemo(() => diceSum >= 4 && diceSum <= 10, [diceSum]);

  // Handle dice roll completion
  const handleDiceComplete = useCallback(
    (index, value) => {
      setDiceResults((prev) => {
        const newResults = [...prev];
        newResults[index] = value;
        return newResults;
      });
    },
    [setDiceResults]
  );

  // Fix the game state logic
  const processGameResult = useCallback(() => {
    let winAmount = 0;
    
    // Fix: Ensure diceSum is calculated correctly
    const diceSum = diceResults.reduce((sum, val) => sum + val, 0);
    
    // Fix: Properly define big/small ranges (4-10 for small, 11-17 for big)
    const isBig = diceSum >= 11 && diceSum <= 17;
    const isSmall = diceSum >= 4 && diceSum <= 10;
  
    // Fix: Only pay out if dice sum is within valid ranges
    if (isBig && bigBet > 0) {
      winAmount += bigBet * PAYOUT_MULTIPLIER;
    }
    if (isSmall && smallBet > 0) {
      winAmount += smallBet * PAYOUT_MULTIPLIER;
    }
  
    // Fix: Handle cases where sum is outside both ranges (no win)
    if (diceSum < 4 || diceSum > 17) {
      winAmount = 0;
    }

    setBalance((prev) => prev + winAmount);
    setLastWin(winAmount);

    // Add to game history
    setGameHistory((prev) => [
      {
        id: Date.now(),
        sum: diceSum,
        result: isBig ? "Big" : "Small",
        bigBet,
        smallBet,
        winAmount,
        timestamp: new Date(),
      },
      ...prev.slice(0, 9),
    ]); // Keep last 10 games

    setGameState(GAME_STATES.RESULT);

    // Play appropriate sound
    if (winAmount > 0) {
      playSound("win");
    } else {
      playSound("lose");
    }
  }, [
    isBig,
    isSmall,
    bigBet,
    smallBet,
    diceSum,
    setBalance,
    setLastWin,
    setGameHistory,
    setGameState,
    playSound,
  ]);

  // Process game result when all dice are rolled
  useEffect(() => {
    if (diceResults.length === 3 && currentGameState === GAME_STATES.ROLLING) {
      setTimeout(() => {
        processGameResult();
      }, 1000); // Delay to show result
    }
  }, [diceResults, currentGameState, processGameResult]);

  // Start new game
  const startNewGame = useCallback(() => {
    if (totalBet === 0) return;

    setGameState(GAME_STATES.ROLLING);
    setDiceResults([]);
    setLastWin(0);

    // Play roll sound
    playSound("roll");

    // Roll all dice with slight delay
    setTimeout(() => dice1Ref.current?.roll(), 100);
    setTimeout(() => dice2Ref.current?.roll(), 200);
    setTimeout(() => dice3Ref.current?.roll(), 300);
  }, [totalBet, setGameState, setDiceResults, setLastWin, playSound]);

  // Reset to betting state
  const resetGame = useCallback(() => {
    setGameState(GAME_STATES.BETTING);
    setDiceResults([]);
    resetBets();
  }, [setGameState, setDiceResults, resetBets]);

  // All-in bet
  const allInBet = useCallback(() => {
    if (currentGameState !== GAME_STATES.BETTING || balance <= 0) return;

    const halfBalance = balance / 2;
    setBalance(0);
    setBigBet(halfBalance);
    setSmallBet(halfBalance);
  }, [currentGameState, balance, setBigBet, setSmallBet, setBalance]);

  // Other button functionality - switch between Big and Small bets
  const handleOtherBet = useCallback(() => {
    if (currentGameState !== GAME_STATES.BETTING) return;

    if (bigBet > 0 && smallBet === 0) {
      // Move Big bet to Small
      setBalance((prev) => prev + bigBet);
      setBigBet(0);
      setSmallBet(bigBet);
      setBalance((prev) => prev - bigBet);
    } else if (smallBet > 0 && bigBet === 0) {
      // Move Small bet to Big
      setBalance((prev) => prev + smallBet);
      setSmallBet(0);
      setBigBet(smallBet);
      setBalance((prev) => prev - smallBet);
    } else {
      // Place a bet on both if no bets exist
      if (balance >= selectedBetAmount * 2) {
        placeBet("big", false);
        placeBet("small", true); // Only play sound for the last bet
      } else if (balance >= selectedBetAmount) {
        placeBet("big");
      }
    }
  }, [
    currentGameState,
    bigBet,
    smallBet,
    balance,
    selectedBetAmount,
    setBigBet,
    setSmallBet,
    setBalance,
    placeBet,
  ]);

  // Optimized bet amount selector component
  const BetAmountSelector = useMemo(() => {
    const BetButton = React.memo(
      ({ amount, isSelected, onClick, disabled }) => (
        <motion.button
          onClick={() => onClick(amount)}
          className={`px-4 py-2 rounded-lg font-bold text-black transition-all ${
            isSelected
              ? "bg-yellow-400 shadow-lg scale-105"
              : "bg-gray-300 hover:bg-gray-200"
          }`}
          whileHover={{ scale: disabled ? 1 : 1.05 }}
          whileTap={{ scale: disabled ? 1 : 0.95 }}
          disabled={disabled}
        >
          {amount}
        </motion.button>
      )
    );

    BetButton.displayName = "BetButton";

    return (
      <div className="grid grid-cols-4 gap-2">
        {BET_AMOUNTS.map((amount) => (
          <BetButton
            key={amount}
            amount={amount}
            isSelected={selectedBetAmount === amount}
            onClick={setSelectedBetAmount}
            disabled={currentGameState !== GAME_STATES.BETTING}
          />
        ))}
      </div>
    );
  }, [selectedBetAmount, setSelectedBetAmount, currentGameState]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-red-900 to-orange-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-t-2xl p-4 border-4 border-yellow-400"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold">BIG&SMALL</div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-80">Balance</div>
              <div className="text-xl font-bold">{balance.toFixed(2)}</div>
            </div>
          </div>
        </motion.div>

        {/* Main Game Board */}
        <motion.div
          className="bg-gradient-to-br from-red-800 to-red-900 border-4 border-yellow-400 rounded-b-2xl p-6"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Betting Sections */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Big Section */}
            <motion.div
              className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-4 border-2 border-yellow-400"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-yellow-400">👥</span>
                  <span className="text-white font-bold text-lg">Big</span>
                  <span className="text-yellow-400">👥</span>
                </div>
                <div className="text-white text-sm mb-2">83</div>
                <div className="text-yellow-300 text-2xl font-bold mb-3">
                  {bigBet > 0 ? bigBet.toFixed(2) : "1,659.00"}
                </div>
                <div className="text-white text-xs mb-3">Betting</div>
                <motion.button
                  onClick={() => placeBet("big")}
                  className="w-full py-2 bg-red-500 hover:bg-red-400 text-white rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={canBet ? { scale: 1.05 } : {}}
                  whileTap={canBet ? { scale: 0.95 } : {}}
                  disabled={!canBet}
                >
                  Bet Big
                </motion.button>
              </div>
            </motion.div>

            {/* Small Section */}
            <motion.div
              className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-4 border-2 border-yellow-400"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-yellow-400">👥</span>
                  <span className="text-white font-bold text-lg">Small</span>
                  <span className="text-yellow-400">👥</span>
                </div>
                <div className="text-white text-sm mb-2">81</div>
                <div className="text-yellow-300 text-2xl font-bold mb-3">
                  {smallBet > 0 ? smallBet.toFixed(2) : "4,814.00"}
                </div>
                <div className="text-white text-xs mb-3">Betting</div>
                <motion.button
                  onClick={() => placeBet("small")}
                  className="w-full py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={canBet ? { scale: 1.05 } : {}}
                  whileTap={canBet ? { scale: 0.95 } : {}}
                  disabled={!canBet}
                >
                  Bet Small
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Dice Display */}
          <motion.div
            className="bg-gradient-to-br from-yellow-600 to-orange-600 rounded-full p-8 mb-6 mx-auto flex items-center justify-center"
            style={{ width: "200px", height: "200px" }}
            initial={{ rotateY: 0 }}
            animate={{
              rotateY:
                currentGameState === GAME_STATES.ROLLING ? [0, 180, 360] : 0,
              scale: currentGameState === GAME_STATES.ROLLING ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: 2,
              repeat: currentGameState === GAME_STATES.ROLLING ? Infinity : 0,
            }}
          >
            {currentGameState === GAME_STATES.BETTING ||
            diceResults.length === 0 ? (
              <div className="text-6xl font-bold text-white">11</div>
            ) : (
              <div className="flex space-x-2">
                <ReusableDice
                  ref={dice1Ref}
                  size={45}
                  animationType="bounce"
                  onRollComplete={(value) => handleDiceComplete(0, value)}
                  soundEnabled={false}
                />
                <ReusableDice
                  ref={dice2Ref}
                  size={45}
                  animationType="bounce"
                  onRollComplete={(value) => handleDiceComplete(1, value)}
                  soundEnabled={false}
                />
                <ReusableDice
                  ref={dice3Ref}
                  size={45}
                  animationType="bounce"
                  onRollComplete={(value) => handleDiceComplete(2, value)}
                  soundEnabled={false}
                />
              </div>
            )}
          </motion.div>

          {/* Game History Dots */}
          <div className="flex justify-center mb-6 space-x-1">
            {Array.from({ length: 11 }, (_, i) => {
              const game = gameHistory[i];
              return (
                <motion.div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    game
                      ? game.result === "Big"
                        ? "bg-red-500"
                        : "bg-white"
                      : i % 2 === 0
                      ? "bg-gray-600"
                      : "bg-white"
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                />
              );
            })}
          </div>

          {/* Bet Amount Selection */}
          <div className="mb-6">{BetAmountSelector}</div>

          {/* Control Buttons */}
          <div className="grid grid-cols-4 gap-3">
            <motion.button
              onClick={resetBets}
              className="py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-lg font-bold transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={
                currentGameState !== GAME_STATES.BETTING || totalBet === 0
              }
            >
              Cancel
            </motion.button>

            <motion.button
              onClick={handleOtherBet}
              className="py-3 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg font-bold transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={currentGameState !== GAME_STATES.BETTING}
            >
              Other
            </motion.button>

            <motion.button
              onClick={allInBet}
              className="py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={
                currentGameState !== GAME_STATES.BETTING || balance <= 0
              }
            >
              All In
            </motion.button>

            <motion.button
              onClick={
                currentGameState === GAME_STATES.BETTING
                  ? startNewGame
                  : resetGame
              }
              className="py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={
                currentGameState === GAME_STATES.BETTING && totalBet === 0
              }
            >
              {currentGameState === GAME_STATES.BETTING ? "Agree" : "New Game"}
            </motion.button>
          </div>

          {/* Game Result */}
          <AnimatePresence>
            {currentGameState === GAME_STATES.RESULT &&
              diceResults.length === 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -50 }}
                  className="mt-6 text-center relative"
                >
                  {/* Particle effects for wins */}
                  {lastWin > 0 && (
                    <div className="absolute inset-0 pointer-events-none">
                      {Array.from({ length: 20 }, (_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                          initial={{
                            x: Math.random() * 400 - 200,
                            y: Math.random() * 300 - 150,
                            scale: 0,
                            opacity: 0,
                          }}
                          animate={{
                            x: Math.random() * 800 - 400,
                            y: Math.random() * 600 - 300,
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 2,
                            delay: i * 0.1,
                            ease: "easeOut",
                          }}
                        />
                      ))}
                    </div>
                  )}

                  <div className="bg-black bg-opacity-70 rounded-xl p-6 border-2 border-yellow-400 relative z-10">
                    <motion.h2
                      className="text-3xl font-bold text-white mb-3"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Result: {diceSum}
                    </motion.h2>

                    <motion.div
                      className={`text-6xl font-bold mb-4 ${
                        isBig ? "text-red-400" : "text-blue-400"
                      }`}
                      initial={{ scale: 0, rotateY: 0 }}
                      animate={{
                        scale: 1,
                        rotateY: [0, 360],
                        textShadow:
                          lastWin > 0 ? "0 0 20px currentColor" : "none",
                      }}
                      transition={{
                        delay: 0.4,
                        type: "spring",
                        stiffness: 200,
                        rotateY: { duration: 0.8 },
                      }}
                    >
                      {isBig ? "BIG" : "SMALL"}
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      {lastWin > 0 ? (
                        <motion.div
                          className="text-green-400 text-2xl font-bold"
                          animate={{
                            scale: [1, 1.1, 1],
                            textShadow: [
                              "0 0 10px #4ade80",
                              "0 0 20px #4ade80",
                              "0 0 10px #4ade80",
                            ],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          🎉 You Won ${lastWin.toFixed(2)}! 🎉
                        </motion.div>
                      ) : (
                        <div className="text-red-400 text-2xl font-bold">
                          😔 You Lost ${totalBet.toFixed(2)} 😔
                        </div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              )}
          </AnimatePresence>
        </motion.div>

        {/* Transaction ID */}
        <motion.div
          className="text-center mt-4 text-white text-xs opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1 }}
        >
          Transaction: v_001_004{Math.floor(Math.random() * 1000000000000000)}
        </motion.div>

        {/* Audio for sound effects */}
        <audio ref={audioRef} preload="auto">
          <source src="/sounds/coin-drop.mp3" type="audio/mpeg" />
        </audio>
      </div>
    </div>
  );
};

export default React.memo(BigSmallGame);