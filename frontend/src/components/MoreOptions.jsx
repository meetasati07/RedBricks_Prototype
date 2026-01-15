import { useState } from "react";

export default function MoreOptions({ onBack }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const options = [
        {
            id: 'ngo',
            title: 'NGO Support',
            icon: '🤝',
            description: 'Connect with NGOs for farming assistance'
        },
        {
            id: 'mulching',
            title: 'Mulching Methods',
            icon: '🌱',
            description: 'Learn about soil enhancement techniques'
        },
        {
            id: 'composting',
            title: 'Composting',
            icon: '♻️',
            description: 'Convert residue into nutrient-rich compost'
        },
        {
            id: 'storage',
            title: 'Storage Solutions',
            icon: '📦',
            description: 'Temporary storage options for crop residue'
        },
        {
            id: 'training',
            title: 'Training Programs',
            icon: '📚',
            description: 'Access agricultural training courses'
        },
        {
            id: 'subsidy',
            title: 'Subsidy Info',
            icon: '💰',
            description: 'Government subsidy eligibility check'
        }
    ];

    const mulchingMethods = [
        {
            id: 'in-field',
            name: 'In-field Mulching',
            description: 'Spreading residue on the field enriches soil for the next crop and reduces weeds naturally.',
            feasible: true
        },
        {
            id: 'composting-pit',
            name: 'Composting Pits',
            description: 'Turn residue into nutrient-rich compost in small pits. Light rainfall helps maintain proper moisture.',
            feasible: true
        },
        {
            id: 'on-field',
            name: 'On-field Decomposition',
            description: 'Natural decomposition accelerated by warm conditions using microbial sprays. Requires no machinery.',
            feasible: true
        },
        {
            id: 'storage',
            name: 'Temporary Storage',
            description: 'Store residue safely for later use or sale. Requires careful management to prevent spoilage.',
            feasible: false
        },
        {
            id: 'partial',
            name: 'Partial Removal',
            description: 'Remove part of residue for sale while leaving some for soil health. Dry weather makes handling easier.',
            feasible: true
        }
    ];

    const handleRequest = () => {
        if (!selectedOption) return;

        setMessage(`✓ Request for ${options.find(o => o.id === selectedOption)?.title} submitted successfully!`);
        setIsSuccess(true);
        setTimeout(() => {
            setSelectedOption(null);
            setMessage('');
        }, 2000);
    };

    if (selectedOption === 'mulching') {
        return (
            <div className="min-h-screen bg-linear-to-br from-green-500 to-green-700 p-3 sm:p-6 flex flex-col">
                <div className="w-full max-w-sm sm:max-w-md mx-auto flex flex-col flex-1">
                    <button
                        onClick={() => setSelectedOption(null)}
                        className="mb-4 sm:mb-6 text-white hover:text-green-100 active:text-green-200 flex items-center gap-2 text-base sm:text-lg font-medium py-2"
                    >
                        ← Back
                    </button>

                    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden flex flex-col flex-1">
                        <div className="bg-linear-to-r from-green-600 to-green-700 p-4 sm:p-6">
                            <h1 className="text-2xl sm:text-3xl font-bold text-white">🌱 Mulching Methods</h1>
                        </div>

                        <div className="p-4 sm:p-8 space-y-3 sm:space-y-4 flex-1 overflow-y-auto">
                            {mulchingMethods.map(method => (
                                <div
                                    key={method.id}
                                    className={`p-3 sm:p-4 rounded-lg border-2 transition-all ${
                                        method.feasible
                                            ? 'border-green-300 bg-green-50 hover:bg-green-100'
                                            : 'border-gray-300 bg-gray-100 opacity-60'
                                    }`}
                                >
                                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{method.name}</h3>
                                    <p className="text-gray-600 text-xs sm:text-sm mt-1">{method.description}</p>
                                    {!method.feasible && (
                                        <p className="text-gray-500 text-xs mt-2 italic">Not feasible for current conditions</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-green-500 to-green-700 p-3 sm:p-6 flex flex-col">
            <div className="w-full max-w-2xl mx-auto flex flex-col flex-1">
                <button
                    onClick={onBack}
                    className="mb-4 sm:mb-6 text-white hover:text-green-100 active:text-green-200 flex items-center gap-2 text-base sm:text-lg font-medium py-2"
                >
                    ← Back
                </button>

                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden flex flex-col flex-1">
                    <div className="bg-linear-to-r from-green-600 to-green-700 p-4 sm:p-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white">⚙️ More Options</h1>
                    </div>

                    <div className="p-4 sm:p-8 space-y-3 sm:space-y-4 flex-1 overflow-y-auto">
                        <div className="grid grid-cols-1 gap-3">
                            {options.map(option => (
                                <button
                                    key={option.id}
                                    onClick={() => setSelectedOption(option.id)}
                                    className="p-4 sm:p-5 bg-linear-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl hover:border-green-400 hover:shadow-lg active:scale-95 transition-all text-left"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-3xl sm:text-4xl">{option.icon}</span>
                                        <div>
                                            <h3 className="font-bold text-gray-800 text-sm sm:text-base">{option.title}</h3>
                                            <p className="text-gray-600 text-xs sm:text-sm">{option.description}</p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {message && (
                            <div className={`p-3 sm:p-4 rounded-lg text-center font-semibold text-sm sm:text-base ${
                                isSuccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                                {message}
                            </div>
                        )}

                        {selectedOption && selectedOption !== 'mulching' && (
                            <button
                                onClick={handleRequest}
                                className="w-full bg-linear-to-r from-green-600 to-green-700 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg hover:from-green-700 hover:to-green-800 active:from-green-800 active:to-green-900 transition-all duration-200 text-base sm:text-lg min-h-12 sm:min-h-14"
                            >
                                Request {options.find(o => o.id === selectedOption)?.title}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}