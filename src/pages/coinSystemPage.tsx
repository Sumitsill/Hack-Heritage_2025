// // pages/CoinSystemPage.tsx
// import React from "react";
// import useCoinSystem from "./DashboardPage";

// const CoinSystemPage: React.FC = () => {
//   const { user, rewards, redeemReward, addCoins } = useCoinSystem();

//   return (
//     <div>
//       <h1>Welcome, {user.name}</h1>
//       <p>Balance: {user.coinBalance} coins</p>

//       <h2>Available Rewards</h2>
//       <ul>
//         {rewards.map((reward) => (
//           <li key={reward.id}>
//             {reward.name} - {reward.cost} coins
//             <button onClick={() => redeemReward(reward.id)}>Redeem</button>
//           </li>
//         ))}
//       </ul>

//       <button onClick={() => addCoins(100)}>Add 100 Coins</button>
//     </div>
//   );
// };

// export default CoinSystemPage;

// pages/CoinSystemPage.tsx
// import React from "react";
// import useCoinSystem from "./DashboardPage";

// const CoinSystemPage: React.FC = () => {
//   const { user, rewards, redeemReward, addCoins, isLoading, error } = useCoinSystem();

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       {/* Header */}
//       <div className="mb-6 text-center">
//         <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
//         <p className="text-gray-600">
//           Balance: <span className="font-semibold">{user.coinBalance} coins</span>
//         </p>
//       </div>

//       {/* Error Message */}
//       {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//       {/* Rewards Grid */}
//       <h2 className="text-xl font-semibold mb-4">Available Rewards</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {rewards.map((reward) => (
//           <div key={reward.id} className="bg-white rounded-2xl shadow p-4 flex flex-col">
//             <img src={reward.image} alt={reward.name} className="h-40 w-full object-cover rounded-lg mb-3" />
//             <h3 className="font-semibold text-lg">{reward.name}</h3>
//             <p className="text-sm text-gray-500 flex-grow">{reward.description}</p>
//             <p className="mt-2 font-medium">{reward.cost} coins</p>
//             <button
//               disabled={!reward.available || isLoading}
//               onClick={() => redeemReward(reward.id)}
//               className={`mt-3 py-2 rounded-lg text-white font-semibold ${
//                 reward.available
//                   ? "bg-green-500 hover:bg-green-600"
//                   : "bg-gray-400 cursor-not-allowed"
//               }`}
//             >
//               {reward.available ? "Redeem" : "Unavailable"}
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Add Coins Button */}
//       <div className="text-center mt-8">
//         <button
//           onClick={() => addCoins(100)}
//           className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
//         >
//           Add 100 Coins
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CoinSystemPage;

import React from "react";
import useCoinSystem from "./DashboardPage";

const CoinSystemPage: React.FC = () => {
  const { user, rewards, redeemReward, addCoins, isLoading, error } = useCoinSystem();

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <p className="text-gray-500">Loading user info...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
        <p className="text-gray-600">
          Balance: <span className="font-semibold">{user.coinBalance} coins</span>
        </p>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Rewards Grid */}
      <h2 className="text-xl font-semibold mb-4">Available Rewards</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward) => (
          <div key={reward.id} className="bg-white rounded-2xl shadow p-4 flex flex-col">
            <img
              src={reward.image}
              alt={reward.name}
              className="h-40 w-full object-cover rounded-lg mb-3"
            />
            <h3 className="font-semibold text-lg">{reward.name}</h3>
            <p className="text-sm text-gray-500 flex-grow">{reward.description}</p>
            <p className="mt-2 font-medium">{reward.cost} coins</p>
            <button
              disabled={!reward.available || isLoading}
              onClick={() => redeemReward(reward.id)}
              className={`mt-3 py-2 rounded-lg text-white font-semibold ${
                reward.available
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {reward.available ? "Redeem" : "Unavailable"}
            </button>
          </div>
        ))}
      </div>

      {/* Add Coins Button */}
      <div className="text-center mt-8">
        <button
          onClick={() => addCoins(100)}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        >
          Add 100 Coins
        </button>
      </div>
    </div>
  );
};

export default CoinSystemPage;

