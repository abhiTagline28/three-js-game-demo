import ModelViewerApp from "./ModelViewer";
import { RichestSection, BigWinnersSection } from "../component/GameSidebar";

export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-black/50 backdrop-blur-sm border-b border-gray-700">
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

      {/* Left Sidebar - Richest */}
      <div className="fixed left-1/2 top-1/2 transform -translate-x-[calc(50%+23.5vw)] -translate-y-1/2 z-20 w-64">
        <RichestSection />
      </div>

      {/* Right Sidebar - Big Winners */}
      <div className="fixed left-1/2 top-1/2 transform translate-x-[calc(50%+9vw)] -translate-y-1/2 z-20 w-64">
        <BigWinnersSection />
      </div>

      {/* Main Game Area */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-20 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 tracking-wider">
            COIN FLIP GAME
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full"></div>
        </div>

        <ModelViewerApp />
      </div>

      {/* Bottom Control Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-black/80 backdrop-blur-sm border-t border-gray-700">
        <div className="flex justify-between items-center px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white">
              <span className="text-blue-400">👥</span>
              <span className="text-sm font-medium">86</span>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
              <span>🔄</span>
              <span>4 coins room</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold text-lg">
              <div className="text-sm">Place bet now</div>
              <div className="text-2xl">15</div>
            </button>

            <div className="flex items-center gap-2 text-white">
              <div className="text-sm">
                <div>Min 1</div>
                <div>Max 105</div>
              </div>
              <div className="flex flex-col gap-1">
                <button className="bg-gray-600 hover:bg-gray-700 w-6 h-6 rounded flex items-center justify-center text-xs">
                  ▲
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 w-6 h-6 rounded flex items-center justify-center text-xs">
                  ▼
                </button>
              </div>
            </div>
          </div>

          <button className="text-white p-2">
            <span className="text-xl">☰</span>
          </button>
        </div>
      </div>
    </div>
  );
}
