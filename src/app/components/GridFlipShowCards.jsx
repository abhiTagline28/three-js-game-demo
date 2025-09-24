"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GridFlipShowCards = () => {
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

  const getCardColor = (suit) => {
    return suit === "♥" || suit === "♦" ? "text-red-600" : "text-black";
  };

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

  const handleShowCards = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSelectedCards([]);
    setShowCards(false);

    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    const randomCards = shuffled.slice(0, 12);

    randomCards.forEach((card, index) => {
      setTimeout(() => {
        setSelectedCards((prev) => [...prev, card]);
        if (index === randomCards.length - 1) {
          setIsAnimating(false);
          setShowCards(true);
        }
      }, (index + 1) * 250);
    });
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      rotateY: 180,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  };

  return (
    <div className="w-full" style={{ width: 720, border: "1px solid red" }}>
      <h1 className="text-center mt-2">Andar Bahar Game Example</h1>
      <h1 className="text-center mt-2">Grid Flip Cards (3 × 4)</h1>
      <div className="text-center mb-8 mt-5">
        <motion.button
          onClick={handleShowCards}
          disabled={isAnimating}
          className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
            isAnimating
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 shadow-lg hover:shadow-xl"
          } text-white`}
          whileHover={!isAnimating ? { scale: 1.05 } : {}}
          whileTap={!isAnimating ? { scale: 0.95 } : {}}
        >
          {isAnimating ? "Revealing Cards..." : "Show Cards"}
        </motion.button>
      </div>

      <div className="min-h-[260px] flex justify-center items-center mb-5">
        <AnimatePresence>
          {selectedCards.length > 0 && (
            <motion.div
              className="grid grid-cols-4 gap-4"
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
                  style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                >
                  <div className="w-20 h-28 bg-white rounded-lg shadow-lg border-2 border-gray-300">
                    <div className="p-2 h-full flex flex-col justify-between">
                      <div className="flex flex-col items-start">
                        <div className={`text-lg font-bold ${getCardColor(card.suit)}`}>
                          {card.value}
                        </div>
                        <div className={`text-sm ${getCardColor(card.suit)}`}>
                          {getSuitSymbol(card.suit)}
                        </div>
                      </div>
                      <div className="flex-1 flex items-center justify-center">
                        <div className={`text-2xl ${getCardColor(card.suit)}`}>
                          {getSuitSymbol(card.suit)}
                        </div>
                      </div>
                      <div className="flex flex-col items-end transform rotate-180">
                        <div className={`text-lg font-bold ${getCardColor(card.suit)}`}>
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

      {showCards && selectedCards.length === 12 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mt-6 mb-5">
          <p className="text-white text-lg">🎉 {selectedCards.length} random cards revealed!</p>
        </motion.div>
      )}
    </div>
  );
};

export default GridFlipShowCards;


