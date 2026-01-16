import { useState, useEffect } from "react";

export default function AddCrop({ goTo }) {
  const [form, setForm] = useState({
    crop: "", landSize: "", residueQty: "", unit: "kg", harvestDate: "",
    transport: "", machine: "", location: "", weather: {}
  });
  const [liveLocation, setLiveLocation] = useState("Getting location...");
  const [farmLocation, setFarmLocation] = useState("");
  const [useLiveLocation, setUseLiveLocation] = useState(true);
  const [safeDays, setSafeDays] = useState(5);
  const [locationStep, setLocationStep] = useState('confirm');

  useEffect(() => {
    setTimeout(() => {
      setLiveLocation("Pune District, Kothrud");
    }, 1000);
  }, []);

  useEffect(() => {
    let days = 7;
    if (form.crop === "Rice") days = 4;
    if (form.crop === "Wheat") days = 6;
    if (form.weather.rainProb > 30) days -= 2;
    if (parseFloat(form.residueQty) > 5) days -= 1;
    setSafeDays(Math.max(1, days));
  }, [form.crop, form.weather.rainProb, form.residueQty]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const toggleUnit = () => setForm({...form, unit: form.unit === "kg" ? "tons" : "kg"});

  const handleLocationConfirm = (useLive) => {
    setUseLiveLocation(useLive);
    if (useLive) {
      setForm(prev => ({...prev, weather: { temp: 28, rainProb: 25, humidity: 65 }}));
    }
    setLocationStep('form');
  };

  const handleLocationEdit = () => {
    setLocationStep('edit');
  };

  const handleCustomLocationSubmit = () => {
    if (!farmLocation.trim()) return;
    
    setUseLiveLocation(false);  
    setForm(prev => ({
      ...prev, 
      location: farmLocation,
      weather: { 
        temp: 26 + Math.floor(Math.random() * 5), 
        rainProb: 15 + Math.floor(Math.random() * 25),
        humidity: 70 
      }
    }));
    setLocationStep('form');
  };

  const handleSubmit = () => {
    goTo('results', { 
      ...form, 
      safeDays, 
      farmLocation: useLiveLocation ? liveLocation : farmLocation 
    });
  };

  const crops = ["Rice", "Wheat", "Maize", "Sugarcane", "Cotton"];

  if (locationStep === 'confirm') {
    return (
      <div className="min-h-screen bg-green-600 p-6 pb-24 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">📍 Farm Location</h2>
          
          <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-100 mb-8">
            <div className="text-sm font-bold text-blue-800 mb-2">Detected Location:</div>
            <div className="text-xl font-bold text-gray-800 mb-4">{liveLocation}</div>
            <div className="text-xs text-gray-600">Is this your farm location?</div>
          </div>

          <div className="space-y-3">
            <button 
              onClick={() => handleLocationConfirm(true)}
              className="w-full bg-green-500 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:bg-green-600 transition-all"
            >
              ✅ Yes, use this location
            </button>
            <button 
              onClick={handleLocationEdit}
              className="w-full border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-xl font-bold hover:bg-gray-50 transition-all"
            >
              ✏️ No, enter farm location
            </button>
          </div>

          <button onClick={() => goTo('home')} className="w-full mt-6 text-sm text-gray-500 underline">
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (locationStep === 'edit') {
    return (
      <div className="min-h-screen bg-green-600 p-6 pb-24 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">✏️ Farm Location</h2>
          
          <div className="text-sm text-gray-600 mb-6 text-center">
            Enter your exact farm location for accurate weather:
          </div>
          
          <div className="space-y-4 mb-8">
            <input
              value={farmLocation}
              onChange={(e) => setFarmLocation(e.target.value)}
              placeholder="Village/Taluka, District (ex: Shirur, Pune)"
              className="w-full p-4 border border-gray-300 rounded-xl text-lg text-center focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <div className="text-xs text-gray-500 text-center">
              Weather updates automatically for this location
            </div>
          </div>

          <div className="space-y-3">
            <button 
              onClick={handleCustomLocationSubmit}
              disabled={!farmLocation.trim()}
              className="w-full bg-green-500 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
            >
              ✅ Use {farmLocation.substring(0, 20)}...
            </button>
            <button 
              onClick={() => setLocationStep('confirm')}
              className="w-full border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-xl font-bold hover:bg-gray-50 transition-all"
            >
              ← Use detected location
            </button>
          </div>

          <button onClick={() => goTo('home')} className="w-full mt-6 text-sm text-gray-500 underline">
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-600 p-6 pb-24">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => {
              setLocationStep('confirm');
              setUseLiveLocation(true);
              setFarmLocation("");
            }} 
            className="text-white text-3xl mr-4"
          >
            ←
          </button>
          <div className="flex-1 text-center">
            <div className="text-white text-xl font-bold">Step 1/3</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-2xl space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center">🌾 Farm Details</h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-400">
              <div className="text-sm font-bold text-blue-800 mb-1">
                📍 {useLiveLocation ? liveLocation : farmLocation}
              </div>
              <div className="text-xs text-gray-600">
                🌤️ {form.weather.temp || "?"}°C | {form.weather.rainProb || "?"}% rain
              </div>
              <div className="text-xs text-red-600 font-bold mt-1">
                [{useLiveLocation ? 'DETECTED' : 'CUSTOM'}]
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border-2 border-green-100">
              <div className="text-sm font-medium text-gray-700 mb-2">Live Calculation:</div>
              <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                <span>{form.crop || 'Crop'}</span>
                <span>{form.residueQty || 0} {form.unit}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>🌧️ Rain Risk:</span>
                <span className={form.weather.rainProb > 30 ? 'text-red-600 font-bold' : 'text-green-600 font-bold'}>
                  {form.weather.rainProb || "?"}%
                </span>
              </div>
              <div className="flex justify-between items-center mt-3 p-2 bg-white rounded-lg">
                <span className="font-bold">Safe Days:</span>
                <span className={`text-xl font-bold px-3 py-1 rounded-full ${
                  safeDays >= 5 ? 'bg-green-100 text-green-800' : 
                  safeDays >= 3 ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {safeDays}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Crop Type</label>
                <select name="crop" value={form.crop} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="">Select crop</option>
                  {crops.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Land (acres)</label>
                <input name="landSize" value={form.landSize} onChange={handleChange} placeholder="5" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Residue Amount ({form.unit})</label>
                <div className="flex">
                  <input name="residueQty" value={form.residueQty} onChange={handleChange} placeholder="2.5" className="w-24 p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                  <button onClick={toggleUnit} className="px-6 py-3 bg-gray-100 border border-l-0 rounded-r-lg text-sm font-bold hover:bg-gray-200">{form.unit.toUpperCase()}</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Harvest Date</label>
                <input name="harvestDate" value={form.harvestDate} onChange={handleChange} type="date" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">🚚 Transport?</label>
                <div className="space-y-2">
                  <label className="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <input type="radio" name="transport" value="yes" onChange={handleChange} className="mr-3 w-5 h-5" />
                    <span className="text-sm">Yes</span>
                  </label>
                  <label className="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <input type="radio" name="transport" value="no" onChange={handleChange} className="mr-3 w-5 h-5" />
                    <span className="text-sm">No</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">🚜 Machine?</label>
                <div className="space-y-2">
                  <label className="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <input type="radio" name="machine" value="yes" onChange={handleChange} className="mr-3 w-5 h-5" />
                    <span className="text-sm">Yes</span>
                  </label>
                  <label className="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <input type="radio" name="machine" value="no" onChange={handleChange} className="mr-3 w-5 h-5" />
                    <span className="text-sm">No</span>
                  </label>
                </div>
              </div>
            </div>

            <button 
              onClick={handleSubmit} 
              disabled={!form.crop || !form.residueQty}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:from-green-600 hover:to-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
            >
              ✨ Get Smart Options →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
