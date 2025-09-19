"use client";
import UserProfile from "./UserProfile";

// Sample user data - matching the reference image
const SAMPLE_USERS = {
  richest: [
    {
      id: 1,
      name: "369.51",
      balance: 369.51,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=100&h=100&fit=crop&crop=face",
      rank: 1
    },
    {
      id: 2,
      name: "r***nbk",
      balance: 28500,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rank: 2
    },
    {
      id: 3,
      name: "1***633",
      balance: 19200,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      rank: 3
    }
  ],
  winners: [
    {
      id: 5,
      name: "c***YUQ",
      winAmount: 25000,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rank: 1
    },
    {
      id: 6,
      name: "1***978",
      winAmount: 18500,
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face",
      rank: 2
    },
    {
      id: 7,
      name: "p***939",
      winAmount: 12300,
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
      rank: 3
    }
  ]
};

// Richest Players Section
const RichestSection = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Vertical Banner */}
      <div className="bg-gradient-to-b from-orange-500 to-yellow-500 rounded-lg p-4 mb-4 shadow-lg">
        <h2 className="text-white font-bold text-lg tracking-wider writing-mode-vertical transform rotate-180">
          RICHEST
        </h2>
      </div>
      
      {/* User Cards */}
      <div className="space-y-2">
        {SAMPLE_USERS.richest.map((user, index) => (
          <UserProfile
            key={user.id}
            user={user}
            rank={index + 1}
            variant="richest"
            className="transform hover:translate-x-1"
          />
        ))}
      </div>
    </div>
  );
};

// Big Winners Section
const BigWinnersSection = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Vertical Banner */}
      <div className="bg-gradient-to-b from-green-500 to-emerald-500 rounded-lg p-4 mb-4 shadow-lg">
        <h2 className="text-white font-bold text-lg tracking-wider writing-mode-vertical transform rotate-180">
          BIG WINNERS
        </h2>
      </div>
      
      {/* User Cards */}
      <div className="space-y-2">
        {SAMPLE_USERS.winners.map((user, index) => (
          <UserProfile
            key={user.id}
            user={user}
            rank={index + 1}
            variant="winner"
            className="transform hover:translate-x-1"
          />
        ))}
      </div>
    </div>
  );
};

// Main Game Sidebar Component
const GameSidebar = ({ position = "left" }) => {
  const isLeft = position === "left";
  const sidebarClasses = isLeft ? "left-4" : "right-4";
  const flexDirection = isLeft ? "flex-col" : "flex-col";

  return (
    <div className={`
      fixed top-1/2 transform -translate-y-1/2 ${sidebarClasses}
      flex ${flexDirection} gap-6 z-20 max-h-[80vh] overflow-y-auto
      scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent
      w-64
    `}>
      {isLeft ? (
        <>
          <RichestSection />
          <BigWinnersSection />
        </>
      ) : (
        <>
          <BigWinnersSection />
          <RichestSection />
        </>
      )}
    </div>
  );
};

export { GameSidebar, RichestSection, BigWinnersSection };
export default GameSidebar;
