import React from "react";

const TailShow = () => {
  return (
    <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-8 border-2 border-yellow-400 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">TAIL</h2>
        <div className="text-6xl mb-4">👑</div>
        <div className="text-2xl font-bold text-gray-800 mb-2">1:0.7</div>
        <div className="flex justify-end">
          <span className="text-yellow-500 text-2xl">⚡</span>
        </div>
      </div>
    </div>
  );
};

export default TailShow;
