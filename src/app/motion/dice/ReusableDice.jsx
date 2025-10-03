"use client";

import React, {
  useMemo,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { motion, useAnimationControls } from "framer-motion";

/**
 * Reusable Dice Component with Framer Motion
 *
 * Features:
 * - Configurable size
 * - Customizable pip styles
 * - Multiple rolling animations
 * - Sound support
 * - Callback support for roll results
 */

const ReusableDice = forwardRef(
  (
    {
      size = 100,
      pipColor = "bg-neutral-900",
      faceColor = "bg-white",
      borderColor = "border-neutral-200",
      shadowColor = "shadow-xl",
      initialValue = 1,
      animationType = "bounce", // bounce, spin, throw, tumble
      onRollComplete = null,
      soundEnabled = true,
      soundSrc = "/sounds/dice-roll.mp3",
      className = "",
      disabled = false,
    },
    ref
  ) => {
    const controls = useAnimationControls();
    const [isRolling, setIsRolling] = useState(false);
    const [value, setValue] = useState(initialValue);
    const audioRef = useRef(null);

    // Expose roll method to parent components
    useImperativeHandle(ref, () => ({
      roll,
      isRolling,
      currentValue: value,
    }));

    // Face rotation mappings - determines which face shows on top
    const faceRotations = useMemo(
      () => ({
        1: { x: 0, y: 0 }, // Front face (1 pip)
        2: { x: 90, y: 0 }, // Bottom face (2 pips)
        3: { x: 0, y: -90 }, // Right face (3 pips)
        4: { x: 0, y: 90 }, // Left face (4 pips)
        5: { x: -90, y: 0 }, // Top face (5 pips)
        6: { x: 180, y: 0 }, // Back face (6 pips)
      }),
      []
    );

    // Animation configurations for different roll types
    const animationConfigs = useMemo(
      () => ({
        bounce: {
          y: [0, -80, 0, -30, 0, -10, 0],
          scale: [1, 0.95, 1, 0.98, 1, 0.99, 1],
          transition: {
            duration: 1.4,
            ease: [0.25, 0.46, 0.45, 0.94],
            times: [0, 0.2, 0.4, 0.65, 0.8, 0.92, 1],
          },
        },
        spin: {
          scale: [1, 1.1, 1],
          transition: {
            duration: 1.6,
            ease: [0.175, 0.885, 0.32, 1.275],
            times: [0, 0.5, 1],
          },
        },
        throw: {
          y: [0, -60, -10, 0],
          x: [0, 20, 5, 0],
          rotateZ: [0, 15, -5, 0],
          scale: [1, 0.9, 1.05, 1],
          transition: {
            duration: 1.8,
            ease: [0.23, 1, 0.32, 1],
            times: [0, 0.4, 0.7, 1],
          },
        },
        tumble: {
          y: [0, -40, -15, 0],
          rotateZ: [0, 180, 270, 360],
          scale: [1, 0.95, 1.02, 1],
          transition: {
            duration: 1.2,
            ease: "easeInOut",
            times: [0, 0.3, 0.7, 1],
          },
        },
      }),
      []
    );

    const roll = async (targetValue = null) => {
      if (isRolling || disabled) return;

      setIsRolling(true);
      const finalValue = targetValue || 1 + Math.floor(Math.random() * 6);
      setValue(finalValue);

      const { x, y } = faceRotations[finalValue];
      const config = animationConfigs[animationType];

      // Generate random spins for more realistic effect
      const spinsX = 2 + Math.floor(Math.random() * 4);
      const spinsY = 2 + Math.floor(Math.random() * 4);

      const animationProps = {
        rotateX: 360 * spinsX + x,
        rotateY: 360 * spinsY + y,
        ...config,
      };

      await controls.start(animationProps);

      if (soundEnabled && audioRef.current) {
        try {
          audioRef.current.currentTime = 0;
          await audioRef.current.play();
        } catch (error) {
          console.warn("Sound playback failed:", error);
        }
      }
      // Play sound if enabled

      setIsRolling(false);

      // Execute callback if provided
      if (onRollComplete) {
        onRollComplete(finalValue);
      }
    };

    // Pip component - customizable dot
    const Pip = ({ className: pipClassName = "" }) => (
      <div className={`w-3 h-3 rounded-full ${pipColor} ${pipClassName}`} />
    );

    // Face style generator
    const faceBase =
      "absolute inset-0 flex items-center justify-center rounded-xl";
    const faceStyle = (transform) => ({
      width: size,
      height: size,
      transform,
      backfaceVisibility: "hidden",
    });

    // Pip patterns for each face (1-6)
    const PipPattern = ({ pips }) => {
      const patterns = {
        1: (
          <div className="grid grid-cols-3 grid-rows-3 gap-2 w-full h-full p-2">
            <div />
            <div />
            <div />
            <div />
            <div className="flex items-center justify-center">
              <Pip />
            </div>
            <div />
            <div />
            <div />
            <div />
          </div>
        ),
        2: (
          <div className="grid grid-cols-3 grid-rows-3 gap-2 w-full h-full p-2">
            <div className="flex items-center justify-center">
              <Pip />
            </div>
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div className="flex items-center justify-center">
              <Pip />
            </div>
          </div>
        ),
        3: (
          <div className="grid grid-cols-3 grid-rows-3 gap-2 w-full h-full p-2">
            <div className="flex items-center justify-center">
              <Pip />
            </div>
            <div />
            <div />
            <div />
            <div className="flex items-center justify-center">
              <Pip />
            </div>
            <div />
            <div />
            <div />
            <div className="flex items-center justify-center">
              <Pip />
            </div>
          </div>
        ),
        4: (
          <div className="grid grid-cols-3 grid-rows-3 gap-2 w-full h-full p-2">
            <div className="flex items-center justify-center">
              <Pip />
            </div>
            <div />
            <div className="flex items-center justify-center">
              <Pip />
            </div>
            <div />
            <div />
            <div />
            <div className="flex items-center justify-center">
              <Pip />
            </div>
            <div />
            <div className="flex items-center justify-center">
              <Pip />
            </div>
          </div>
        ),
        5: (
          <div className="grid grid-cols-3 grid-rows-3 gap-2 w-full h-full p-2">
            <div className="flex items-center justify-center">
              <Pip />
            </div>
            <div />
            <div className="flex items-center justify-center">
              <Pip />
            </div>
            <div />
            <div className="flex items-center justify-center">
              <Pip />
            </div>
            <div />
            <div className="flex items-center justify-center">
              <Pip />
            </div>
            <div />
            <div className="flex items-center justify-center">
              <Pip />
            </div>
          </div>
        ),
        6: (
          <div className="grid grid-cols-3 grid-rows-3 gap-2 w-full h-full p-2">
            <div className="flex items-center justify-center">
              <Pip />
            </div>
            <div className="flex items-center justify-center">
              <Pip />
            </div>
            <div className="flex items-center justify-center">
              <Pip />
            </div>
            <div />
            <div />
            <div />
            <div className="flex items-center justify-center">
              <Pip />
            </div>
            <div className="flex items-center justify-center">
              <Pip />
            </div>
            <div className="flex items-center justify-center">
              <Pip />
            </div>
          </div>
        ),
      };

      return patterns[pips] || patterns[1];
    };

    return (
      <div className={`relative ${className}`} style={{ perspective: 900 }}>
        <motion.div
          animate={controls}
          initial={{ rotateX: 0, rotateY: 0 }}
          className="relative"
          style={{
            width: size,
            height: size,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Front face - 1 pip */}
          <div
            className={`${faceBase} ${faceColor} ${shadowColor} border ${borderColor}`}
            style={faceStyle(`translateZ(${size / 2}px)`)}
          >
            <PipPattern pips={1} />
          </div>

          {/* Back face - 6 pips */}
          <div
            className={`${faceBase} ${faceColor} ${shadowColor} border ${borderColor}`}
            style={faceStyle(`rotateY(180deg) translateZ(${size / 2}px)`)}
          >
            <PipPattern pips={6} />
          </div>

          {/* Right face - 3 pips */}
          <div
            className={`${faceBase} ${faceColor} ${shadowColor} border ${borderColor}`}
            style={faceStyle(`rotateY(90deg) translateZ(${size / 2}px)`)}
          >
            <PipPattern pips={3} />
          </div>

          {/* Left face - 4 pips */}
          <div
            className={`${faceBase} ${faceColor} ${shadowColor} border ${borderColor}`}
            style={faceStyle(`rotateY(-90deg) translateZ(${size / 2}px)`)}
          >
            <PipPattern pips={4} />
          </div>

          {/* Top face - 5 pips */}
          <div
            className={`${faceBase} ${faceColor} ${shadowColor} border ${borderColor}`}
            style={faceStyle(`rotateX(90deg) translateZ(${size / 2}px)`)}
          >
            <PipPattern pips={5} />
          </div>

          {/* Bottom face - 2 pips */}
          <div
            className={`${faceBase} ${faceColor} ${shadowColor} border ${borderColor}`}
            style={faceStyle(`rotateX(-90deg) translateZ(${size / 2}px)`)}
          >
            <PipPattern pips={2} />
          </div>
        </motion.div>

        {/* Audio element for sound effects */}
        {soundEnabled && <audio ref={audioRef} src={soundSrc} preload="auto" />}
      </div>
    );
  }
);

// Hook for controlling the dice externally
export const useDiceController = () => {
  const diceRef = useRef();

  const rollDice = (targetValue = null) => {
    if (typeof diceRef?.current?.roll === "function") {
      diceRef.current.roll(targetValue);
    }
  };

  return { diceRef, rollDice };
};

export default ReusableDice;
