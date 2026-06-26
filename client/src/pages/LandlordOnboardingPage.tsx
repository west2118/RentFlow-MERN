import LandlordSetup from "@/components/app/LandlordSetup";
import { useUserStore } from "@/store/useUserStore";
import { Navigate } from "react-router-dom";

export default function LandlordOnboardingPage() {
  const { user } = useUserStore();

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (user.verification && Object.keys(user.verification).length > 0) {
    return <Navigate to="/landlord" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow flex items-center justify-center container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to RentFlow
            </h2>
            <p className="text-gray-600">
              Let's get you set up as a Landlord.
            </p>
          </div>
          <LandlordSetup />
        </div>
      </main>
    </div>
  );
}
