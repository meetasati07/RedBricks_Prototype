import { useState } from "react";

export default function RequestBuyer({ onBack }) {
    const [buyer, setBuyer] = useState('');
    const [quantity, setQuantity] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    
    const buyers = [
        { id: 1, name: 'ABC Traders', price: 20 },
        { id: 2, name: 'XYZ Exports', price: 22 },
        { id: 3, name: 'Fresh Produce Co', price: 18 },
        { id: 4, name: 'Green Valley Ltd', price: 25 },
    ];

    function handleOnClick() {
        if (!buyer || !quantity) {
            setMessage("Please select a buyer and enter quantity");
            setIsSuccess(false);
            setTimeout(() => setMessage(''), 3000);
            return;
        }
        
        setMessage("✓ Request sent successfully!");
        setIsSuccess(true);
        setTimeout(() => {
            setBuyer('');
            setQuantity('');
            setMessage('');
        }, 2000);
    }
    
    const selectedBuyer = buyers.find(b => b.id === parseInt(buyer));
    const estimatedAmount = selectedBuyer && quantity ? (selectedBuyer.price * quantity).toFixed(2) : 0;
    
    return (
        <div className="min-h-screen bg-linear-to-br from-green-500 to-green-700 p-3 sm:p-6 flex flex-col">
            <div className="w-full max-w-sm sm:max-w-md mx-auto flex flex-col flex-1">
                <button 
                    onClick={onBack}
                    className="mb-4 sm:mb-6 text-white hover:text-green-100 active:text-green-200 flex items-center gap-2 text-base sm:text-lg font-medium py-2"
                >
                    ← Back
                </button>
                
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden flex flex-col flex-1">
                    <div className="bg-linear-to-r from-green-600 to-green-700 p-4 sm:p-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white">🤝 Request Buyer</h1>
                    </div>
                    
                    <div className="p-4 sm:p-8 space-y-4 sm:space-y-6 flex-1 flex flex-col">
                        <div>
                            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Select Buyer</label>
                            <select 
                                value={buyer}
                                onChange={(e) => setBuyer(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:outline-none text-base sm:text-lg bg-white"
                            >
                                <option value="">Choose a buyer</option>
                                {buyers.map(b => (
                                    <option key={b.id} value={b.id}>
                                        {b.name} - Rs.{b.price}/kg
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Quantity (kg)</label>
                            <input 
                                type="number" 
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                placeholder="Enter quantity to sell"
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:outline-none text-base sm:text-lg"
                            />
                        </div>
                        
                        {selectedBuyer && quantity && (
                            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 sm:p-4">
                                <p className="text-gray-700 text-xs sm:text-sm">Estimated Amount:</p>
                                <p className="text-xl sm:text-2xl font-bold text-blue-600">Rs. {estimatedAmount}</p>
                            </div>
                        )}
                        
                        {message && (
                            <div className={`p-3 sm:p-4 rounded-lg text-center font-semibold text-sm sm:text-base ${
                                isSuccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                                {message}
                            </div>
                        )}
                        
                        <button 
                            onClick={handleOnClick}
                            className="w-full bg-linear-to-r from-green-600 to-green-700 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg hover:from-green-700 hover:to-green-800 active:from-green-800 active:to-green-900 transition-all duration-200 text-base sm:text-lg mt-auto min-h-12 sm:min-h-14"
                        >
                            Send Request
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}