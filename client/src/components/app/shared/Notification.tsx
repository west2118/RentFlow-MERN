import { useState } from "react";

export default function NotificationsUI() {
  const [open, setOpen] = useState(false);

  // Example notifications (monthly dues, confirmation, late fees)
  const notifications = [
    {
      id: 1,
      message:
        "Reminder: Your rent of ₱10,000 for August is due on August 30, 2025.",
      createdAt: "2025-08-24",
      read: false,
    },
    {
      id: 2,
      message: "Payment received: ₱10,000 for July rent. Thank you!",
      createdAt: "2025-07-30",
      read: true,
    },
    {
      id: 3,
      message:
        "Alert: Your rent is overdue by 5 days. A late fee of ₱500 has been added.",
      createdAt: "2025-06-10",
      read: false,
    },
  ];

  return (
    <div className="relative">
      {/* Bell button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-gray-100">
        🔔
        {notifications.some((n) => !n.read) && (
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-96 bg-white border rounded-lg shadow-xl z-50">
          <div className="p-3 border-b font-semibold">Notifications</div>
          <ul className="max-h-72 overflow-y-auto">
            {notifications.map((n) => (
              <li
                key={n.id}
                className={`p-3 border-b text-sm ${
                  !n.read ? "bg-gray-50 font-medium" : "bg-white"
                }`}>
                {n.message}
                <div className="text-xs text-gray-400">
                  {new Date(n.createdAt).toLocaleDateString()}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
