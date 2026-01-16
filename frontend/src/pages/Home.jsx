import { useState, useEffect } from "react";

export default function Home({ goTo }) {
  const [weather, setWeather] = useState({ temp: 28, rainProb: 25 });
  const [notifications, setNotifications] = useState([]);
  const [showNotifs, setShowNotifs] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setWeather({ temp: 27 + Math.floor(Math.random() * 4), rainProb: 20 + Math.floor(Math.random() * 20) });
    }, 10000); 
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const mockAlerts = [
      { id: 1, type: "buyer", message: "GreenBio accepted your request @ ₹22/kg", time: "2 min ago" },
      { id: 2, type: "machine", message: "Mulcher request approved for tomorrow", time: "5 min ago" },
      { id: 3, type: "cluster", message: "Ram Singh cluster: 1 spot left!", time: "10 min ago" }
    ];
    setNotifications(mockAlerts);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-500 to-green-700 p-6 relative">
      <div className="max-w-md mx-auto text-center">
        <div className="absolute top-6 right-6">
          <button 
            onClick={() => setShowNotifs(!showNotifs)}
            className="w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-white text-xl shadow-lg hover:bg-white/30 transition-all"
          >
            🔔
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-xs text-white rounded-full flex items-center justify-center animate-bounce">
                {notifications.length}
              </span>
            )}
          </button>
        </div>

        {showNotifs && (
          <div className="absolute top-20 right-6 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 max-h-96 overflow-y-auto z-20">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-bold text-lg text-gray-800">🔔 Notifications</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {notifications.map(notif => (
                <div key={notif.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start space-x-3">
                    <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                      notif.type === 'buyer' ? 'bg-green-500' : 
                      notif.type === 'machine' ? 'bg-blue-500' : 'bg-purple-500'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-gray-800 truncate">{notif.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <h1 className="text-3xl font-bold text-white mb-4 drop-shadow-lg mt-12">🌾 Residue Helper</h1>
        <p className="text-white/90 text-lg mb-6">Smart options for safe residue handling</p>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/30 p-4 rounded-2xl backdrop-blur text-center border border-white/30">
            <div className="text-2xl font-bold text-white mb-1">🌤️ {weather.temp}°C</div>
            <div className="text-white text-sm">Live • {weather.rainProb}% rain</div>
          </div>
          <div className="bg-white/30 p-4 rounded-2xl backdrop-blur text-center border border-white/30">
            <div className="text-2xl font-bold text-white mb-1">₹22/kg</div>
            <div className="text-white text-sm">Best buyer rate</div>
          </div>
        </div>

        <button 
          onClick={() => goTo('add')} 
          className="w-full bg-white text-green-700 py-4 px-6 rounded-2xl font-bold text-xl mb-6 shadow-2xl hover:scale-[1.02] transition-all border-2 border-white/30"
        >
          🚀 Get My Options Now
        </button>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <button className="bg-white/90 p-3 rounded-xl shadow-lg hover:shadow-xl transition-all text-left">
            <div className="text-xl mb-1">📱</div>
            <div className="font-bold text-green-800 text-sm">Hotline</div>
            <div className="text-xs text-gray-700">1800-RESIDUE</div>
          </button>
          <button className="bg-white/90 p-3 rounded-xl shadow-lg hover:shadow-xl transition-all text-left">
            <div className="text-xl mb-1">📊</div>
            <div className="font-bold text-green-800 text-sm">My Bookings</div>
            <div className="text-xs text-gray-700">2 active</div>
          </button>
        </div>

        <p className="text-white/70 text-xs mb-4">Gaining trust of farmers</p>
      </div>
    </div>
  );
}
