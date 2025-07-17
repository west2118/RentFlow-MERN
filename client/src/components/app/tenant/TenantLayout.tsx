import { Button } from "@/components/ui/button";
import { Bell, Menu, User, ChevronDown } from "lucide-react";
import TenantSidebar from "@/components/app/tenant/TenantSidebar";
import { Outlet } from "react-router-dom";

export function TenantLayout() {
  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar Navigation */}
      <TenantSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
              <h2 className="text-lg font-semibold">Dashboard Overview</h2>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
