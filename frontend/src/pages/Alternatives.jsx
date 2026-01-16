import { useState } from "react"; 

export default function Alternatives({ goTo }) {
  const [activeCard, setActiveCard] = useState(null); // FIXED: null instead of 0

  const options = [
    {
      icon: "🌾",
      title: "In-field mulching",
      when: "⏳ Next crop sowing is soon (7–15 days)\n🌦 Normal weather conditions\n🌾 Medium residue quantity",
      why: "Improves soil fertility\nRetains soil moisture\nNo burning required",
      needs: "🚜 Mulcher / Happy Seeder machine"
    },
    {
      icon: "🌱",
      title: "Composting pits",
      when: "🧱 Extra land or corner space available\n⏳ Can wait 2–3 months\n🌦 Normal weather",
      why: "Converts waste into organic fertilizer\nReduces fertilizer cost",
      needs: "Land space\nTime for decomposition"
    },
    {
      icon: "🧪",
      title: "On-field decomposition",
      when: "⏳ 15–25 days before next crop\n🌦 Humid or suitable weather\n🚫 No buyer or machine available",
      why: "Fast biological breakdown\nGovernment-recommended method",
      needs: "Bio-decomposer spray\nMoist soil conditions"
    },
    {
      icon: "📦",
      title: "Temporary storage (Baling)",
      when: "🕒 Buyer expected later\n🌦 Weather risky for burning\n📦 Storage space available",
      why: "Avoids immediate burning\nAllows future selling or transport",
      needs: "Baling machine\nStorage space"
    },
    {
      icon: "✂️",
      title: "Partial removal",
      when: "🌾 Very high residue quantity\n🌦 Moderate weather risk\n⏳ Urgent field preparation",
      why: "Reduces fire risk\nMakes field ready for sowing",
      needs: "Manual labor or basic machinery"
    }
  ];

  return (
    <div className="min-h-screen bg-green-600 p-4 pb-20">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <button onClick={() => goTo('home')} className="text-white text-3xl">←</button>
          <div className="flex-1 text-center">
            <div className="text-white font-bold text-lg">Safe alternatives to burning</div>
            <div className="text-white/80 text-sm">Learn when & why to use each method</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-2xl space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          {options.map((option, index) => (
            <div 
              key={index}
              className={`border rounded-xl p-4 hover:shadow-md transition-all cursor-pointer ${
                activeCard === index 
                  ? 'bg-green-50 border-green-300 shadow-lg' 
                  : 'border-gray-200 hover:border-green-300'
              }`}
              onClick={() => setActiveCard(activeCard === index ? null : index)}
            >
              <div className="flex items-start space-x-3">
                <div className="text-2xl flex-shrink-0 mt-1">{option.icon}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{option.title}</h3>
                  
                  {activeCard === index && (
                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="font-bold text-green-800 mb-2">When should you use this?</div>
                        <div className="text-gray-700 whitespace-pre-line">{option.when}</div>
                      </div>
                      <div>
                        <div className="font-bold text-green-800 mb-2">Why should you use this?</div>
                        <div className="text-gray-700 whitespace-pre-line">{option.why}</div>
                      </div>
                      <div className="bg-green-100 p-3 rounded-lg">
                        <div className="font-bold text-green-800 mb-1">What is needed?</div>
                        <div className="text-green-700 whitespace-pre-line">{option.needs}</div>
                      </div>
                    </div>
                  )}
                  
                  {/* FIXED: Show hint only when NO card is active */}
                  {activeCard === null && (
                    <div className="text-xs text-gray-500 mt-2">
                      Tap any option to see details
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={() => goTo('home')}
          className="w-full mt-4 bg-white text-green-700 py-3 px-6 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}
