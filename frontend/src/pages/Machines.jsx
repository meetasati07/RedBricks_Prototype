import { useState } from "react";
import { machines } from "../data/buyers";

export default function Machines({ goTo, data }) {
  const [bookedMachines, setBookedMachines] = useState(
    JSON.parse(localStorage.getItem("machineBookings") || "[]")
  );

  const safeDays = data?.safeDays || 5;
  const safeUntilDate = data?.harvestDate 
    ? new Date(new Date(data.harvestDate).getTime() + safeDays * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN')
    : null;

  const handleBookMachine = (machine) => {
    const booking = {
      id: `${machine.name}-${Date.now()}`,
      name: machine.name,
      cost: machine.cost,
      status: machine.status,
      available: machine.available,
      crop: data?.crop || "your crop",
      safeUntil: safeUntilDate || `${safeDays}d`,
      bookedDate: new Date().toLocaleDateString("en-IN"),
    };

    const updatedBookings = [...bookedMachines, booking];
    setBookedMachines(updatedBookings);
    localStorage.setItem("machineBookings", JSON.stringify(updatedBookings));
    
    alert(`✅ Booked ${machine.name}!\n\nYour booking has been saved. Check "My Bookings" to manage it.`);
  };

  const isMachineBooked = (machineName) => {
    return bookedMachines.some((b) => b.name === machineName);
  };

  return (
    <div className="min-h-screen bg-green-600 p-4 pb-20">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-4">
          <button onClick={() => goTo('results')} className="text-white text-2xl">←</button>
          <div className="flex-1 text-center">
            <div className="text-white font-bold text-base">CHC Machines</div>
            <div className="flex items-center justify-center mt-1">
              <div className={`w-2 h-2 rounded-full mr-1 ${safeDays >= 4 ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
              <span className="text-white text-xs">
                Safe until: {safeUntilDate || `${safeDays}d`}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-xl space-y-3">
          <div className="bg-linear-to-r from-blue-500 to-blue-600 text-white p-3 rounded-lg text-center">
            <div className="text-xl font-bold">3 Machines</div>
            <div className="text-xs">Subsidized rates</div>
          </div>

          <div className="space-y-3">
            {machines.map((machine, i) => (
              <div key={i} className={`p-4 rounded-lg border shadow-sm hover:shadow-md transition-all ${
                machine.status === 'available' 
                  ? 'border-green-200 bg-green-50' 
                  : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-base">{machine.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold mt-1 ${
                      machine.status === 'available' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      {machine.available}
                    </span>
                  </div>
                  <div className={`text-xl font-bold px-3 py-2 rounded-xl ${
                    machine.status === 'available' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {machine.cost}
                  </div>
                </div>
                
                <div className="bg-white p-2 rounded-lg mb-3 text-xs">
                  <div className="flex items-center mb-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></span>
                    For {data?.crop || "your crop"}
                  </div>
                  <div className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                    {safeUntilDate || `${safeDays}d`} safe
                  </div>
                </div>

                <button 
                  className={`w-full py-2.5 px-4 rounded-lg font-bold text-sm shadow-md transition-all ${
                    isMachineBooked(machine.name)
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : machine.status === "available"
                      ? "bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg"
                      : "bg-gray-400 text-white cursor-not-allowed"
                  }`}
                  onClick={() => handleBookMachine(machine)}
                  disabled={machine.status !== "available" || isMachineBooked(machine.name)}
                >
                  {isMachineBooked(machine.name) 
                    ? "✓ Already Booked" 
                    : machine.status === "available"
                    ? "📞 Book Now"
                    : "Not Available"}
                </button>
              </div>
            ))}
          </div>

          <button 
            onClick={() => goTo('results')} 
            className="w-full py-2.5 border border-green-500 text-green-600 rounded-lg font-bold text-sm hover:bg-green-50 transition-all"
          >
            ← All Options
          </button>
        </div>
      </div>
    </div>
  );
}
