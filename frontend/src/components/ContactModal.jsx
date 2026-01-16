import { useState } from "react";
import { buyers } from "../data/buyers";
import LocationBar from "../components/LocationBar";
import ContactModal from "../components/ContactModal";

export default function Buyers({ go, data }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedBuyer, setSelectedBuyer] = useState(null);

  const handleContact = (buyer) => {
    setSelectedBuyer(buyer);
    setShowModal(true);
  };

  return (
    <>
      <div className="min-h-screen bg-green-600 p-4 pb-20">
        <div className="flex items-center mb-6">
          <button onClick={() => go("results")} className="text-white text-2xl">←</button>
          <div className="flex-1 text-center">
            <div className="text-white text-lg font-bold">Buyers (3)</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-md mx-auto space-y-4">
          <LocationBar />
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {buyers.map((b) => (
              <div key={b.id} className="border border-gray-200 p-4 rounded-xl hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-lg">{b.name}</h4>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">★{b.rating}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                  <div>💰 {b.price}/kg</div>
                  <div>📏 {b.distance}</div>
                </div>
                <button 
                  onClick={() => handleContact(b)}
                  className="btn-primary w-full py-3 font-bold text-sm"
                >
                  📱 Contact Now
                </button>
              </div>
            ))}
          </div>

          <button 
            onClick={() => go("results")} 
            className="w-full py-3 border border-green-500 text-green-600 rounded-xl font-bold hover:bg-green-50"
          >
            ← Back to Options
          </button>
        </div>
      </div>
      
      {showModal && (
        <ContactModal buyer={selectedBuyer} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
