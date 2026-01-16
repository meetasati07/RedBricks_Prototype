import { useState } from "react";
import { buyers } from "../data/buyers";

export default function Buyers({ goTo, data }) {
  const handleContact = (buyer) => {
    alert(`Contacting ${buyer.name}!\n💰 ₹${buyer.price}/kg | 📏 ${buyer.distance}\n🚚 ${buyer.transport} | 🚜 ${buyer.machine}`);
  };

  return (
    <div className="min-h-screen bg-green-600 p-4 pb-20">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <button onClick={() => goTo('results')} className="text-white text-3xl">←</button>
          <div className="flex-1 text-center">
            <div className="text-white text-lg font-bold">Buyers ({buyers.length})</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-2xl">
          <div className="space-y-4 mb-8">
            {buyers.map((buyer) => (
              <div key={buyer.id} className="border border-gray-200 p-5 rounded-2xl hover:shadow-xl transition-all">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-xl">{buyer.name}</h3>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                    ★ {buyer.rating}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm mb-4 p-3 bg-gray-50 rounded-xl">
                  <div>💰 <span className="font-bold text-lg">₹{buyer.price}</span>/kg</div>
                  <div>📏 {buyer.distance}</div>
                  <div>🚚 {buyer.transport}</div>
                  <div>🚜 {buyer.machine}</div>
                </div>
                
                <button 
                  onClick={() => handleContact(buyer)}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:from-green-600"
                >
                  📱 Contact {buyer.name}
                </button>
              </div>
            ))}
          </div>

          <button 
            onClick={() => goTo('results')} 
            className="w-full py-4 border-2 border-green-500 text-green-600 rounded-xl font-bold hover:bg-green-50"
          >
            ← Back to All Options
          </button>
        </div>
      </div>
    </div>
  );
}
