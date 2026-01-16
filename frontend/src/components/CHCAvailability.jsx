import { chc } from "../data/chc";

export default function CHCAvailability() {
  return (
    <div className="border-2 border-gray-200 p-4 rounded-xl">
      <div className="flex items-center mb-3">
        🚜 <h4 className="font-bold ml-2 text-lg">CHC Machines Nearby</h4>
      </div>
      {chc.map((item, i) => (
        <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
          <span className="font-medium">{item.machine}</span>
          <div className="text-right">
            <p className={`text-sm ${item.available === 'Today' ? 'text-green-700 font-bold' : 'text-gray-600'}`}>
              {item.available}
            </p>
            <p className="text-xs text-gray-500">₹{item.cost}/hr</p>
          </div>
        </div>
      ))}
    </div>
  );
}
