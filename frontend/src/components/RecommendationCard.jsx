export default function RecommendationCard({ type, reason, riskDays = 4 }) {
  const isMulch = type === "mulch";
  return (
    <div className={`p-6 rounded-2xl shadow-lg mb-6 ${isMulch ? 'bg-yellow-50 border-4 border-yellow-200' : 'bg-green-50 border-4 border-green-200'}`}>
      <div className="flex items-center mb-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl mr-4 ${
          isMulch ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'
        }`}>
          {isMulch ? '🌱' : '💰'}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800">{isMulch ? 'Mulching' : 'Selling'}</h3>
          <p className="text-sm text-gray-600 mt-1">{reason}</p>
        </div>
      </div>
      
      <div className="flex items-center bg-white p-3 rounded-xl">
        <div className={`w-4 h-4 rounded-full mr-3 ${riskDays >= 4 ? 'bg-green-500' : riskDays >= 2 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
        <span className="font-bold text-lg">Safe: {riskDays} days</span>
      </div>
    </div>
  );
}
