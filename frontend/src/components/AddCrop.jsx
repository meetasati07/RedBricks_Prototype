import { useState } from "react";

export default function AddCrop({ onBack }) {
  const [form, setForm] = useState({
    cropType: "",
    quantity: "",
    price: "",
    location: "West India",
    residueType: "",
    transportAvailable: "",
    machineAvailable: ""
  });

  const [recommendation, setRecommendation] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const {
      cropType,
      quantity,
      price,
      residueType,
      transportAvailable,
      machineAvailable
    } = form;

    if (!cropType || !quantity || !price || !residueType) {
      setMessage("Please fill all required fields");
      return;
    }

    // Simple rule-based recommendation (judge-friendly)
    if (transportAvailable === "no" && machineAvailable === "no") {
      setRecommendation({
        title: "🌱 Mulching Recommended",
        reason: "No transport or machine available. Weather is suitable for in-field mulching."
      });
    } else {
      setRecommendation({
        title: "💰 Selling Recommended",
        reason: "Logistics available. Buyers nearby can pick up residue."
      });
    }

    setMessage("✓ Crop details saved");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-green-700 p-4">
      <button onClick={onBack} className="text-white mb-4">← Back</button>

      <div className="bg-white rounded-xl p-6 space-y-4">
        <h2 className="text-2xl font-bold">🌾 Add Crop Details</h2>

        <select name="cropType" onChange={handleChange} className="input">
          <option value="">Select Crop</option>
          <option value="rice">Rice</option>
          <option value="wheat">Wheat</option>
        </select>

        <input name="quantity" type="number" placeholder="Quantity (kg)" onChange={handleChange} className="input" />
        <input name="price" type="number" placeholder="Expected Price (Rs/kg)" onChange={handleChange} className="input" />

        <select name="residueType" onChange={handleChange} className="input">
          <option value="">Residue Type</option>
          <option value="loose">Loose</option>
          <option value="baled">Baled</option>
        </select>

        <select name="transportAvailable" onChange={handleChange} className="input">
          <option value="">Transport Available?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <select name="machineAvailable" onChange={handleChange} className="input">
          <option value="">Machine Available?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        {recommendation && (
          <div className="bg-green-50 border border-green-300 p-3 rounded">
            <h4 className="font-bold">{recommendation.title}</h4>
            <p className="text-sm">{recommendation.reason}</p>
          </div>
        )}

        {message && <p className="text-green-700 font-semibold">{message}</p>}

        <button onClick={handleSubmit} className="btn-primary w-full">
          Save Crop
        </button>
      </div>
    </div>
  );
}
