import { useState } from "react";
import RequestBuyer from "./requestBuyer.jsx";
import AddCrop from "./addCrop.jsx";
import MoreOptions from "./MoreOptions.jsx";
import FarmerNotifications from "./FarmerNotifications.jsx";

export default function MainApp() {
    const [currentPage, setCurrentPage] = useState('');
    const [unreadNotifications, setUnreadNotifications] = useState(3);

    const renderPage = () => {
        if (currentPage === 'requestBuyer') {
            return <RequestBuyer onBack={() => setCurrentPage('')} />;
        } else if (currentPage === 'addCrop') {
            return <AddCrop onBack={() => setCurrentPage('')} />
        } else if (currentPage === 'moreOptions') {
            return <MoreOptions onBack={() => setCurrentPage('')} />
        } else if (currentPage === 'notifications') {
            return <FarmerNotifications onClose={(action) => {
                setUnreadNotifications(0);
                if (action) {
                    setCurrentPage(action);
                } else {
                    setCurrentPage('');
                }
            }} />
        }
    }

    if (currentPage) {
        return renderPage();
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-green-500 to-green-700 p-3 sm:p-6 flex flex-col">
            <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
                {/* Header with Notification Bell */}
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                    <div className="text-center flex-1">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2">FarmDirect</h1>
                        <p className="text-green-100 text-sm sm:text-base md:text-lg">Connect Farmers with Buyers</p>
                    </div>
                    <button
                        onClick={() => setCurrentPage('notifications')}
                        className="relative p-2 sm:p-3 hover:bg-white hover:bg-opacity-20 rounded-full transition-all active:scale-95"
                        title="View Notifications"
                    >
                        <span className="text-2xl sm:text-3xl">🔔</span>
                        {unreadNotifications > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs sm:text-sm font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                                {unreadNotifications > 9 ? '9+' : unreadNotifications}
                            </span>
                        )}
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 flex-1 content-start">
                    <button
                        onClick={() => setCurrentPage('addCrop')}
                        className="btn-primary"
                    >
                        <span className="text-3xl sm:text-4xl mb-2">🌾</span>
                        <span className="text-base sm:text-lg">Add Crop</span>
                    </button>
                    <button
                        onClick={() => setCurrentPage('requestBuyer')}
                        className="btn-primary"
                    >
                        <span className="text-3xl sm:text-4xl mb-2">🤝</span>
                        <span className="text-base sm:text-lg">Request Buyer</span>
                    </button>
                    <button className="btn-secondary" onClick={() => alert("Request for CO-OP made successfully")}>
                        <span className="text-3xl sm:text-4xl mb-2">🏢</span>
                        <span className="text-base sm:text-lg" >CO-OP</span>
                    </button>
                    <button className="btn-secondary" onClick={() => alert("Request for CHS made successfully")} >
                        <span className="text-3xl sm:text-4xl mb-2">🏛️</span>
                        <span className="text-base sm:text-lg">CHC</span>
                    </button>
                    <button className="btn-secondary sm:col-span-2" onClick={() => setCurrentPage('moreOptions')}>
                        <span className="text-3xl sm:text-4xl mb-2">⚙️</span>
                        <span className="text-base sm:text-lg" >More Options</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

