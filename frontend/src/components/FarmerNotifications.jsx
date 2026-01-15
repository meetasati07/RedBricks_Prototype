import { useState, useEffect } from "react";

export default function FarmerNotifications({ onClose }) {
    const [notifications, setNotifications] = useState([]);
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedNotif, setSelectedNotif] = useState(null);

    // Simulated location data and weather conditions
    const locationWeatherData = {
        'North India': {
            region: 'North India',
            weather: 'Sunny & Dry',
            temperature: 32,
            humidity: 35,
            windSpeed: 8,
            urgencyLevel: 'high'
        },
        'South India': {
            region: 'South India',
            weather: 'Light Rainfall',
            temperature: 28,
            humidity: 65,
            windSpeed: 4,
            urgencyLevel: 'medium'
        },
        'East India': {
            region: 'East India',
            weather: 'Cloudy',
            temperature: 25,
            humidity: 58,
            windSpeed: 5,
            urgencyLevel: 'medium'
        },
        'West India': {
            region: 'West India',
            weather: 'Sunny',
            temperature: 30,
            humidity: 40,
            windSpeed: 6,
            urgencyLevel: 'high'
        }
    };

    const notificationTemplates = {
        sellOpportunity: {
            title: '💰 Urgent: Buyer Available Now!',
            icon: '🛍️',
            priority: 'high',
            recommendation: 'SELL YOUR CROP RESIDUE'
        },
        ngoOpportunity: {
            title: '🤝 NGO Support Available',
            icon: '🏢',
            priority: 'high',
            recommendation: 'CONNECT WITH NGO'
        },
        mulchingOpportunity: {
            title: '🌱 Perfect Weather for Mulching',
            icon: '🌾',
            priority: 'medium',
            recommendation: 'START SELF MULCHING'
        },
        timelyAction: {
            title: '⏰ Act Now - Limited Window',
            icon: '⚡',
            priority: 'high',
            recommendation: 'IMMEDIATE ACTION NEEDED'
        }
    };

    // Generate notifications based on location and conditions
    const generateNotifications = (locationData) => {
        const newNotifications = [];

        if (locationData.urgencyLevel === 'high' && locationData.weather === 'Sunny & Dry') {
            newNotifications.push({
                id: 1,
                template: 'sellOpportunity',
                title: '💰 Urgent: Buyer Available Now!',
                description: `Sunny and dry weather in ${locationData.region} is perfect for crop trading. ABC Traders is actively buying at Rs. 20/kg. Don't miss this opportunity!`,
                action: 'View Buyers',
                actionType: 'buyer',
                urgency: 'high',
                timeframe: 'Next 2-3 hours',
                impact: 'Can earn Rs. 2,000-5,000 today'
            });
        }

        if ((locationData.weather === 'Sunny & Dry' || locationData.weather === 'Sunny') && locationData.temperature > 28) {
            newNotifications.push({
                id: 2,
                template: 'mulchingOpportunity',
                title: '🌱 Perfect Weather for Mulching',
                description: `Ideal conditions in ${locationData.region} for in-field mulching. Warm and dry weather will help residue dry properly and reduce weeds naturally.`,
                action: 'Learn Methods',
                actionType: 'mulching',
                urgency: 'medium',
                timeframe: 'Today & Tomorrow',
                impact: 'Improve soil health for next crop'
            });
        }

        if (locationData.urgencyLevel === 'high') {
            newNotifications.push({
                id: 3,
                template: 'ngoOpportunity',
                title: '🤝 NGO Support Needed',
                description: `Local NGOs in ${locationData.region} are accepting crop residue donations. Help the community while managing your farm waste responsibly.`,
                action: 'Connect Now',
                actionType: 'ngo',
                urgency: 'high',
                timeframe: 'Within 24 hours',
                impact: 'Community benefit + tax deduction'
            });
        }

        if (newNotifications.length === 0) {
            newNotifications.push({
                id: 4,
                template: 'timelyAction',
                title: '⏰ Check Available Options',
                description: `Weather conditions in ${locationData.region} are favorable for various crop residue management methods. Review your options to maximize profits or community benefit.`,
                action: 'View Options',
                actionType: 'options',
                urgency: 'medium',
                timeframe: 'Next 24-48 hours',
                impact: 'Plan your next steps'
            });
        }

        return newNotifications;
    };

    useEffect(() => {
        // Simulate getting user location
        const locations = Object.keys(locationWeatherData);
        const randomLocation = locations[Math.floor(Math.random() * locations.length)];
        const locationData = locationWeatherData[randomLocation];

        setLocation(locationData);
        const notifs = generateNotifications(locationData);
        setNotifications(notifs);
        setLoading(false);
    }, []);

    const getPriorityColor = (urgency) => {
        switch(urgency) {
            case 'high': return 'border-red-300 bg-red-50';
            case 'medium': return 'border-yellow-300 bg-yellow-50';
            default: return 'border-blue-300 bg-blue-50';
        }
    };

    const getActionRoute = (actionType) => {
        switch(actionType) {
            case 'buyer': return 'requestBuyer';
            case 'mulching': return 'moreOptions-mulching';
            case 'ngo': return 'moreOptions-ngo';
            case 'options': return 'moreOptions';
            default: return '';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-green-500 to-green-700 p-3 sm:p-6 flex items-center justify-center">
                <div className="text-center text-white">
                    <div className="animate-spin text-4xl mb-4">⏳</div>
                    <p className="text-lg font-semibold">Analyzing your location...</p>
                </div>
            </div>
        );
    }

    if (selectedNotif) {
        return (
            <div className="min-h-screen bg-linear-to-br from-green-500 to-green-700 p-3 sm:p-6 flex flex-col">
                <div className="w-full max-w-sm sm:max-w-md mx-auto flex flex-col flex-1">
                    <button
                        onClick={() => setSelectedNotif(null)}
                        className="mb-4 sm:mb-6 text-white hover:text-green-100 active:text-green-200 flex items-center gap-2 text-base sm:text-lg font-medium py-2 transition-colors"
                    >
                        ← Back to Alerts
                    </button>

                    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden flex flex-col flex-1">
                        <div className={`p-4 sm:p-6 ${
                            selectedNotif.urgency === 'high' 
                                ? 'bg-linear-to-r from-red-600 to-red-700' 
                                : selectedNotif.urgency === 'medium'
                                ? 'bg-linear-to-r from-yellow-600 to-yellow-700'
                                : 'bg-linear-to-r from-green-600 to-green-700'
                        }`}>
                            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{selectedNotif.title}</h1>
                        </div>

                        <div className="p-4 sm:p-8 space-y-4 sm:space-y-6 flex-1 overflow-y-auto">
                            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                                <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-1">Location</p>
                                <p className="text-sm sm:text-base font-bold text-gray-800">{location.region}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-3">
                                    <p className="text-xs font-semibold text-gray-600">Weather</p>
                                    <p className="text-sm font-bold text-gray-800">{location.weather}</p>
                                </div>
                                <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-3">
                                    <p className="text-xs font-semibold text-gray-600">Temperature</p>
                                    <p className="text-sm font-bold text-gray-800">{location.temperature}°C</p>
                                </div>
                                <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-3">
                                    <p className="text-xs font-semibold text-gray-600">Humidity</p>
                                    <p className="text-sm font-bold text-gray-800">{location.humidity}%</p>
                                </div>
                                <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-3">
                                    <p className="text-xs font-semibold text-gray-600">Wind Speed</p>
                                    <p className="text-sm font-bold text-gray-800">{location.windSpeed} km/h</p>
                                </div>
                            </div>

                            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                                <h3 className="font-bold text-gray-800 text-sm sm:text-base mb-2">Why This Matters</h3>
                                <p className="text-sm text-gray-700 leading-relaxed">{selectedNotif.description}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-3">
                                    <p className="text-xs font-semibold text-gray-700">Timeframe</p>
                                    <p className="text-sm font-bold text-blue-700">{selectedNotif.timeframe}</p>
                                </div>
                                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-3">
                                    <p className="text-xs font-semibold text-gray-700">Impact</p>
                                    <p className="text-sm font-bold text-green-700">{selectedNotif.impact}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => onClose(getActionRoute(selectedNotif.actionType))}
                                className="w-full bg-linear-to-r from-green-600 to-green-700 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg hover:from-green-700 hover:to-green-800 active:from-green-800 active:to-green-900 transition-all duration-200 text-base sm:text-lg min-h-12 sm:min-h-14"
                            >
                                {selectedNotif.action}
                            </button>
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
                    onClick={() => onClose()}
                    className="mb-4 sm:mb-6 text-white hover:text-green-100 active:text-green-200 flex items-center gap-2 text-base sm:text-lg font-medium py-2 transition-colors"
                >
                    ← Back to Home
                </button>

                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden flex flex-col flex-1">
                    <div className="bg-linear-to-r from-green-600 to-green-700 p-4 sm:p-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">📢 Smart Alerts</h1>
                        <p className="text-green-100 text-sm sm:text-base">Location-based recommendations for {location?.region}</p>
                    </div>

                    <div className="p-4 sm:p-8 space-y-3 sm:space-y-4 flex-1 overflow-y-auto">
                        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-3 sm:p-4">
                            <p className="text-xs sm:text-sm text-gray-700">
                                <span className="font-bold">Current Conditions:</span> {location?.weather} • {location?.temperature}°C • Humidity {location?.humidity}%
                            </p>
                        </div>

                        {notifications.length > 0 ? (
                            <div className="space-y-3">
                                {notifications.map(notif => (
                                    <button
                                        key={notif.id}
                                        onClick={() => setSelectedNotif(notif)}
                                        className={`w-full p-4 sm:p-5 border-2 rounded-xl hover:shadow-lg active:scale-95 transition-all text-left ${getPriorityColor(notif.urgency)}`}
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="font-bold text-gray-800 text-sm sm:text-base flex-1">{notif.title}</h3>
                                            <span className="text-2xl ml-2">{notif.template === 'sellOpportunity' ? '💰' : notif.template === 'ngoOpportunity' ? '🤝' : notif.template === 'mulchingOpportunity' ? '🌱' : '⏰'}</span>
                                        </div>
                                        <p className="text-xs sm:text-sm text-gray-700 mb-3 line-clamp-2">{notif.description}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-semibold px-2 py-1 rounded bg-white bg-opacity-50">
                                                {notif.timeframe}
                                            </span>
                                            <span className="text-xs font-bold text-blue-600">→ {notif.action}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500">No urgent notifications at the moment</p>
                            </div>
                        )}

                        <button
                            onClick={onClose}
                            className="w-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-200 text-base sm:text-lg min-h-12 sm:min-h-14 mt-4"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
