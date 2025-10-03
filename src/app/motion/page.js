"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState } from "react";
import Link from "next/link";


const box = {
  width: 50,
  height: 50,
  backgroundColor: "#ff0088",
  borderRadius: 5,
};

const variants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 140 },
  active: { opacity: 0.3, y: 200 },
};

const navItems = [
  { name: "Dice", path: "/motion/dice" },
  { name: "Coin", path: "/motion/coin" },
  { name: "Big Small", path: "/motion/big-small-game" },
  { name: "Coin Toss", path: "/motion/coin-toss" },
];

const MotionExamples = () => {
  const [compKeys, setCompKeys] = useState({});
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });

  const changeKey = (comp) => {
    setCompKeys({ ...compKeys, [comp]: Date.now() });
  };

  return (
    <>
     <nav className="flex gap-4 p-4 bg-[#1a1a2e] w-full justify-center mb-8">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className="text-white no-underline px-4 py-2 rounded bg-[#ff0088] hover:bg-[#ff0088]/90 transition-colors"
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="relative w-[400px] h-[400px] bg-[#1a1a2e] flex flex-col justify-between items-center p-[20px_0px] rounded-[10px] border-2 border-[rgba(255,0,136,0.3)] shadow-[0_0_20px_rgba(255,0,136,0.2)] mx-auto">
        <motion.div
          drag="x"
          key={compKeys["A"]}
          style={{ x: springX, ...box }}
          variants={variants}
          initial="hidden"
          animate={["visible"]}
          // animate={{
          //   y: [0, 300], // Move from top (0) to bottom (300px)
          // }}
          transition={{
            duration: 1,
          }}
        />
        <motion.button
          className="px-5 py-2 rounded-xl font-bold text-lg bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white"
          onClick={() => changeKey("A")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Again
        </motion.button>
      </div>
    </>
  );
};

export default MotionExamples;
