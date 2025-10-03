"use client";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const BOX_SIZE = 900; // larger bordered box
const COIN_SIZE = 200; // bigger coin

// Lightweight fireworks burst shown when coin reaches center
const FireCrackers = ({ size = COIN_SIZE }) => {
  const PARTICLE_COUNT = 56; // more particles
  const colors = [
    "#FFD700",
    "#FF4D4D",
    "#00E0FF",
    "#7CFC00",
    "#FF69B4",
    "#FFA500",
  ];
  const particles = Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
    const baseAngle = (i / PARTICLE_COUNT) * Math.PI * 2;
    const angle = baseAngle + (Math.random() - 0.5) * 0.3;
    const distance = 140 + Math.random() * 120; // larger spread
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    const duration = 1.1 + Math.random() * 0.7; // longer life
    const delay = Math.random() * 0.2;
    const dotSize = 8 + Math.floor(Math.random() * 6); // bigger dots
    const color = colors[i % colors.length];
    return { x, y, duration, delay, dotSize, color, key: `${i}-${dotSize}` };
  });

  const center = size / 2;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* Expanding glow rings (dual for impact, longer fade) */}
      <motion.div
        initial={{
          opacity: 0.6,
          width: 20,
          height: 20,
          left: center - 10,
          top: center - 10,
          borderWidth: 4,
        }}
        animate={{
          opacity: 0.05,
          width: size + 160,
          height: size + 160,
          left: center - (size + 160) / 2,
          top: center - (size + 160) / 2,
          borderWidth: 1,
        }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        style={{
          position: "absolute",
          borderStyle: "solid",
          borderColor: "rgba(255,215,0,0.55)",
          borderRadius: "9999px",
          filter: "drop-shadow(0 0 18px rgba(255,215,0,0.45))",
        }}
      />
      <motion.div
        initial={{
          opacity: 0.45,
          width: 10,
          height: 10,
          left: center - 5,
          top: center - 5,
          borderWidth: 2,
        }}
        animate={{
          opacity: 0,
          width: size + 220,
          height: size + 220,
          left: center - (size + 220) / 2,
          top: center - (size + 220) / 2,
          borderWidth: 1,
        }}
        transition={{ duration: 2.2, ease: "easeOut", delay: 0.08 }}
        style={{
          position: "absolute",
          borderStyle: "solid",
          borderColor: "rgba(255,165,0,0.45)",
          borderRadius: "9999px",
          filter: "drop-shadow(0 0 22px rgba(255,165,0,0.45))",
        }}
      />

      {/* lingering central glow */}
      <motion.div
        initial={{ opacity: 0.8, scale: 0.2 }}
        animate={{ opacity: 0, scale: 1.6 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        style={{
          position: "absolute",
          left: center - 24,
          top: center - 24,
          width: 48,
          height: 48,
          borderRadius: "9999px",
          background:
            "radial-gradient(circle, rgba(255,215,0,0.85) 0%, rgba(255,215,0,0.25) 45%, rgba(255,215,0,0) 70%)",
          filter: "blur(2px)",
        }}
      />

      {/* Particles */}
      {particles.map((p) => (
        <motion.span
          key={p.key}
          initial={{
            x: center,
            y: center,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            x: center + p.x,
            y: center + p.y,
            opacity: [0.95, 0.9, 0],
            scale: [0.8, 1, 1],
          }}
          transition={{ duration: p.duration, ease: "easeOut", delay: p.delay }}
          style={{
            position: "absolute",
            width: p.dotSize,
            height: p.dotSize,
            borderRadius: "9999px",
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(255,255,255,0.3) 40%, transparent 70%)",
            boxShadow: `0 0 10px ${p.color}, 0 0 22px ${p.color}`,
            mixBlendMode: "screen",
          }}
        />
      ))}
    </div>
  );
};

