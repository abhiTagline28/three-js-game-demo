import ModelViewerApp from "./ModelViewer";
import { RichestSection, BigWinnersSection } from "../component/GameSidebar";

export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-black/50 backdrop-blur-sm">
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex items-center gap-2 text-white">
            <span className="text-yellow-400">🪙</span>
            <span className="text-sm font-medium">Min. Bet: 1</span>
          </div>
          <div className="text-white text-sm font-medium">ID: avishek9365</div>
          <div className="text-white text-sm font-medium">
            Round ID: CT-Izj79n1S
          </div>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-20 relative z-10">
        {/* Left Sidebar - Richest */}
        <div className="absolute left-1/2 top-[42%] transform -translate-x-[calc(40%+23rem)] -translate-y-1/2 w-64 z-20">
          <div className="leaderboard-container">
            <RichestSection />
          </div>
        </div>

        {/* Right Sidebar - Big Winners */}
        <div className="absolute left-1/2 top-[42%] transform translate-x-[calc(50%+7rem)] -translate-y-1/2 w-64 z-20">
          <div className="leaderboard-container">
            <BigWinnersSection />
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 tracking-wider">
            COIN FLIP GAME
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full"></div>
        </div>

        {/* Game Status Bar */}
        <div className="w-full max-w-4xl mb-6">
          <div className="bg-black/60 backdrop-blur-sm rounded-lg p-4 border border-gray-600">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-white">
                  <span className="text-blue-400">⏱️</span>
                  <span className="text-lg font-bold">73</span>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                  <span>🔄</span>
                  <span>4 coins room</span>
                </button>
              </div>

              <div className="bg-purple-600 px-6 py-3 rounded-lg">
                <span className="text-white font-bold text-lg">
                  BET LOCKED!
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-white text-sm">
                  <div>1 Min</div>
                  <div>105 Max</div>
                </div>
                <button className="text-white p-2">
                  <span className="text-xl">☰</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <ModelViewerApp />

        {/* HEAD/TAIL Betting Panels */}
        <div className="w-full max-w-4xl mt-2">
          <div className="grid grid-cols-2 gap-6">
            {/* HEAD Panel */}
            <div className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl p-8 border-2 border-yellow-400 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">HEAD</h2>
                <div className="text-6xl mb-4">👑</div>
                <div className="text-2xl font-bold text-gray-800 mb-2">
                  1:0.7
                </div>
                <div className="flex justify-end">
                  <span className="text-yellow-500 text-2xl">⚡</span>
                </div>
              </div>
            </div>

            {/* TAIL Panel */}
            <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-8 border-2 border-yellow-400 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">TAIL</h2>
                <div className="text-6xl mb-4">👑</div>
                <div className="text-2xl font-bold text-gray-800 mb-2">
                  1:0.7
                </div>
                <div className="flex justify-end">
                  <span className="text-yellow-500 text-2xl">⚡</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Player Information Section */}
        <div className="w-full max-w-4xl mt-1">
          <div className="bg-black/60 backdrop-blur-sm rounded-lg p-4 border border-gray-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=100&h=100&fit=crop&crop=face"
                  alt="Player Avatar"
                  className="w-12 h-12 rounded-full border-2 border-white"
                />
                <div>
                  <div className="text-white font-bold text-lg">
                    avishek9365
                  </div>
                  <div className="flex items-center gap-2 text-yellow-400">
                    <span>🪙</span>
                    <span className="font-bold">369.51</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="text-white font-bold text-lg">COIN TOSS</div>
                <div className="flex items-center gap-2 text-yellow-400 justify-center">
                  <span>🪙</span>
                  <span className="font-bold">0 Total Stake</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Game History and Statistics */}
        <div className="w-full max-w-4xl mt-1">
          <div className="bg-black/60 backdrop-blur-sm rounded-lg p-4 border border-gray-600">
            {/* Game History Grid */}
            <div className="mb-4">
              <div className="grid grid-cols-12 gap-2 mb-4">
                {Array.from({ length: 60 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-6 h-6 rounded-full ${
                      Math.random() > 0.5 ? "bg-orange-500" : "bg-green-500"
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            {/* Statistics */}
            <div className="flex justify-center gap-8">
              <div className="flex items-center gap-2">
                <span className="text-2xl">👑</span>
                <span className="text-white font-bold">HEAD</span>
                <span className="text-white font-bold">46.67%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">👑</span>
                <span className="text-white font-bold">TAIL</span>
                <span className="text-white font-bold">53.33%</span>
              </div>
            </div>

            <div className="text-center text-gray-400 text-sm mt-2">
              Calculated from last 60 rounds
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-black/90 backdrop-blur-sm">
        <div className="flex justify-center items-center px-4 py-3">
          <div className="flex items-center gap-8">
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🏠</span>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🎮</span>
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⚙️</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
