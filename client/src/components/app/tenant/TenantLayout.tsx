import TenantSidebar from "@/components/app/tenant/TenantSidebar";
import { Outlet } from "react-router-dom";
import LayoutHeader from "../LayoutHeader";

export function TenantLayout() {
  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar Navigation */}
      <TenantSidebar />

      {/* Main Content */}
      <div className="max-h-screen bg-gray-50 flex overflow-hidden">
        {/* Top Header */}
        <LayoutHeader />

        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
