import { Button } from "@/components/ui/button";
import { Menu, Bell, User, ChevronDown } from "lucide-react";
import LandlordSidebar from "@/components/app/landlord/LandlordSidebar";
import { Outlet } from "react-router-dom";
import LayoutHeader from "../LayoutHeader";

export default function LandlordLayout() {
  return (
    <div className="max-h-screen bg-white flex overflow-hidden">
      {/* Sidebar Navigation */}
      <LandlordSidebar />

      {/* Main Content */}
      <div className="min-h-screen flex-1 flex flex-col">
        {/* Top Header */}
        <LayoutHeader />

        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
