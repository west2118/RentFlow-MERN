import { Button } from "@/components/ui/button";
import { Menu, Bell, User, ChevronDown } from "lucide-react";
import LandlordSidebar from "@/components/app/landlord/LandlordSidebar";
import { useUserStore } from "@/store/useUserStore";
import { Navigate, Outlet } from "react-router-dom";
import LayoutHeader from "../LayoutHeader";

export default function LandlordLayout() {
  const { user } = useUserStore();

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (!user.verification || Object.keys(user.verification).length === 0) {
    return <Navigate to="/onboarding/landlord" replace />;
  }

  return (
    <div className="max-h-screen bg-white flex overflow-hidden">
      {/* Sidebar Navigation */}
      <LandlordSidebar />

      {/* Main Content */}
      <div className="min-h-screen bg-white flex-1 flex flex-col">
        {/* Top Header */}
        <LayoutHeader />

        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
