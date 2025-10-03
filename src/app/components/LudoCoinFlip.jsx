"use client";

import React, { useMemo, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

// True 3D dice cube roll using CSS 3D transforms

const CUBE_SIZE = 128; // px

const LudoCoinFlip = () => {
  const controls = useAnimationControls();
  const [isRolling, setIsRolling] = useState(false);
  const [value, setValue] = useState(1);
  const audioRef = useRef(null);

  // Map final top face value -> cube orientation (rotateX, rotateY)
  // Face assignments: front=1, back=6, right=3, left=4, top=5, bottom=2
  const faceRotations = useMemo(
    () => ({
      1: { x: 0, y: 0, }, // bring front to top
      // NOTE: On this cube build, 2 and 6 were inverted in practice.
      // Swap mappings so the displayed top face matches the reported value.
      2: { x: 90, y: 0 }, // back to top (renders the 2 face in this build)
      3: { x: 0, y: -90 }, // right to top
      4: { x: 0, y: 90 }, // left to top
      5: {  x: -90, y: 0 }, // top already
      6: { x: 180, y: 0 }, // bottom to top (renders the 6 face in this build)
    }),
    []
  );

  const roll = async () => {
    if (isRolling) return;
    setIsRolling(true);

    // Random spins before landing
    const spinsX = 2 + Math.floor(Math.random() * 4); // 2..5
    const spinsY = 2 + Math.floor(Math.random() * 4);
    const final = 1 + Math.floor(Math.random() * 6);
    setValue(final);

    const { x, y } = faceRotations[final];

    await controls.start({
      rotateX: 360 * spinsX + x,
      rotateY: 360 * spinsY + y,
      transition: { duration: 1.35, ease: "easeOut" },
    });

    const audio = audioRef.current;
    if (audio) {
      try {
        audio.currentTime = 0;
        await audio.play();
      } catch {}
    }

    setIsRolling(false);
  };

  const Pip = () => <div className="w-3 h-3 rounded-full bg-neutral-900" />;

  const faceBase = "absolute inset-0 flex items-center justify-center";
  const faceStyle = (transform) => ({
    width: CUBE_SIZE,
    height: CUBE_SIZE,
    transform,
    backfaceVisibility: "hidden",
  });

  return (
    <div className="w-full" style={{ width: 360, border: "1px solid red" }}>
      <h1 className="text-center mt-2">Ludo Dice (3D)</h1>
      <div className="flex flex-col items-center justify-center py-6">
        <div className="relative" style={{ perspective: 900 }}>
          <motion.div
            animate={controls}
            initial={{ rotateX: 0, rotateY: 0 }}
            className="relative"
            style={{ width: CUBE_SIZE, height: CUBE_SIZE, transformStyle: "preserve-3d" }}
          >
            {/* FRONT (1) */}
            <div className={`${faceBase} rounded-xl bg-white shadow-xl border border-neutral-200`} style={faceStyle(`translateZ(${CUBE_SIZE / 2}px)`) }>
              <div className="grid grid-cols-3 grid-rows-3 gap-2">
                <div />
                <div />
                <div />
                <div />
                <div className="flex items-center justify-center"><Pip /></div>
                <div />
                <div />
                <div />
                <div />
              </div>
            </div>
            {/* BACK (6) */}
            <div className={`${faceBase} rounded-xl bg-white shadow-xl border border-neutral-200`} style={faceStyle(`rotateY(180deg) translateZ(${CUBE_SIZE / 2}px)`) }>
              <div className="grid grid-cols-3 grid-rows-3 gap-2">
                <div className="flex items-center justify-center"><Pip /></div>
                <div className="flex items-center justify-center"><Pip /></div>
                <div className="flex items-center justify-center"><Pip /></div>
                <div />
                <div />
                <div />
                <div className="flex items-center justify-center"><Pip /></div>
                <div className="flex items-center justify-center"><Pip /></div>
                <div className="flex items-center justify-center"><Pip /></div>
              </div>
            </div>
            {/* RIGHT (3) */}
            <div className={`${faceBase} rounded-xl bg-white shadow-xl border border-neutral-200`} style={faceStyle(`rotateY(90deg) translateZ(${CUBE_SIZE / 2}px)`) }>
              <div className="grid grid-cols-3 grid-rows-3 gap-2">
                <div className="flex items-center justify-center"><Pip /></div>
                <div />
                <div />
                <div />
                <div className="flex items-center justify-center"><Pip /></div>
                <div />
                <div />
                <div />
                <div className="flex items-center justify-center"><Pip /></div>
              </div>
            </div>
            {/* LEFT (4) */}
            <div className={`${faceBase} rounded-xl bg-white shadow-xl border border-neutral-200`} style={faceStyle(`rotateY(-90deg) translateZ(${CUBE_SIZE / 2}px)`) }>
              <div className="grid grid-cols-3 grid-rows-3 gap-2">
                <div className="flex items-center justify-center"><Pip /></div>
                <div />
                <div className="flex items-center justify-center"><Pip /></div>
                <div />
                <div />
                <div />
                <div className="flex items-center justify-center"><Pip /></div>
                <div />
                <div className="flex items-center justify-center"><Pip /></div>
              </div>
            </div>
            {/* TOP (5) */}
            <div className={`${faceBase} rounded-xl bg-white shadow-xl border border-neutral-200`} style={faceStyle(`rotateX(90deg) translateZ(${CUBE_SIZE / 2}px)`) }>
              <div className="grid grid-cols-3 grid-rows-3 gap-2">
                <div className="flex items-center justify-center"><Pip /></div>
                <div />
                <div className="flex items-center justify-center"><Pip /></div>
                <div />
                <div className="flex items-center justify-center"><Pip /></div>
                <div />
                <div className="flex items-center justify-center"><Pip /></div>
                <div />
                <div className="flex items-center justify-center"><Pip /></div>
              </div>
            </div>
            {/* BOTTOM (2) */}
            <div className={`${faceBase} rounded-xl bg-white shadow-xl border border-neutral-200`} style={faceStyle(`rotateX(-90deg) translateZ(${CUBE_SIZE / 2}px)`) }>
              <div className="grid grid-cols-3 grid-rows-3 gap-2">
                <div className="flex items-center justify-center"><Pip /></div>
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div className="flex items-center justify-center"><Pip /></div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-6">
          <motion.button
            onClick={roll}
            disabled={isRolling}
            className={`px-6 py-3 rounded-xl font-bold text-lg transition-all duration-300 ${
              isRolling
                ? "bg-gray-500 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
            }`}
            whileHover={!isRolling ? { scale: 1.05 } : {}}
            whileTap={!isRolling ? { scale: 0.97 } : {}}
          >
            {isRolling ? "Rolling..." : "Roll Dice"}
          </motion.button>
        </div>

        <div className="h-10 flex items-center justify-center mt-4">
          {!isRolling && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-white text-lg">
              Result: {value}
            </motion.div>
          )}
        </div>
      </div>

      <audio ref={audioRef} src="/sounds/coin-drop.mp3" preload="auto" />
    </div>
  );
};

export default LudoCoinFlip;


