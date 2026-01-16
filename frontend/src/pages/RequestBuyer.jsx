import { useState } from "react";
import { buyers } from "../data/buyers";
import LocationBar from "../components/LocationBar";

export default function RequestBuyer({ go }) {
  const [filteredBuyers] = useState(buyers);

  return (
    <div className="min-h-screen bg-green-600 p-4 pb-20">
      <div className="flex items-center mb-6">
        <button onClick={() => go("add")} className="text-white text-2xl">←</button>
        <div className="flex-1 text-center">
          <div className="text-white text-lg font-bold">Step 2/3</div>
          <div className="flex justify-center space-x-2 mt-1">
            <div className="w-3 h-3 bg-green-300 rounded-full"></div>
            <div className="w-3 h-3 bg-green-300 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-md mx-auto space-y-4">
        <LocationBar />
        <h2 className="text-xl font-bold text-gray-800 mb-4">🤝 Top Buyers</h2>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredBuyers.map((b) => (
            <div key={b.id} className="border border-gray-200 p-4 rounded-xl hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-bold text-lg flex-1 pr-2">{b.name}</h4>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-bold">★ {b.rating}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                <div>💰 {b.price}/kg</div>
                <div>📏 {b.distance}</div>
                <div>🚚 {b.transport}</div>
                <div>🚜 {b.machine}</div>
              </div>
              
              <button className="btn-primary w-full py-2 text-sm font-bold">
                📱 Contact {b.contact === 'whatsapp' ? 'WhatsApp' : 'Call'}
              </button>
            </div>
          ))}
        </div>

        <button 
          onClick={() => go("options")} 
          className="w-full py-3 border border-green-500 text-green-600 rounded-xl font-bold hover:bg-green-50 transition-all text-sm"
        >
          🌱 Backup Options
        </button>
      </div>
    </div>
  );
}
