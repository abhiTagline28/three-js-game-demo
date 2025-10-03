"use client";

import React, { useMemo, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

const CUBE_SIZE = 112;

const LudoDiceScatter = () => {
  const controls = useAnimationControls();
  const [isRolling, setIsRolling] = useState(false);
  const [value, setValue] = useState(1);
  const audioRef = useRef(null);

  const faceRotations = useMemo(
    () => ({
      1: { x: 0, y: 0 },
      2: { x: -90, y: 0 },
      3: { x: 0, y: -90 },
      4: { x: 0, y: 90 },
      5: { x: 90, y: 0 },
      6: { x: 180, y: 0 },
    }),
    []
  );

  const roll = async () => {
    if (isRolling) return;
    setIsRolling(true);
    const final = 1 + Math.floor(Math.random() * 6);
    setValue(final);
    const { x, y } = faceRotations[final];
    const dx = (Math.random() - 0.5) * 220;
    const dy = (Math.random() - 0.2) * 90;

    await controls.start({
      x: [0, dx * 0.7, dx],
      y: [0, -60, dy],
      rotateX: [0, 540 + x],
      rotateY: [0, 540 + y],
      rotateZ: [0, 15, -8, 0],
      transition: { duration: 1.3, ease: "easeOut", times: [0, 0.5, 1] },
    });

    const audio = audioRef.current; if (audio) { try { audio.currentTime = 0; await audio.play(); } catch {} }
    setIsRolling(false);
  };

  const Pip = () => <div className="w-3 h-3 rounded-full bg-neutral-900" />;
  const faceBase = "absolute inset-0 flex items-center justify-center";
  const faceStyle = (transform) => ({ width: CUBE_SIZE, height: CUBE_SIZE, transform, backfaceVisibility: "hidden" });

  return (
    <div className="w-full" style={{ width: 360 }}>
      <h2 className="text-center mt-2">Dice — Scatter</h2>
      <div className="flex flex-col items-center justify-center py-6">
        <div className="relative" style={{ perspective: 900 }}>
          <motion.div
            animate={controls}
            initial={{ rotateX: 0, rotateY: 0 }}
            className="relative"
            style={{ width: CUBE_SIZE, height: CUBE_SIZE, transformStyle: "preserve-3d" }}
          >
            {/* faces */}
            <div className={`${faceBase} rounded-xl bg-white shadow-xl border border-neutral-200`} style={faceStyle(`translateZ(${CUBE_SIZE / 2}px)`) }>
              <div className="grid grid-cols-3 grid-rows-3 gap-2">
                <div /> <div /> <div />
                <div /> <div className="flex items-center justify-center"><Pip /></div> <div />
                <div /> <div /> <div />
              </div>
            </div>
            <div className={`${faceBase} rounded-xl bg-white shadow-xl border border-neutral-200`} style={faceStyle(`rotateY(180deg) translateZ(${CUBE_SIZE / 2}px)`) }>
              <div className="grid grid-cols-3 grid-rows-3 gap-2">
                <div className="flex items-center justify-center"><Pip /></div>
                <div className="flex items-center justify-center"><Pip /></div>
                <div className="flex items-center justify-center"><Pip /></div>
                <div /> <div /> <div />
                <div className="flex items-center justify-center"><Pip /></div>
                <div className="flex items-center justifycenter"><Pip /></div>
                <div className="flex items-center justify-center"><Pip /></div>
              </div>
            </div>
            <div className={`${faceBase} rounded-xl bg-white shadow-xl border border-neutral-200`} style={faceStyle(`rotateY(90deg) translateZ(${CUBE_SIZE / 2}px)`) }>
              <div className="grid grid-cols-3 grid-rows-3 gap-2">
                <div className="flex items-center justify-center"><Pip /></div>
                <div /> <div />
                <div /> <div className="flex items-center justify-center"><Pip /></div> <div />
                <div /> <div /> <div className="flex items-center justify-center"><Pip /></div>
              </div>
            </div>
            <div className={`${faceBase} rounded-xl bg-white shadow-xl border border-neutral-200`} style={faceStyle(`rotateY(-90deg) translateZ(${CUBE_SIZE / 2}px)`) }>
              <div className="grid grid-cols-3 grid-rows-3 gap-2">
                <div className="flex items-center justify-center"><Pip /></div>
                <div /> <div className="flex items-center justify-center"><Pip /></div>
                <div /> <div /> <div />
                <div className="flex items-center justify-center"><Pip /></div>
                <div /> <div className="flex items-center justify-center"><Pip /></div>
              </div>
            </div>
            <div className={`${faceBase} rounded-xl bg-white shadow-xl border border-neutral-200`} style={faceStyle(`rotateX(90deg) translateZ(${CUBE_SIZE / 2}px)`) }>
              <div className="grid grid-cols-3 grid-rows-3 gap-2">
                <div className="flex items-center justify-center"><Pip /></div>
                <div /> <div className="flex items-center justify-center"><Pip /></div>
                <div /> <div className="flex items-center justify-center"><Pip /></div> <div />
                <div className="flex items-center justify-center"><Pip /></div>
                <div /> <div className="flex items-center justify-center"><Pip /></div>
              </div>
            </div>
            <div className={`${faceBase} rounded-xl bg-white shadow-xl border border-neutral-200`} style={faceStyle(`rotateX(-90deg) translateZ(${CUBE_SIZE / 2}px)`) }>
              <div className="grid grid-cols-3 grid-rows-3 gap-2">
                <div className="flex items-center justify-center"><Pip /></div>
                <div /> <div />
                <div /> <div /> <div />
                <div /> <div /> <div className="flex items-center justify-center"><Pip /></div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-6">
          <motion.button onClick={roll} disabled={isRolling} className={`px-6 py-3 rounded-xl font-bold text-lg transition-all duration-300 ${isRolling ? "bg-gray-500 cursor-not-allowed text-white" : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"}`} whileHover={!isRolling ? { scale: 1.05 } : {}} whileTap={!isRolling ? { scale: 0.97 } : {}}>
            {isRolling ? "Rolling..." : "Roll (Scatter)"}
          </motion.button>
        </div>

        <div className="h-10 flex items-center justify-center mt-4">
          {!isRolling && (<motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-white text-lg">Result: {value}</motion.div>)}
        </div>
      </div>

      <audio ref={audioRef} src="/sounds/coin-drop.mp3" preload="auto" />
    </div>
  );
};

export default LudoDiceScatter;


