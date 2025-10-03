"use client";

import React, { useMemo, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

const CUBE = 80;

const Dice = ({ ctrl, offset }) => {
  const Pip = () => <div className="w-3 h-3 rounded-full bg-neutral-900" />;
  const faceBase = "absolute inset-0 flex items-center justify-center";
  const faceStyle = (transform) => ({ width: CUBE, height: CUBE, transform, backfaceVisibility: "hidden" });
  return (
    <motion.div
      animate={ctrl}
      initial={{ rotateX: 0, rotateY: 0, x: offset.x, y: offset.y }}
      className="relative"
      style={{ width: CUBE, height: CUBE, transformStyle: "preserve-3d", position: "absolute", left: -CUBE/2 }}
    >
      <div className={`${faceBase} rounded-xl bg-white shadow-xl border border-neutral-200`} style={faceStyle(`translateZ(${CUBE / 2}px)`) }>
        <div className="grid grid-cols-3 grid-rows-3 gap-2"><div/> <div/> <div/> <div/> <div className="flex items-center justify-center"><Pip/></div> <div/> <div/> <div/> <div/></div>
      </div>
      <div className={`${faceBase} rounded-xl bg-white shadow-xl border border-neutral-200`} style={faceStyle(`rotateY(180deg) translateZ(${CUBE / 2}px)`) }>
        <div className="grid grid-cols-3 grid-rows-3 gap-2">
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
        <div className="grid grid-cols-3 grid-rows-3 gap-2">
          <div className="flex items-center justify-center"><Pip/></div>
          <div/> <div/>
          <div/> <div className="flex items-center justify-center"><Pip/></div> <div/>
          <div/> <div/> <div className="flex items-center justify-center"><Pip/></div>
        </div>
      </div>
      <div className={`${faceBase} rounded-xl bg-white shadow-xl border border-neutral-200`} style={faceStyle(`rotateY(-90deg) translateZ(${CUBE / 2}px)`) }>
        <div className="grid grid-cols-3 grid-rows-3 gap-2">
          <div className="flex items-center justify-center"><Pip/></div>
          <div/> <div className="flex items-center justify-center"><Pip/></div>
          <div/> <div/> <div/>
          <div className="flex items-center justify-center"><Pip/></div>
          <div/> <div className="flex items-center justify-center"><Pip/></div>
        </div>
      </div>
      <div className={`${faceBase} rounded-xl bg-white shadow-xl border border-neutral-200`} style={faceStyle(`rotateX(90deg) translateZ(${CUBE / 2}px)`) }>
        <div className="grid grid-cols-3 grid-rows-3 gap-2">
          <div className="flex items-center justify-center"><Pip/></div>
          <div/> <div className="flex items-center justify-center"><Pip/></div>
          <div/> <div className="flex items-center justify-center"><Pip/></div> <div/>
          <div className="flex items-center justify-center"><Pip/></div>
          <div/> <div className="flex items-center justify-center"><Pip/></div>
        </div>
      </div>
      <div className={`${faceBase} rounded-xl bg-white shadow-xl border border-neutral-200`} style={faceStyle(`rotateX(-90deg) translateZ(${CUBE / 2}px)`) }>
        <div className="grid grid-cols-3 grid-rows-3 gap-2">
          <div className="flex items-center justify-center"><Pip/></div>
          <div/> <div/>
          <div/> <div/> <div/>
          <div/> <div/> <div className="flex items-center justify-center"><Pip/></div>
        </div>
      </div>
    </motion.div>
  );
};

const LudoDicePairRoll = () => {
  const controls = [0, 1].map(() => useAnimationControls());
  const [busy, setBusy] = useState(false);
  const [values, setValues] = useState([1, 1]);
  const audioRef = useRef(null);
  const faceRotations = useMemo(
    () => ({
      1: { x: 0, y: 0 },
      2: { x: 90, y: 0 },
      3: { x: 0, y: -90 },
      4: { x: 0, y: 90 },
      5: { x: -90, y: 0 },
      6: { x: 180, y: 0 },
    }),
    []
  );

  const roll = async () => {
    if (busy) return;
    setBusy(true);
    const finals = controls.map(() => 1 + Math.floor(Math.random()*6));
    setValues(finals);

    const animations = controls.map((ctrl, i) => {
      const { x, y } = faceRotations[finals[i]];
      const dir = i === 0 ? -1 : 1;
      return ctrl.start({
        x: [dir * 40 * 0.3, dir * 40],
        y: [0, -60, -10],
        rotateX: [
          0,
          200,
          320,
          360 + x,
          200 + 360 + x,
          320 + 360 + x,
          360 + 360 + x,
        ],
        rotateY: [
          0,
          160,
          280,
          360 + y,
          160 + 360 + y,
          280 + 360 + y,
          360 + 360 + y,
        ],
        rotateZ: [0, 10 * dir, 0],
        transition: { duration: 1.5, ease: "easeOut", times: [0, 0.6, 1] },
      });
    });

    await Promise.all(animations);
    const audio = audioRef.current; if (audio) { try { audio.currentTime=0; await audio.play(); } catch {} }
    setBusy(false);
  };

  return (
    <div className="w-full" style={{ width: 360 }}>
      <h2 className="text-center mt-2">Dice — Pair Roll</h2>
      <div className="flex flex-col items-center justify-center py-6">
        <div className="relative" style={{ perspective: 900, height: 200 }}>
          <div className="absolute left-1/2 -translate-x-1/2 top-12">
            <Dice ctrl={controls[0]} offset={{ x: -48, y: 0 }} />
            <Dice ctrl={controls[1]} offset={{ x: 48, y: 0 }} />
          </div>
        </div>

        <div className="mt-6">
          <motion.button onClick={roll} disabled={busy} className={`px-6 py-3 rounded-xl font-bold text-lg transition-all duration-300 ${busy ? "bg-gray-500 cursor-not-allowed text-white" : "bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg hover:shadow-xl"}`} whileHover={!busy ? { scale: 1.05 } : {}} whileTap={!busy ? { scale: 0.97 } : {}}>
            {busy ? "Rolling..." : "Roll Pair"}
          </motion.button>
        </div>

        <div className="h-10 flex items-center justify-center mt-4">
          {!busy && <div className="text-white text-sm">Results: {values.join(" + ")} = {values[0] + values[1]}</div>}
        </div>
      </div>

      <audio ref={audioRef} src="/sounds/coin-drop.mp3" preload="auto" />
    </div>
  );
};

export default LudoDicePairRoll;