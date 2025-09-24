"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ShowCards = () => {
  // Complete deck of 52 playing cards
  const suits = ["♠", "♥", "♦", "♣"];
  const values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];

  const deck = [];
  suits.forEach((suit) => {
    values.forEach((value) => {
      deck.push({ suit, value, id: `${value}${suit}` });
    });
  });

  const [selectedCards, setSelectedCards] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCards, setShowCards] = useState(false);

  // Function to get card color based on suit
  const getCardColor = (suit) => {
    return suit === "♥" || suit === "♦" ? "text-red-600" : "text-black";
  };

  // Function to get suit symbol
  const getSuitSymbol = (suit) => {
    switch (suit) {
      case "♠":
        return "♠";
      case "♥":
        return "♥";
      case "♦":
        return "♦";
      case "♣":
        return "♣";
      default:
        return suit;
    }
  };

  // Function to show random 12 cards
  const handleShowCards = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setSelectedCards([]);
    setShowCards(false);

    // Shuffle deck and pick 12 random cards
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    const randomCards = shuffled.slice(0, 12);

    // Reveal cards one by one with 1-second delay
    randomCards.forEach((card, index) => {
      setTimeout(() => {
        setSelectedCards((prev) => [...prev, card]);
        if (index === randomCards.length - 1) {
          setIsAnimating(false);
          setShowCards(true);
        }
      }, (index + 1) * 1000);
    });
  };

  // Animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotateY: 180,
      y: -50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="w-full" style={{ border: "1px solid red" }}>
      {/* Show Cards Button */}
      <div className="text-center mb-8 mt-5">
        <motion.button
          onClick={handleShowCards}
          disabled={isAnimating}
          className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
            isAnimating
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl"
          } text-white`}
          whileHover={!isAnimating ? { scale: 1.05 } : {}}
          whileTap={!isAnimating ? { scale: 0.95 } : {}}
        >
          {isAnimating ? "Revealing Cards..." : "Show Cards"}
        </motion.button>
      </div>

      {/* Cards Display Area */}
      <div className="min-h-[200px] flex justify-center items-center mb-5">
        <AnimatePresence>
          {selectedCards.length > 0 && (
            <motion.div
              className="flex flex-wrap justify-center gap-4 max-w-4xl"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {selectedCards.map((card, index) => (
                <motion.div
                  key={`${card.id}-${index}`}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className="relative"
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "1000px",
                  }}
                >
                  <div className="w-20 h-28 bg-white rounded-lg shadow-lg border-2 border-gray-400 hover:shadow-xl transition-shadow duration-300">
                    {/* Card Content */}
                    <div className="p-2 h-full flex flex-col justify-between">
                      {/* Top-left corner */}
                      <div className="flex flex-col items-start">
                        <div
                          className={`text-lg font-bold ${getCardColor(
                            card.suit
                          )}`}
                        >
                          {card.value}
                        </div>
                        <div className={`text-sm ${getCardColor(card.suit)}`}>
                          {getSuitSymbol(card.suit)}
                        </div>
                      </div>

                      {/* Center suit symbol (larger) */}
                      <div className="flex-1 flex items-center justify-center">
                        <div className={`text-2xl ${getCardColor(card.suit)}`}>
                          {getSuitSymbol(card.suit)}
                        </div>
                      </div>

                      {/* Bottom-right corner (rotated) */}
                      <div className="flex flex-col items-end transform rotate-180">
                        <div
                          className={`text-lg font-bold ${getCardColor(
                            card.suit
                          )}`}
                        >
                          {card.value}
                        </div>
                        <div className={`text-sm ${getCardColor(card.suit)}`}>
                          {getSuitSymbol(card.suit)}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info Text */}
      {showCards && selectedCards.length === 12 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-6 mb-5"
        >
          <p className="text-white text-lg">
            🎉 {selectedCards.length} random cards revealed!
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ShowCards;
