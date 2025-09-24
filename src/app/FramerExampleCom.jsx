import React from "react";
import FramerExample from "./FramerExample";
import HeadShow1 from "./components/HeadShow1";
import HeadShow2 from "./components/HeadShow2";
import HeadShow3 from "./components/HeadShow3";
import HeadShow4 from "./components/HeadShow4";
import HeadShow5 from "./components/HeadShow5";
import ShowCards from "./components/ShowCards";
import SingleRowShowCards from "./components/SingleRowShowCards";

const FramerExampleCom = () => {
  return (
    <>
      <FramerExample />
      <div className="w-full max-w-4xl mt-2">
        <div className="grid grid-cols-2 gap-6">
          <HeadShow1 />
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="w-full max-w-4xl mt-2">
        <div className="grid grid-cols-2 gap-6">
          <HeadShow2 />
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="w-full max-w-4xl mt-2">
        <div className="grid grid-cols-2 gap-6">
          <HeadShow3 />
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="w-full max-w-4xl mt-2">
        <div className="grid grid-cols-2 gap-6">
          <HeadShow4 />
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="w-full max-w-4xl mt-2">
        <div className="grid grid-cols-2 gap-6">
          <HeadShow5 />
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="w-full max-w-4xl mt-2">
        <div className="grid grid-cols-2 gap-6">
          <ShowCards />
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="w-full max-w-4xl mt-2">
        <div className="grid grid-cols-2 gap-6">
          <SingleRowShowCards />
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default FramerExampleCom;
