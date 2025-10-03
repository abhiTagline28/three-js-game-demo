"use client";

import CoinDistribution from "./CoinDistribution";
import NewRoundAnimation from "./NewRoundAnimation";
import Three3DCoin from "./Three3DCoin";

const CoinTossGame = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-40 min-h-screen bg-gradient-to-b from-gray-600 via-gray-700 to-black-800 p-4">
      <CoinDistribution />
      <NewRoundAnimation />
      <Three3DCoin />
    </div>
  );
};

export default CoinTossGame;
