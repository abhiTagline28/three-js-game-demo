"use client";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const BOX_SIZE = 900; // larger bordered box
const COIN_SIZE = 200; // bigger coin

const HeadShow4 = () => {
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
          <motion.div
            animate={rotControls}
            initial={{ rotateY: 0, rotateZ: 0 }}
            style={{
              width: COIN_SIZE,
              height: COIN_SIZE,
              position: "relative",
              transformStyle: "preserve-3d",
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
              {/* <Image src="/head.png" alt="Head" fill sizes="160px" priority /> */}
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
              <Image src="/head1.png" alt="Tail" fill sizes="160px" priority />
              {/* <Image src="/tail.png" alt="Tail" fill sizes="160px" priority /> */}
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

export default HeadShow4;
