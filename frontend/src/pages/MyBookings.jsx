import { useState, useEffect } from "react";

export default function MyBookings({ goTo }) {
  const [buyerBookings, setBuyerBookings] = useState([]);
  const [machineBookings, setMachineBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    const buyers = JSON.parse(localStorage.getItem("buyerBookings") || "[]");
    const machines = JSON.parse(localStorage.getItem("machineBookings") || "[]");
    setBuyerBookings(buyers);
    setMachineBookings(machines);
  };

  const cancelBooking = (type, id) => {
    if (type === "buyer") {
      const updated = buyerBookings.filter((b) => b.id !== id);
      setBuyerBookings(updated);
      localStorage.setItem("buyerBookings", JSON.stringify(updated));
    } else {
      const updated = machineBookings.filter((b) => b.id !== id);
      setMachineBookings(updated);
      localStorage.setItem("machineBookings", JSON.stringify(updated));
    }
  };

  const hasBookings = buyerBookings.length > 0 || machineBookings.length > 0;

  return (
    <div className="min-h-screen bg-linear-to-b from-green-500 to-green-700 p-4 pb-20">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6 mt-4">
          <button onClick={() => goTo("home")} className="text-white text-3xl">
            ←
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-white text-2xl font-bold">My Bookings</h1>
          </div>
        </div>

        {!hasBookings ? (
          <div className="bg-white/20 backdrop-blur rounded-2xl p-8 text-center border border-white/30">
            <div className="text-5xl mb-4">📭</div>
            <h2 className="text-white text-xl font-bold mb-2">No Bookings Yet</h2>
            <p className="text-white/90 mb-6">
              Start booking buyers or CHC machines to see them here
            </p>
            <button
              onClick={() => goTo("add")}
              className="w-full bg-white text-green-700 py-3 px-6 rounded-xl font-bold shadow-lg hover:scale-[1.02] transition-all"
            >
              🚀 Start Booking
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Buyer Bookings */}
            {buyerBookings.length > 0 && (
              <div>
                <h2 className="text-white text-lg font-bold mb-3">🏪 Buyer Bookings</h2>
                <div className="space-y-3">
                  {buyerBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-lg text-gray-800">
                          {booking.name}
                        </h3>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                          ✓ Booked
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm mb-4 p-3 bg-gray-50 rounded-xl">
                        <div>
                          💰 <span className="font-bold">₹{booking.price}</span>/kg
                        </div>
                        <div>📏 {booking.distance}</div>
                        <div>🚚 {booking.transport}</div>
                        <div>🚜 {booking.machine}</div>
                      </div>

                      <div className="text-xs text-gray-600 mb-3">
                        Booked on: {booking.bookedDate}
                      </div>

                      <button
                        onClick={() => cancelBooking("buyer", booking.id)}
                        className="w-full bg-red-500 text-white py-2 px-4 rounded-lg font-bold text-sm hover:bg-red-600 transition-all"
                      >
                        ✕ Cancel Booking
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Machine Bookings */}
            {machineBookings.length > 0 && (
              <div>
                <h2 className="text-white text-lg font-bold mb-3">
                  🚜 CHC Machine Bookings
                </h2>
                <div className="space-y-3">
                  {machineBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-lg text-gray-800">
                          {booking.name}
                        </h3>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
                          ✓ Booked
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm mb-4 p-3 bg-gray-50 rounded-xl">
                        <div>
                          💵 <span className="font-bold">{booking.cost}</span>
                        </div>
                        <div>🌾 {booking.crop}</div>
                        <div>📅 Safe: {booking.safeUntil}</div>
                        <div>⚙️ {booking.status}</div>
                      </div>

                      <div className="text-xs text-gray-600 mb-3">
                        Booked on: {booking.bookedDate}
                      </div>

                      <button
                        onClick={() => cancelBooking("machine", booking.id)}
                        className="w-full bg-red-500 text-white py-2 px-4 rounded-lg font-bold text-sm hover:bg-red-600 transition-all"
                      >
                        ✕ Cancel Booking
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => goTo("home")}
              className="w-full py-3 border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-all"
            >
              ← Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
