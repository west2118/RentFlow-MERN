import { useEffect, useState } from "react";
import { Home, Key, DollarSign } from "lucide-react";

export function Loading() {
  const [activePulse, setActivePulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePulse((prev) => (prev + 1) % 3);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 z-50">
      <div className="flex flex-col items-center">
        {/* RentFlow Logo and Brand Name */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping opacity-75"></div>
            <div className="h-16 w-16 bg-primary rounded-lg flex items-center justify-center relative">
              <Home className="h-8 w-8 text-white" />
            </div>
          </div>
          <span className="text-3xl font-bold text-gray-800">RentFlow</span>
          <p className="text-gray-500 mt-2">Simplifying Property Management</p>
        </div>

        {/* Property Management Flow Animation */}
        <div className="flex items-center justify-center space-x-8 mb-8">
          {[0, 1, 2].map((index) => (
            <div key={index} className="relative flex flex-col items-center">
              {/* Connecting line */}
              {index < 2 && (
                <div className="absolute top-1/2 left-full w-8 h-1 bg-gradient-to-r from-primary/30 to-primary/10 -translate-y-1/2" />
              )}

              {/* Icons with pulse effect */}
              <div
                className={`p-3 rounded-full ${
                  activePulse === index
                    ? "bg-primary/10 scale-110"
                    : "bg-gray-100"
                } transition-all duration-500`}>
                {index === 0 ? (
                  <Home
                    className={`h-6 w-6 ${
                      activePulse === index ? "text-primary" : "text-gray-400"
                    }`}
                  />
                ) : index === 1 ? (
                  <Key
                    className={`h-6 w-6 ${
                      activePulse === index ? "text-primary" : "text-gray-400"
                    }`}
                  />
                ) : (
                  <DollarSign
                    className={`h-6 w-6 ${
                      activePulse === index ? "text-primary" : "text-gray-400"
                    }`}
                  />
                )}
              </div>

              {/* Label */}
              <span
                className={`text-xs mt-2 ${
                  activePulse === index
                    ? "text-primary font-medium"
                    : "text-gray-500"
                }`}>
                {index === 0
                  ? "Properties"
                  : index === 1
                  ? "Leases"
                  : "Payments"}
              </span>
            </div>
          ))}
        </div>

        {/* Optional loading text */}
        <p className="text-gray-500 animate-pulse">Loading your dashboard...</p>
      </div>
    </div>
  );
}