const HeadShow5 = () => {
  const posControls = useAnimation();
  const rotControls = useAnimation();
  const [rotationY, setRotationY] = useState(0);
  const [rotationZ, setRotationZ] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isCentered, setIsCentered] = useState(false);

  const flip = async (desired) => {
    if (isFlipping) return;
    setIsFlipping(true);
    // Reset position to top-center for every flip
    posControls.set({ x: 0, y: -(BOX_SIZE / 2) });
    rotControls.set({ rotateZ: 0 });
    setIsCentered(false);
    const resultIsHead =
      desired === "head"
        ? true
        : desired === "tail"
        ? false
        : Math.random() >= 0.5;
    const extra = resultIsHead ? 0 : 180; // end on head (0) or tail (180)
    // Step 1: ensure coin moves from top center to center first
    const dropTarget = rotationY + 360; // rotate 1 spin while moving down
    await Promise.all([
      posControls.start({
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
      }),
      rotControls.start({
        rotateY: dropTarget,
        transition: { duration: 0.6, ease: "easeOut" },
      }),
    ]);
    setRotationY(dropTarget);
    setIsCentered(true);
    // Step 2: flip animation to decide final face
    const mainTarget = rotationY + 360 + extra; // another spin to land on side
    setRotationY(mainTarget);
    await rotControls.start({
      rotateY: mainTarget,
      transition: { duration: 0.9, ease: "easeInOut" },
    });
    // Step 3: slide from center to right while rotating like a tyre
    const margin = 24;
    const shift = BOX_SIZE / 2 - COIN_SIZE / 2 - margin;
    const rollTarget = rotationZ + 720; // 2 full spins while sliding (clockwise)
    setRotationZ(rollTarget);
    // Wait for 2 seconds after coin reaches center before moving to the right
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await Promise.all([
      posControls.start({
        x: shift,
        transition: { duration: 1.2, ease: "easeInOut" },
      }),
      rotControls.start({
        rotateZ: rollTarget,
        transition: { duration: 1.2, ease: "linear" },
      }),
    ]);
    // Hide at right, then reset to top and show again
    await posControls.start({ opacity: 0, transition: { duration: 0.2 } });
    posControls.set({ x: 0, y: -(BOX_SIZE / 2), opacity: 1 });
    rotControls.set({ rotateY: 0, rotateZ: 0 });
    setRotationY(0);
    setRotationZ(0);
    setIsCentered(false);
    setIsFlipping(false);
  };

  // Auto-run once on mount
  useEffect(() => {
    flip();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div
        style={{
          width: BOX_SIZE,
          height: BOX_SIZE,
          perspective: 1000,
        }}
        className="relative border-4 border-gray-300 rounded-2xl bg-white/50"
      >
        <motion.div
          animate={posControls}
          initial={{ x: 0, y: -(BOX_SIZE / 2) }}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Fireworks shown while coin is centered (behind the coin) */}
          {isCentered && <FireCrackers size={COIN_SIZE} />}
          <motion.div
            animate={rotControls}
            initial={{ rotateY: 0, rotateZ: 0 }}
            style={{
              width: COIN_SIZE,
              height: COIN_SIZE,
              position: "relative",
              transformStyle: "preserve-3d",
              zIndex: 1,
            }}
            className="rounded-full"
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backfaceVisibility: "hidden",
                overflow: "hidden",
                borderRadius: "9999px",
                filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.25))",
              }}
            >
              <Image src="/head1.png" alt="Head" fill sizes="160px" priority />
            </div>
            <div
              style={{
                position: "absolute",
                inset: 0,
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
                overflow: "hidden",
                borderRadius: "9999px",
                filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.25))",
              }}
            >
              <Image src="/tail.png" alt="Tail" fill sizes="160px" priority />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => flip()}
          className={`px-4 py-2 rounded-md bg-blue-600 text-white ${
            isFlipping ? "opacity-60" : "hover:bg-blue-700"
          }`}
          disabled={isFlipping}
        >
          {isFlipping ? "Flipping..." : "Flip"}
        </button>
        <button
          onClick={() => flip("head")}
          className={`px-3 py-2 rounded-md bg-emerald-600 text-white ${
            isFlipping ? "opacity-60" : "hover:bg-emerald-700"
          }`}
          disabled={isFlipping}
        >
          Land Head
        </button>
        <button
          onClick={() => flip("tail")}
          className={`px-3 py-2 rounded-md bg-amber-600 text-white ${
            isFlipping ? "opacity-60" : "hover:bg-amber-700"
          }`}
          disabled={isFlipping}
        >
          Land Tail
        </button>
      </div>
    </div>
  );
};

export default HeadShow5;
