"use client";

import React, { useMemo, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { motion, useAnimationControls } from "framer-motion";

/**
 * Reusable Coin Flip Component with Framer Motion
 * 
 * Features:
 * - Configurable size and styling
 * - Multiple flip animation types
 * - Sound support
 * - Custom heads/tails designs
 * - Callback support for flip results
 * - Realistic physics simulation
 */

const ReusableCoin = forwardRef(({
  size = 100,
  thickness = 8,
  headColor = "bg-yellow-500",
  tailColor = "bg-yellow-400",
  edgeColor = "bg-yellow-600",
  shadowColor = "shadow-xl",
  borderColor = "border-yellow-300",
  headsText = "H",
  tailsText = "T",
  headsIcon = "👑",
  tailsIcon = "🏛️",
  showText = true,
  showIcon = true,
  initialSide = "heads", // heads or tails
  animationType = "flip", // flip, spin, toss, wobble
  onFlipComplete = null,
  soundEnabled = true,
  soundSrc = "/sounds/coin-drop.mp3",
  className = "",
  disabled = false,
  flipDuration = 1.5,
  customHeadsContent = null,
  customTailsContent = null
}, ref) => {
  const controls = useAnimationControls();
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState(initialSide);
  const audioRef = useRef(null);

  // Expose flip method to parent components
  useImperativeHandle(ref, () => ({
    flip,
    isFlipping,
    currentResult: result
  }));

  // Animation configurations for different flip types
  const animationConfigs = useMemo(
    () => ({
      flip: {
        rotateX: [0, 1080], // 3 full rotations
        y: [0, -60, 0],
        scale: [1, 0.9, 1],
        transition: {
          duration: flipDuration,
          ease: [0.23, 1, 0.320, 1],
          times: [0, 0.5, 1]
        },
      },
      spin: {
        rotateY: [0, 1440], // 4 rotations on Y axis
        rotateX: [0, 360],  // 1 rotation on X axis
        scale: [1, 1.1, 1],
        transition: {
          duration: flipDuration * 1.2,
          ease: [0.175, 0.885, 0.32, 1.275],
          times: [0, 0.5, 1]
        },
      },
      toss: {
        y: [0, -120, -80, 0],
        rotateX: [0, 720, 1080, 1440], // 4 rotations
        rotateZ: [0, 45, -30, 0],
        scale: [1, 0.8, 0.9, 1],
        transition: {
          duration: flipDuration * 1.3,
          ease: [0.25, 0.46, 0.45, 0.94],
          times: [0, 0.3, 0.7, 1]
        },
      },
      wobble: {
        rotateX: [0, 180, 360, 540, 720],
        rotateZ: [0, -15, 15, -10, 0],
        y: [0, -30, 0, -15, 0],
        scale: [1, 0.95, 1.05, 0.98, 1],
        transition: {
          duration: flipDuration,
          ease: "easeInOut",
          times: [0, 0.25, 0.5, 0.75, 1]
        },
      },
    }),
    [flipDuration]
  );

  const flip = async (targetResult = null) => {
    if (isFlipping || disabled) return;

    setIsFlipping(true);
    const finalResult = targetResult || (Math.random() < 0.5 ? "heads" : "tails");
    
    // Calculate the final rotation needed to show the correct side
    const currentRotation = result === "heads" ? 0 : 180;
    const targetRotation = finalResult === "heads" ? 0 : 180;
    const config = animationConfigs[animationType];
    
    // Adjust rotations to end on the correct side
    let finalRotations;
    if (animationType === "flip") {
      finalRotations = config.rotateX[1] + targetRotation;
      if (finalResult === "tails") {
        finalRotations += 180;
      }
    } else {
      finalRotations = config.rotateX ? config.rotateX[config.rotateX.length - 1] : 0;
      if (finalResult === "tails") {
        finalRotations += 180;
      }
    }

    const animationProps = {
      ...config,
      rotateX: animationType === "flip" ? [currentRotation, finalRotations] : 
               config.rotateX ? [...config.rotateX.slice(0, -1), finalRotations] : [0, finalRotations]
    };

    await controls.start(animationProps);

    // Play sound if enabled
    if (soundEnabled && audioRef.current) {
      try {
        audioRef.current.currentTime = 0;
        await audioRef.current.play();
      } catch (error) {
        console.warn("Sound playback failed:", error);
      }
    }

    setResult(finalResult);
    setIsFlipping(false);

    // Execute callback if provided
    if (onFlipComplete) {
      onFlipComplete(finalResult);
    }
  };

  // Coin face content renderer
  const CoinFaceContent = ({ side, customContent, text, icon }) => {
    if (customContent) {
      return customContent;
    }

    return (
      <div className="flex flex-col items-center justify-center h-full">
        {showIcon && (
          <div className="text-2xl mb-1" style={{ fontSize: size * 0.25 }}>
            {icon}
          </div>
        )}
        {showText && (
          <div className="font-bold text-white" style={{ fontSize: size * 0.2 }}>
            {text}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`relative ${className}`} style={{ perspective: 1000 }}>
      <motion.div
        animate={controls}
        initial={{ rotateX: initialSide === "heads" ? 0 : 180 }}
        className="relative"
        style={{ 
          width: size, 
          height: size, 
          transformStyle: "preserve-3d" 
        }}
      >
        {/* Heads side */}
        <div 
          className={`absolute inset-0 rounded-full ${headColor} ${shadowColor} border-2 ${borderColor} flex items-center justify-center`}
          style={{
            width: size,
            height: size,
            transform: `translateZ(${thickness/2}px)`,
            backfaceVisibility: "hidden"
          }}
        >
          <CoinFaceContent
            side="heads"
            customContent={customHeadsContent}
            text={headsText}
            icon={headsIcon}
          />
        </div>

        {/* Tails side */}
        <div 
          className={`absolute inset-0 rounded-full ${tailColor} ${shadowColor} border-2 ${borderColor} flex items-center justify-center`}
          style={{
            width: size,
            height: size,
            transform: `rotateX(180deg) translateZ(${thickness/2}px)`,
            backfaceVisibility: "hidden"
          }}
        >
          <CoinFaceContent
            side="tails"
            customContent={customTailsContent}
            text={tailsText}
            icon={tailsIcon}
          />
        </div>

        {/* Edge of the coin */}
        <div 
          className={`absolute rounded-full ${edgeColor}`}
          style={{
            width: size,
            height: thickness,
            left: 0,
            top: (size - thickness) / 2,
            transform: `rotateX(90deg) translateZ(${thickness/2}px)`,
          }}
        />
      </motion.div>

      {/* Audio element for sound effects */}
      {soundEnabled && (
        <audio ref={audioRef} src={soundSrc} preload="auto" />
      )}
    </div>
  );
});

// Add display name for better debugging
ReusableCoin.displayName = 'ReusableCoin';

// Hook for controlling the coin externally
export const useCoinController = () => {
  const coinRef = useRef(null);
  
  const flipCoin = (targetResult = null) => {
    if (typeof coinRef.current.flip === "function") {
      coinRef.current.flip(targetResult);
    }
  };
  return { coinRef, flipCoin };
};

// Preset coin designs
export const CoinPresets = {
  classic: {
    headColor: "bg-yellow-500",
    tailColor: "bg-yellow-400",
    headsIcon: "👑",
    tailsIcon: "🏛️",
    headsText: "H",
    tailsText: "T"
  },
  bitcoin: {
    headColor: "bg-orange-500",
    tailColor: "bg-orange-400",
    headsIcon: "₿",
    tailsIcon: "₿",
    headsText: "BTC",
    tailsText: "BTC"
  },
  dollar: {
    headColor: "bg-green-600",
    tailColor: "bg-green-500",
    headsIcon: "💵",
    tailsIcon: "🦅",
    headsText: "$",
    tailsText: "USA"
  },
  euro: {
    headColor: "bg-blue-600",
    tailColor: "bg-blue-500",
    headsIcon: "€",
    tailsIcon: "🌟",
    headsText: "EUR",
    tailsText: "EU"
  },
  custom: {
    headColor: "bg-purple-600",
    tailColor: "bg-pink-600",
    headsIcon: "🌟",
    tailsIcon: "💫",
    headsText: "WIN",
    tailsText: "TRY"
  }
};

export default ReusableCoin;