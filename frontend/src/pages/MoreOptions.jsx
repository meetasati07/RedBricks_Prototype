import CHCAvailability from "../components/CHCAvailability";

export default function MoreOptions({ go }) {
  return (
    <div className="min-h-screen bg-green-600 p-4 pb-20">
      <div className="flex items-center mb-4">
        <button onClick={() => go("buyer")} className="text-white text-2xl">←</button>
        <div className="flex-1 text-center">
          <div className="text-white text-sm font-medium">Step 3/3</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 space-y-4 shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-800 text-center">🌱 Backup Plans</h2>

        <div className="space-y-3">
          <div className="bg-yellow-50 border-2 border-yellow-200 p-4 rounded-xl">
            <h4 className="font-bold mb-2 flex items-center">🌿 In-Field Mulching</h4>
            <p className="text-sm text-gray-700">Chop & mix into soil – ready for next crop immediately</p>
          </div>

          <div className="bg-purple-50 border-2 border-purple-200 p-4 rounded-xl">
            <h4 className="font-bold mb-2 flex items-center">🤝 NGO Collection</h4>
            <p className="text-sm text-gray-700">Free pickup drives every week – call local center</p>
          </div>

          <CHCAvailability />

          <div className="text-center pt-4 border-t">
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full">
              ✅ All options safe – no need to burn!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
