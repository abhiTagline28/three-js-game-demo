"use client";

import React, { useMemo, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

const SIZE = 72;

const Dice = ({ ctrl, left }) => {
  const Pip = () => <div className="w-2.5 h-2.5 rounded-full bg-neutral-900" />;
  const faceBase = "absolute inset-0 flex items-center justify-center";
  const faceStyle = (transform) => ({ width: SIZE, height: SIZE, transform, backfaceVisibility: "hidden" });
  return (
    <div style={{ position: "absolute", left }}>
      <motion.div animate={ctrl} initial={{ rotateX: 0, rotateY: 0, y: -220 }} className="relative" style={{ width: SIZE, height: SIZE, transformStyle: "preserve-3d" }}>
        <div className={`${faceBase} rounded-xl bg-white shadow-xl border border-neutral-200`} style={faceStyle(`translateZ(${SIZE / 2}px)`) }>
          <div className="grid grid-cols-3 grid-rows-3 gap-1.5"><div/> <div/> <div/> <div/> <div className="flex items-center justify-center"><Pip/></div> <div/> <div/> <div/> <div/></div>
        </div>
        <div className={`${faceBase} rounded-xl bg-white shadow-xl border border-neutral-200`} style={faceStyle(`rotateY(180deg) translateZ(${SIZE / 2}px)`) }>
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
        <div className={`${faceBase} rounded-xl bg-white shadow-xl border border-neutral-200`} style={faceStyle(`rotateY(90deg) translateZ(${SIZE / 2}px)`) }>
          <div className="grid grid-cols-3 grid-rows-3 gap-1.5">
            <div className="flex items-center justify-center"><Pip/></div>
            <div/> <div/>
            <div/> <div className="flex items-center justify-center"><Pip/></div> <div/>
            <div/> <div/> <div className="flex items-center justify-center"><Pip/></div>
          </div>
        </div>
        <div className={`${faceBase} rounded-xl bg-white shadow-xl border border-neutral-200`} style={faceStyle(`rotateY(-90deg) translateZ(${SIZE / 2}px)`) }>
          <div className="grid grid-cols-3 grid-rows-3 gap-1.5">
            <div className="flex items-center justify-center"><Pip/></div>
            <div/> <div className="flex items-center justify-center"><Pip/></div>
            <div/> <div/> <div/>
            <div className="flex items-center justify-center"><Pip/></div>
            <div/> <div className="flex items-center justify-center"><Pip/></div>
          </div>
        </div>
        <div className={`${faceBase} rounded-xl bg-white shadow-xl border border-neutral-200`} style={faceStyle(`rotateX(90deg) translateZ(${SIZE / 2}px)`) }>
          <div className="grid grid-cols-3 grid-rows-3 gap-1.5">
            <div className="flex items-center justify-center"><Pip/></div>
            <div/> <div className="flex items-center justify-center"><Pip/></div>
            <div/> <div className="flex items-center justify-center"><Pip/></div> <div/>
            <div className="flex items-center justify-center"><Pip/></div>
            <div/> <div className="flex items-center justify-center"><Pip/></div>
          </div>
        </div>
        <div className={`${faceBase} rounded-xl bg-white shadow-xl border border-neutral-200`} style={faceStyle(`rotateX(-90deg) translateZ(${SIZE / 2}px)`) }>
          <div className="grid grid-cols-3 grid-rows-3 gap-1.5">
            <div className="flex items-center justify-center"><Pip/></div>
            <div/> <div/>
            <div/> <div/> <div/>
            <div/> <div/> <div className="flex items-center justify-center"><Pip/></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const LudoDiceGridRain = () => {
  const controls = new Array(9).fill(0).map(() => useAnimationControls());
  const [busy, setBusy] = useState(false);
  const [values, setValues] = useState(new Array(9).fill(1));
  const audioRef = useRef(null);
  const faceRotations = useMemo(() => ({ 1:{x:-90,y:0},2:{x:180,y:0},3:{x:0,y:-90},4:{x:0,y:90},5:{x:0,y:0},6:{x:90,y:0} }), []);

  const rain = async () => {
    if (busy) return;
    setBusy(true);
    const finals = controls.map(() => 1 + Math.floor(Math.random()*6));
    setValues(finals);
    const spacing = 84;

    const runs = controls.map((ctrl, i) => {
      const { x, y } = faceRotations[finals[i]];
      const col = i % 3;
      const row = Math.floor(i / 3);
      const left = (col - 1) * spacing;
      const endY = row * 70 - 10;
      const delay = (row * 3 + col) * 0.05;
      return ctrl.start({
        x: [left, left],
        y: [-220, -80, endY],
        rotateX: [0, 360, 360 + x],
        rotateY: [0, 360, 360 + y],
        transition: { duration: 1.1, ease: "easeOut", times: [0, 0.55, 1], delay },
      });
    });

    await Promise.all(runs);
    const audio = audioRef.current; if (audio) { try { audio.currentTime=0; await audio.play(); } catch {} }
    setBusy(false);
  };

  return (
    <div className="w-full" style={{ width: 360 }}>
      <h2 className="text-center mt-2">Dice — 3x3 Rain</h2>
      <div className="flex flex-col items-center justify-center py-6">
        <div className="relative" style={{ perspective: 900, height: 260 }}>
          <div className="absolute left-1/2 -translate-x-1/2 top-8">
            {controls.map((ctrl, i) => (
              <Dice key={i} ctrl={ctrl} left={-SIZE/2} />
            ))}
          </div>
        </div>

        <div className="mt-6">
          <motion.button onClick={rain} disabled={busy} className={`px-6 py-3 rounded-xl font-bold text-lg transition-all duration-300 ${busy ? "bg-gray-500 cursor-not-allowed text-white" : "bg-orange-600 hover:bg-orange-700 text-white shadow-lg hover:shadow-xl"}`} whileHover={!busy ? { scale: 1.05 } : {}} whileTap={!busy ? { scale: 0.97 } : {}}>
            {busy ? "Rolling..." : "Rain 9 Dice"}
          </motion.button>
        </div>

        <div className="h-10 flex items-center justify-center mt-4">
          {!busy && <div className="text-white text-xs">Results: {values.join(", ")}</div>}
        </div>
      </div>

      <audio ref={audioRef} src="/sounds/coin-drop.mp3" preload="auto" />
    </div>
  );
};

export default LudoDiceGridRain;


