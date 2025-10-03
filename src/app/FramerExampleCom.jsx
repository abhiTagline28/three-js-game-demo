import React from "react";
import FramerExample from "./FramerExample";
import HeadShow1 from "./components/HeadShow1";
import HeadShow2 from "./components/HeadShow2";
import HeadShow3 from "./components/HeadShow3";
import HeadShow4 from "./components/HeadShow4";
import HeadShow5 from "./components/HeadShow5";
import ShowCards from "./components/ShowCards";
import SingleRowShowCards from "./components/SingleRowShowCards";
import CarouselShowCards from "./components/CarouselShowCards";
import DealToPilesShowCards from "./components/DealToPilesShowCards";
import FanSpreadShowCards from "./components/FanSpreadShowCards";
import GridFlipShowCards from "./components/GridFlipShowCards";
import LudoCoinFlip from "./components/LudoCoinFlip";
import LudoDiceSpin from "./components/LudoDiceSpin";
import LudoDiceBounce from "./components/LudoDiceBounce";
import LudoDiceScatter from "./components/LudoDiceScatter";
import LudoDiceMultiRoll from "./components/LudoDiceMultiRoll";
import LudoDicePairRoll from "./components/LudoDicePairRoll";
import LudoDiceGridRain from "./components/LudoDiceGridRain";
// Removed incorrect head/tail coin examples

const FramerExampleCom = () => {
  return (
    <div className="flex flex-col gap-50 justify-center items-center">
      <FramerExample />
      <div className="w-full max-w-4xl mt-2">
        <div className="grid grid-cols-2 gap-6">
          <HeadShow1 />
        </div>
      </div>

      <div className="w-full max-w-4xl mt-2">
        <div className="grid grid-cols-2 gap-6">
          <HeadShow2 />
        </div>
      </div>

      <div className="w-full max-w-4xl mt-2">
        <div className="grid grid-cols-2 gap-6">
          <HeadShow3 />
        </div>
      </div>

      <div className="w-full max-w-4xl mt-2">
        <div className="grid grid-cols-2 gap-6">
          <HeadShow4 />
        </div>
      </div>

      <div className="w-full max-w-4xl mt-2">
        <div className="grid grid-cols-2 gap-6">
          <HeadShow5 />
        </div>
      </div>

      <div className="w-full max-w-4xl mt-2 ml-5">
        <div className="grid grid-cols-2 gap-6">
          <ShowCards />
        </div>
      </div>

      <div className="w-full max-w-4xl mt-2 ml-5">
        <div className="grid grid-cols-2 gap-6">
          <SingleRowShowCards />
        </div>
      </div>

      <div className="w-full max-w-4xl mt-2 ml-5">
        <div className="grid grid-cols-2 gap-6">
          <CarouselShowCards />
        </div>
      </div>

      <div className="w-full max-w-4xl mt-2 ml-5">
        <div className="grid grid-cols-2 gap-6">
          <DealToPilesShowCards />
        </div>
      </div>

      <div className="w-full max-w-4xl mt-2 ml-5">
        <div className="grid grid-cols-2 gap-6">
          <FanSpreadShowCards />
        </div>
      </div>

      <div className="w-full max-w-4xl mt-2 ml-5">
        <div className="grid grid-cols-2 gap-6">
          <GridFlipShowCards />
        </div>
      </div>

      <div className="w-full max-w-4xl mt-2 ml-5">
        <div className="grid grid-cols-2 gap-6">
          <LudoCoinFlip />
        </div>
      </div>

      <div className="w-full max-w-4xl mt-2 ml-5">
        <div className="grid grid-cols-2 gap-6">
          <LudoDiceSpin />
          <LudoDiceBounce />
        </div>
      </div>

      <div className="w-full max-w-4xl mt-2 ml-5">
        <div className="grid grid-cols-2 gap-6">
          <LudoDiceScatter />
          <LudoDiceMultiRoll />
        </div>
      </div>

      <div className="w-full max-w-4xl mt-2 ml-5">
        <div className="grid grid-cols-2 gap-6">
          <LudoDicePairRoll />
          <LudoDiceGridRain />
        </div>
      </div>
    </div>
  );
};

export default FramerExampleCom;
