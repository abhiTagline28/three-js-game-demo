"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

const CarouselShowCards = () => {
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
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  const getCardColor = (suit) =>
    suit === "♥" || suit === "♦" ? "text-red-600" : "text-black";
  const getSuitSymbol = (suit) => suit;

  const handleShowCards = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSelectedCards([]);
    setActiveIndex(0);

    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    const randomCards = shuffled.slice(0, 12);

    randomCards.forEach((card, index) => {
      setTimeout(() => {
        setSelectedCards((prev) => [...prev, card]);
        if (index === randomCards.length - 1) {
          setIsAnimating(false);
        }
      }, (index + 1) * 150);
    });
  };

  // Auto-advance focus along the row
  useEffect(() => {
    if (selectedCards.length === 0) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % selectedCards.length;
        const node = containerRef.current;
        if (node) {
          const child = node.children[next];
          if (child)
            child.scrollIntoView({
              behavior: "smooth",
              inline: "center",
              block: "nearest",
            });
        }
        return next;
      });
    }, 1200);
    return () => clearInterval(id);
  }, [selectedCards.length]);

  return (
    <div className="w-full" style={{ width: 980, border: "1px solid red" }}>
      <h1 className="text-center mt-2">Andar Bahar Game Example</h1>
      <h1 className="text-center mt-2">Carousel Cards (auto-scroll)</h1>
      <div className="text-center mb-8 mt-5">
        <motion.button
          onClick={handleShowCards}
          disabled={isAnimating}
          className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
            isAnimating
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-700 hover:to-sky-700 shadow-lg hover:shadow-xl"
          } text-white`}
          whileHover={!isAnimating ? { scale: 1.05 } : {}}
          whileTap={!isAnimating ? { scale: 0.95 } : {}}
        >
          {isAnimating ? "Revealing Cards..." : "Show Cards"}
        </motion.button>
      </div>

      <div className="min-h-[200px] flex justify-center items-center mb-5 overflow-x-auto">
        <div ref={containerRef} className="inline-flex flex-nowrap gap-3 px-4">
          {selectedCards.map((card, index) => {
            const isActive = index === activeIndex;
            return (
              <motion.div
                key={`${card.id}-${index}`}
                animate={{ scale: isActive ? 1.1 : 1, y: isActive ? -6 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <div
                  className={`w-16 h-24 bg-white rounded-lg border-2 ${
                    isActive
                      ? "border-yellow-400 shadow-[0_0_0_3px_rgba(250,204,21,0.5)]"
                      : "border-gray-300 shadow-lg"
                  } overflow-hidden`}
                >
                  <div className="p-2 h-full flex flex-col justify-between">
                    <div className="flex flex-col items-start leading-none">
                      <div
                        className={`text-sm font-bold leading-none ${getCardColor(
                          card.suit
                        )}`}
                      >
                        {card.value}
                      </div>
                      <div
                        className={`text-xs leading-none ${getCardColor(
                          card.suit
                        )}`}
                      >
                        {getSuitSymbol(card.suit)}
                      </div>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <div
                        className={`text-xl leading-none ${getCardColor(
                          card.suit
                        )}`}
                      >
                        {getSuitSymbol(card.suit)}
                      </div>
                    </div>
                    <div className="flex flex-col items-end transform rotate-180 leading-none">
                      <div
                        className={`text-sm font-bold leading-none ${getCardColor(
                          card.suit
                        )}`}
                      >
                        {card.value}
                      </div>
                      <div
                        className={`text-xs leading-none ${getCardColor(
                          card.suit
                        )}`}
                      >
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
    </div>
  );
};

export default CarouselShowCards;
