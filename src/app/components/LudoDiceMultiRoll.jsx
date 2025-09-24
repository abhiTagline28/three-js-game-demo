"use client";

import React, { useMemo, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

const CUBE = 84;

const Dice = ({ ctrl }) => {
  const Pip = () => <div className="w-2.5 h-2.5 rounded-full bg-neutral-900" />;
  const faceBase = "absolute inset-0 flex items-center justify-center";
  const faceStyle = (transform) => ({ width: CUBE, height: CUBE, transform, backfaceVisibility: "hidden" });
  return (
    <motion.div animate={ctrl} initial={{ rotateX: 0, rotateY: 0 }} className="relative" style={{ width: CUBE, height: CUBE, transformStyle: "preserve-3d" }}>
      <div className={`${faceBase} rounded-xl bg-white shadow-xl border border-neutral-200`} style={faceStyle(`translateZ(${CUBE / 2}px)`) }>
        <div className="grid grid-cols-3 grid-rows-3 gap-1.5"><div/> <div/> <div/> <div/> <div className="flex items-center justify-center"><Pip/></div> <div/> <div/> <div/> <div/></div>
      </div>
      <div className={`${faceBase} rounded-xl bg-white shadow-xl border border-neutral-200`} style={faceStyle(`rotateY(180deg) translateZ(${CUBE / 2}px)`) }>
        <div className="grid grid-cols-3 grid-rows-3 gap-1.5">
          <div className="flex items-center justify-center"><Pip/></div>
          <div className="flex items-center justify-center"><Pip/></div>
          <div className="flex items-center justify-center"><Pip/></div>
          <div/> <div/> <div/>
          <div className="flex items-center justify-center"><Pip/></div>
          <div className="flex items-center justify-center"><Pip/></div>
          <div className="flex items-center justify-center"><Pip/></div>
        </div>
      </div>
      <div className={`${faceBase} rounded-xl bg-white shadow-xl border border-neutral-200`} style={faceStyle(`rotateY(90deg) translateZ(${CUBE / 2}px)`) }>
        <div className="grid grid-cols-3 grid-rows-3 gap-1.5">
          <div className="flex items-center justify-center"><Pip/></div>
          <div/> <div/>
          <div/> <div className="flex items-center justify-center"><Pip/></div> <div/>
          <div/> <div/> <div className="flex items-center justify-center"><Pip/></div>
        </div>
      </div>
      <div className={`${faceBase} rounded-xl bg-white shadow-xl border border-neutral-200`} style={faceStyle(`rotateY(-90deg) translateZ(${CUBE / 2}px)`) }>
        <div className="grid grid-cols-3 grid-rows-3 gap-1.5">
          <div className="flex items-center justify-center"><Pip/></div>
          <div/> <div className="flex items-center justify-center"><Pip/></div>
          <div/> <div/> <div/>
          <div className="flex items-center justify-center"><Pip/></div>
          <div/> <div className="flex items-center justify-center"><Pip/></div>
        </div>
      </div>
      <div className={`${faceBase} rounded-xl bg-white shadow-xl border border-neutral-200`} style={faceStyle(`rotateX(90deg) translateZ(${CUBE / 2}px)`) }>
        <div className="grid grid-cols-3 grid-rows-3 gap-1.5">
          <div className="flex items-center justify-center"><Pip/></div>
          <div/> <div className="flex items-center justify-center"><Pip/></div>
          <div/> <div className="flex items-center justify-center"><Pip/></div> <div/>
          <div className="flex items-center justify-center"><Pip/></div>
          <div/> <div className="flex items-center justify-center"><Pip/></div>
        </div>
      </div>
      <div className={`${faceBase} rounded-xl bg-white shadow-xl border border-neutral-200`} style={faceStyle(`rotateX(-90deg) translateZ(${CUBE / 2}px)`) }>
        <div className="grid grid-cols-3 grid-rows-3 gap-1.5">
          <div className="flex items-center justify-center"><Pip/></div>
          <div/> <div/>
          <div/> <div/> <div/>
          <div/> <div/> <div className="flex items-center justify-center"><Pip/></div>
        </div>
      </div>
    </motion.div>
  );
};

const LudoDiceMultiRoll = () => {
  const controls = [0, 1, 2, 3].map(() => useAnimationControls());
  const [busy, setBusy] = useState(false);
  const [values, setValues] = useState([1, 1, 1, 1]);
  const audioRef = useRef(null);
  // Align with face layout used in JSX: front=1, back=6, right=3, left=4, top=2, bottom=5
  const faceRotations = useMemo(
    () => ({
      1: { x: 0, y: 0 },
      2: { x: 90, y: 0 },
      3: { x: 0, y: -90 },
      4: { x: 0, y: 90 },
      5: { x: -90, y: 0 },
      6: { x: 0, y: 180 },
    }),
    []
  );

  const rollAll = async () => {
    if (busy) return;
    setBusy(true);
    const finals = controls.map(() => 1 + Math.floor(Math.random()*6));
    setValues(finals);

    const animations = controls.map((ctrl, i) => {
      const { x, y } = faceRotations[finals[i]];
      const dx = (i - 1.5) * 70;
      const dy = -20 + Math.random()*40;
      const delay = i * 0.08;
      return ctrl.start({
        x: [0, dx*0.6, dx],
        y: [0, -50, dy],
        rotateX: [0, 360 + x],
        rotateY: [0, 360 + y],
        transition: { duration: 1.0, ease: "easeOut", times:[0,0.55,1], delay },
      });
    });

    await Promise.all(animations);
    const audio = audioRef.current; if (audio) { try { audio.currentTime=0; await audio.play(); } catch {} }
    setBusy(false);
  };

  return (
    <div className="w-full" style={{ width: 360 }}>
      <h2 className="text-center mt-2">Dice — 4x Multi Roll</h2>
      <div className="flex flex-col items-center justify-center py-6">
        <div className="relative" style={{ perspective: 900, height: 220 }}>
          <div className="absolute left-1/2 -translate-x-1/2 top-10">
            {controls.map((ctrl, i) => (
              <div key={i} style={{ position: "absolute", left: -CUBE/2 }}>
                <Dice ctrl={ctrl} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <motion.button onClick={rollAll} disabled={busy} className={`px-6 py-3 rounded-xl font-bold text-lg transition-all duration-300 ${busy ? "bg-gray-500 cursor-not-allowed text-white" : "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl"}`} whileHover={!busy ? { scale: 1.05 } : {}} whileTap={!busy ? { scale: 0.97 } : {}}>
            {busy ? "Rolling..." : "Roll 4 Dice"}
          </motion.button>
        </div>

        <div className="h-10 flex items-center justify-center mt-4">
          {!busy && <div className="text-white text-sm">Results: {values.join(", ")}</div>}
        </div>
      </div>

      <audio ref={audioRef} src="/sounds/coin-drop.mp3" preload="auto" />
    </div>
  );
};

export default LudoDiceMultiRoll;


