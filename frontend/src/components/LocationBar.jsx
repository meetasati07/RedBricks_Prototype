export default function LocationBar({ location = "Pune District", onEdit }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl mb-6">
      <span className="text-sm font-medium text-gray-700">📍 {location}</span>
      <button className="text-green-600 text-xs font-bold underline hover:text-green-700">Edit</button>
    </div>
  );
}
