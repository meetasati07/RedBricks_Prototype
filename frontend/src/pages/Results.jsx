import { useState } from "react";
import { buyers } from "../data/buyers";
import NGOModal from "../components/NGOModal";
import ClusterModal from "../components/ClusterModal";

export default function Results({ goTo, data }) {
  const [showCluster, setShowCluster] = useState(false);
  const [showNGO, setShowNGO] = useState(false);

  const safeDays = data?.safeDays || 5;
  
  const safeUntilDate = data?.harvestDate 
    ? new Date(new Date(data.harvestDate).getTime() + safeDays * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN')
    : null;

  const filteredBuyers = buyers.filter(buyer => {
    if (data?.transport === "no" && buyer.transport.includes("Self Arrange")) return false;
    return true;
  });

  const getRecommendationReasons = () => {
    const reasons = [];
    if (data?.weather?.rainProb > 30) reasons.push("High rain risk");
    if (data?.crop === "Rice") reasons.push("Rice needs quick clearance");
    if (safeDays < 3) reasons.push("Window closing");
    if (filteredBuyers.length > 0) reasons.push(`${filteredBuyers.length} buyers ready`);
    return reasons.slice(0, 3);
  };

  const options = [
    filteredBuyers.length > 0 && {
      type: "buyers",
      title: "💰 Sell to Buyers", 
      icon: "💰",
      desc: `${filteredBuyers.length} buyers • ₹${filteredBuyers[0]?.price || 20}/kg`,
      reason: getRecommendationReasons(),
      action: () => goTo('buyers')
    },
    {
      type: "machines",
      title: "🚜 CHC Machines", 
      icon: "🚜",
      desc: "Mulcher & Happy Seeder",
      reason: [`Safe until ${safeUntilDate || safeDays}d`, "Govt subsidized"],
      action: () => goTo('machines')
    },
    {
      type: "cluster",
      title: "🟣 Join Farm Cluster", 
      icon: "🟣",
      desc: "5 farms combining residue",
      reason: ["30% cheaper", `Book by ${safeUntilDate || safeDays}d`],
      action: () => setShowCluster(true)
    },
    {
      type: "ngo",
      title: "🤝 NGO Pickup", 
      icon: "🤝",
      desc: "FREE collection",
      reason: ["No cost", `Next week • ${safeDays}d safe`],
      action: () => setShowNGO(true)
    }
  ].filter(Boolean);

  return (
    <>
      <div className="min-h-screen bg-green-600 p-4 pb-20">
        <div className="max-w-md mx-auto">
          <div className="flex items-center mb-6">
            <button onClick={() => goTo('add')} className="text-white text-3xl">←</button>
            <div className="flex-1 text-center">
              <div className="text-white text-lg font-bold">Smart Options</div>
              <div className="flex items-center justify-center mt-1">
                <div className={`w-3 h-3 rounded-full mr-2 ${
                  safeDays >= 4 ? 'bg-green-400' : safeDays >= 2 ? 'bg-yellow-400' : 'bg-red-400'
                }`}></div>
                <span className="text-white text-sm font-bold">
                  Safe until: {safeUntilDate || `${safeDays} days`}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-bold text-lg">{data?.crop || "Your farm"}</div>
                  <div className="text-sm">{data?.residueQty || 0} {data?.unit || "kg"}</div>
                </div>
                <div className={`text-xl font-bold p-3 rounded-full ${
                  safeDays >= 4 ? 'bg-green-200 text-green-800' : 
                  safeDays >= 2 ? 'bg-yellow-200 text-yellow-800' : 'bg-red-200 text-red-800'
                }`}>
                  {safeDays}d
                </div>
              </div>
              {safeUntilDate && (
                <div className="text-xs bg-white/20 px-3 py-1 rounded-full mb-2">
                  Until: {safeUntilDate}
                </div>
              )}
              <div className="text-xs">🌤️ {data?.weather?.temp || "?"}°C | {data?.weather?.rainProb || "?"}% rain</div>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {options.map((option, i) => (
                <div key={i} className="border border-gray-200 p-4 rounded-xl hover:shadow-md transition-all">
                  <div className="flex items-start mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl flex items-center justify-center text-2xl font-bold mr-4 mt-1">
                      {option.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-lg">{option.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{option.desc}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {option.reason.map((r, j) => (
                          <span key={j} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={option.action}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-xl font-bold hover:shadow-xl transition-all"
                  >
                    Select Option
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showCluster && <ClusterModal onClose={() => setShowCluster(false)} />}
      {showNGO && <NGOModal onClose={() => setShowNGO(false)} />}
    </>
  );
}
