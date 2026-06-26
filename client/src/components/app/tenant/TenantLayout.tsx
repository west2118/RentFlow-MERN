import TenantSidebar from "@/components/app/tenant/TenantSidebar";
import { Outlet } from "react-router-dom";
import LayoutHeader from "../LayoutHeader";
import { useUserStore } from "@/store/useUserStore";
import { Navigate } from "react-router-dom";

export function TenantLayout() {
  const { user } = useUserStore();

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (!user.verification || Object.keys(user.verification).length === 0) {
    return <Navigate to="/onboarding/tenant" replace />;
  }

  return (
    <div className="max-h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar Navigation */}
      <TenantSidebar />

      {/* Main Content */}
      <div className="min-h-screen bg-gray-50 flex flex-1 flex-col">
        {/* Top Header */}
        <LayoutHeader />

        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
