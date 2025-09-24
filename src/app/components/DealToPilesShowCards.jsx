"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

const DealToPilesShowCards = () => {
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

  const deck = useMemo(() => {
    const d = [];
    suits.forEach((suit) => {
      values.forEach((value) => {
        d.push({ suit, value, id: `${value}${suit}` });
      });
    });
    return d;
  }, []);

  const [leftPile, setLeftPile] = useState([]);
  const [rightPile, setRightPile] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [done, setDone] = useState(false);

  const getCardColor = (suit) => (suit === "♥" || suit === "♦" ? "text-red-600" : "text-black");
  const getSuitSymbol = (suit) => suit;

  const handleShowCards = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setLeftPile([]);
    setRightPile([]);
    setDone(false);

    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    const randomCards = shuffled.slice(0, 12);

    randomCards.forEach((card, index) => {
      setTimeout(() => {
        if (index % 2 === 0) {
          setLeftPile((prev) => [...prev, card]);
        } else {
          setRightPile((prev) => [...prev, card]);
        }
        if (index === randomCards.length - 1) {
          setIsAnimating(false);
          setDone(true);
        }
      }, (index + 1) * 300);
    });
  };

  return (
    <div className="w-full" style={{ width: 720, border: "1px solid red" }}>
      <h1 className="text-center mt-2">Andar Bahar Game Example</h1>
      <h1 className="text-center mt-2">Deal To Two Piles</h1>
      <div className="text-center mb-8 mt-5">
        <motion.button
          onClick={handleShowCards}
          disabled={isAnimating}
          className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
            isAnimating
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-700 hover:to-fuchsia-700 shadow-lg hover:shadow-xl"
          } text-white`}
          whileHover={!isAnimating ? { scale: 1.05 } : {}}
          whileTap={!isAnimating ? { scale: 0.95 } : {}}
        >
          {isAnimating ? "Dealing..." : "Deal Cards"}
        </motion.button>
      </div>

      <div className="min-h-[320px] flex justify-center items-start gap-12 mb-5">
        {/* Left Pile */}
        <div className="relative" style={{ width: 140, height: 220 }}>
          {leftPile.map((card, index) => (
            <motion.div
              key={`${card.id}-L-${index}`}
              initial={{ opacity: 0, y: -20, rotate: -6 }}
              animate={{ opacity: 1, y: 0, rotate: -2 + index * 0.2 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute"
              style={{ left: 20 + index * 2, top: 20 + index * 3, zIndex: 50 + index }}
            >
              <div className="w-20 h-28 bg-white rounded-lg shadow-lg border-2 border-gray-300">
                <div className="p-2 h-full flex flex-col justify-between">
                  <div className="flex flex-col items-start">
                    <div className={`text-lg font-bold ${getCardColor(card.suit)}`}>{card.value}</div>
                    <div className={`text-sm ${getCardColor(card.suit)}`}>{getSuitSymbol(card.suit)}</div>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className={`text-2xl ${getCardColor(card.suit)}`}>{getSuitSymbol(card.suit)}</div>
                  </div>
                  <div className="flex flex-col items-end transform rotate-180">
                    <div className={`text-lg font-bold ${getCardColor(card.suit)}`}>{card.value}</div>
                    <div className={`text-sm ${getCardColor(card.suit)}`}>{getSuitSymbol(card.suit)}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Pile */}
        <div className="relative" style={{ width: 140, height: 220 }}>
          {rightPile.map((card, index) => (
            <motion.div
              key={`${card.id}-R-${index}`}
              initial={{ opacity: 0, y: -20, rotate: 6 }}
              animate={{ opacity: 1, y: 0, rotate: 2 - index * 0.2 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute"
              style={{ left: 20 + index * 2, top: 20 + index * 3, zIndex: 50 + index }}
            >
              <div className="w-20 h-28 bg-white rounded-lg shadow-lg border-2 border-gray-300">
                <div className="p-2 h-full flex flex-col justify-between">
                  <div className="flex flex-col items-start">
                    <div className={`text-lg font-bold ${getCardColor(card.suit)}`}>{card.value}</div>
                    <div className={`text-sm ${getCardColor(card.suit)}`}>{getSuitSymbol(card.suit)}</div>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className={`text-2xl ${getCardColor(card.suit)}`}>{getSuitSymbol(card.suit)}</div>
                  </div>
                  <div className="flex flex-col items-end transform rotate-180">
                    <div className={`text-lg font-bold ${getCardColor(card.suit)}`}>{card.value}</div>
                    <div className={`text-sm ${getCardColor(card.suit)}`}>{getSuitSymbol(card.suit)}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {done && leftPile.length + rightPile.length === 12 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mt-6 mb-5">
          <p className="text-white text-lg">🎉 12 cards dealt into two piles!</p>
        </motion.div>
      )}
    </div>
  );
};

export default DealToPilesShowCards;


