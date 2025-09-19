"use client";

// User Profile Component for displaying individual user cards
const UserProfile = ({ 
  user, 
  rank, 
  showRank = true, 
  variant = "default", // "richest" or "winner" 
  className = "" 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "richest":
        return {
          container: "bg-gradient-to-r from-orange-500 to-yellow-500",
          rankBg: "bg-orange-600",
          textColor: "text-white",
          coinIcon: "🪙"
        };
      case "winner":
        return {
          container: "bg-gradient-to-r from-green-500 to-emerald-500",
          rankBg: "bg-green-600",
          textColor: "text-white",
          coinIcon: "🪙"
        };
      default:
        return {
          container: "bg-gradient-to-r from-gray-600 to-gray-500",
          rankBg: "bg-gray-600",
          textColor: "text-white",
          coinIcon: "🪙"
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`
      ${styles.container} 
      rounded-lg p-3 flex items-center gap-3 
      shadow-lg hover:shadow-xl transition-all duration-200 
      hover:scale-105 min-w-[180px]
      ${className}
    `}>
      {showRank && (
        <div className={`
          ${styles.rankBg} 
          ${styles.textColor} 
          rounded-full w-6 h-6 flex items-center justify-center 
          font-bold text-xs shadow-md
        `}>
          {rank}
        </div>
      )}
      
      <div className="flex-shrink-0 relative">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-10 h-10 rounded-full border-2 border-white shadow-md object-cover"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className={`font-bold text-sm ${styles.textColor} truncate`}>
          {variant === "richest" ? (
            user.name
          ) : variant === "winner" && rank === 1 ? (
            <span className="flex items-center gap-1">
              <span>{styles.coinIcon}</span>
              <span>{user.winAmount}</span>
            </span>
          ) : (
            user.name
          )}
        </div>
        <div className={`text-xs ${styles.textColor} opacity-90`}>
          {variant === "richest" ? `No ${rank}` : 
           variant === "winner" ? `No ${rank}` :
           `Level ${user.level || 1}`}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
