"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

const FanSpreadShowCards = () => {
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

  const [selectedCards, setSelectedCards] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCards, setShowCards] = useState(false);

  const getCardColor = (suit) => {
    return suit === "♥" || suit === "♦" ? "text-red-600" : "text-black";
  };

  const getSuitSymbol = (suit) => suit;

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
      }, (index + 1) * 200);
    });
  };

  const total = selectedCards.length;
  const spread = Math.min(120, 12 * 10); // total angle span in degrees

  return (
    <div className="w-full" style={{ width: 720, border: "1px solid red" }}>
      <h1 className="text-center mt-2">Andar Bahar Game Example</h1>
      <h1 className="text-center mt-2">Fan Spread Cards</h1>
      <div className="text-center mb-8 mt-5">
        <motion.button
          onClick={handleShowCards}
          disabled={isAnimating}
          className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
            isAnimating
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-700 hover:to-orange-700 shadow-lg hover:shadow-xl"
          } text-white`}
          whileHover={!isAnimating ? { scale: 1.05 } : {}}
          whileTap={!isAnimating ? { scale: 0.95 } : {}}
        >
          {isAnimating ? "Revealing Cards..." : "Show Cards"}
        </motion.button>
      </div>

      <div className="min-h-[320px] flex justify-center items-end mb-5">
        <div className="relative" style={{ width: 520, height: 260 }}>
          {selectedCards.map((card, index) => {
            const angleStep = total > 1 ? spread / (total - 1) : 0;
            const start = -spread / 2;
            const angle = start + index * angleStep; // degrees
            const radius = 140;
            const x = Math.sin((angle * Math.PI) / 180) * radius;
            const y = Math.cos((angle * Math.PI) / 180) * 16; // subtle depth curve
            const zIndex = 100 + index;
            return (
              <motion.div
                key={`${card.id}-${index}`}
                initial={{ opacity: 0, y: 20, rotate: angle * 0.15 }}
                animate={{ opacity: 1, y: 0, rotate: angle }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="absolute"
                style={{ left: 260 + x - 40, bottom: 40 + y, zIndex }}
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
            );
          })}
        </div>
      </div>

      {showCards && selectedCards.length === 12 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mt-6 mb-5">
          <p className="text-white text-lg">🎉 {selectedCards.length} random cards revealed!</p>
        </motion.div>
      )}
    </div>
  );
};

export default FanSpreadShowCards;


