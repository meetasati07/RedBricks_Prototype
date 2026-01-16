export default function NGOModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">🤝 NGO Collection</h3>
          <button onClick={onClose} className="text-2xl">×</button>
        </div>
        <div className="space-y-4 mb-6">
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <div className="font-bold text-lg">FREE Pickup</div>
            <div className="text-sm text-gray-600">Next week - Any quantity</div>
          </div>
          <div className="text-sm">
            <p><span className="font-bold">NGO:</span> GreenEarth Foundation</p>
            <p><span className="font-bold">Helpline:</span> 1800-XXX-XXXX</p>
          </div>
        </div>
        <button className="w-full bg-purple-500 text-white py-3 rounded-xl font-bold">
          📞 Call NGO
        </button>
      </div>
    </div>
  );
}
