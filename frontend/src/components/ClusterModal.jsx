export default function ClusterModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">🟣 Farm Cluster</h3>
          <button onClick={onClose} className="text-2xl">×</button>
        </div>
        <div className="space-y-4 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="font-bold text-lg">5 Farms | 25 tons total</div>
            <div className="text-sm text-gray-600">Bulk pickup in 3 days</div>
          </div>
          <div className="text-sm space-y-2">
            <p><span className="font-bold">Benefits:</span> 30% cheaper | Weather protected</p>
            <p><span className="font-bold">Contact:</span> Cluster Leader - 98765-43210</p>
          </div>
        </div>
        <button className="w-full bg-green-500 text-white py-3 rounded-xl font-bold">
          📱 Call Cluster Leader
        </button>
      </div>
    </div>
  );
}
