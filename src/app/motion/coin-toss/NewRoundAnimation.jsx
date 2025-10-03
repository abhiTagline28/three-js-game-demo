"use client";
import { useRef, useState } from "react";
import { motion, useAnimation, animate } from "framer-motion";
import Three3DCoin from "./Three3DCoin";

const BOX_SIZE = 800; // larger bordered box
const COIN_SIZE = 200; // bigger coin

const ConfettiBurst = ({ size = COIN_SIZE }) => {
  const STRIPS = 42;
  const center = size / 2;
  const colors = [
    "#FF3B30",
    "#34C759",
    "#007AFF",
    "#FFCC00",
    "#AF52DE",
    "#FF9F0A",
  ];
  const strips = Array.from({ length: STRIPS }).map((_, i) => {
    const baseAngle = (i / STRIPS) * Math.PI * 2;
    const angleJitter = (Math.random() - 0.5) * 0.6;
    const angle = baseAngle + angleJitter;
    const burst = 120 + Math.random() * 140;
    const x = Math.cos(angle) * burst;
    const y = Math.sin(angle) * burst * 0.6;
    const fall = 240 + Math.random() * 200;
    const duration = 1.4 + Math.random() * 0.9;
    const delay = Math.random() * 0.12;
    const width = 6 + Math.floor(Math.random() * 6);
    const height = 14 + Math.floor(Math.random() * 16);
    const hue = colors[i % colors.length];
    const rotateZ = (Math.random() * 360) | 0;
    const spin = (Math.random() > 0.5 ? 1 : -1) * (360 + Math.random() * 540);
    const sway = (Math.random() > 0.5 ? 1 : -1) * (20 + Math.random() * 24);
    return {
      x,
      y,
      fall,
      duration,
      delay,
      width,
      height,
      hue,
      rotateZ,
      spin,
      sway,
      key: `${i}-${width}-${height}`,
    };
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <motion.div
        initial={{ opacity: 0.85, scale: 0.2 }}
        animate={{ opacity: 0, scale: 1.8 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          position: "absolute",
          left: center - 36,
          top: center - 36,
          width: 72,
          height: 72,
          borderRadius: "9999px",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,215,0,0.45) 40%, rgba(255,215,0,0) 70%)",
          filter: "blur(1px)",
        }}
      />
      {strips.map((s) => (
        <motion.span
          key={s.key}
          initial={{ x: center, y: center, opacity: 0, rotateZ: s.rotateZ }}
          animate={{
            x: [center, center + s.x, center + s.x + s.sway],
            y: [center, center + s.y, center + s.y + s.fall],
            rotateZ: [s.rotateZ, s.rotateZ + s.spin],
            opacity: [1, 1, 0],
          }}
          transition={{ duration: s.duration, ease: "easeOut", delay: s.delay }}
          style={{
            position: "absolute",
            width: s.width,
            height: s.height,
            borderRadius: 2,
            background: s.hue,
            boxShadow: `0 0 8px ${s.hue}55`,
            transformOrigin: "center",
            mixBlendMode: "plus-lighter",
          }}
        />
      ))}
    </div>
  );
};

const NewRoundAnimation = () => {
  const posControls = useAnimation();
  const [isFlipping, setIsFlipping] = useState(false);
  const [isCentered, setIsCentered] = useState(false);
  const coinRef = useRef(null);

  const flip = async (desired) => {
    function rad(degrees) {
      return degrees * (Math.PI / 180);
    }
    if (isFlipping) return;
    setIsFlipping(true);

    desired = desired || (Math.random() >= 0.5 ? "head" : "tail");
    const resultIsHead = desired === "head";

    const extra = resultIsHead ? 360 : 540;

    await Promise.all([
      posControls.start({
        y: 0,
        transition: { duration: 1, ease: "easeOut" },
        // opacity: 1,
      }),
      animate(
        coinRef.current.rotation,
        { z: coinRef.current.rotation.z + rad(extra) },
        { duration: 0.5, repeat: 1, ease: "linear" }
      ),
    ]);

    setIsCentered(true);

    const margin = 24;
    const shift = BOX_SIZE / 2 - COIN_SIZE / 2 - margin;
    // Wait for 2 seconds after coin reaches center before moving to the right
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await Promise.all([
      posControls.start({
        x: shift,
        transition: { duration: 1.2, ease: "easeInOut" },
      }),
      animate(
        coinRef.current.rotation,
        { y: coinRef.current.rotation.y + rad(360) },
        { duration: 1.1, ease: "easeInOut" }
      ),
    ]);

    // Hide at right, then reset to top and show again
    await posControls.start({ opacity: 0, transition: { duration: 0.2 } });
    posControls.set({ x: 0, y: -(BOX_SIZE / 2), opacity: 1 });

    setIsCentered(false);
    setIsFlipping(false);
  };

  return (
    <div>
      <div
        style={{
          width: BOX_SIZE,
          height: BOX_SIZE,
        }}
        className="relative border-4 border-gray-300 rounded-2xl bg-white/50"
      >
        <motion.div
          animate={posControls}
          initial={{ x: 0, y: -(BOX_SIZE / 2) }}
          style={{
            position: "absolute",
            left: "33%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {isCentered && <ConfettiBurst size={COIN_SIZE} />}
          <Three3DCoin ref={coinRef} />
        </motion.div>
        <div className="h-full flex justify-center items-end py-4">
          <motion.button
            onClick={() => flip()}
            className={`px-4 py-2 rounded-md bg-blue-600 text-white ${
              isFlipping ? "opacity-60" : "hover:bg-blue-700"
            }`}
            disabled={isFlipping}
          >
            {isFlipping ? "Flipping..." : "Flip"}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default NewRoundAnimation;
