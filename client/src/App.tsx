import SignIn from "./pages/SignIn";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Homepage from "./pages/Homepage";
import LandlordDashboardContent from "./pages/landlord/LandlordDashboardContent";
import LandlordLayout from "./components/app/landlord/LandlordLayout";
import { LandlordUnits } from "./pages/landlord/LandlordUnits";
import { LandlordTenant } from "./pages/landlord/LandlordTenant";
import { LandlordMaintenance } from "./pages/landlord/LandlordMaintenance";
import { LandlordPayments } from "./pages/landlord/LandlordPayments";
import { LandlordDocuments } from "./pages/landlord/LandlordDocuments";
import { LandlordSettings } from "./pages/landlord/LandlordSettings";
import { TenantLayout } from "./components/app/tenant/TenantLayout";
import TenantDashbordContent from "./pages/tenant/TenantDashbordContent";
import TenantUnit from "./pages/tenant/TenantUnit";
import TenantMaintenanceRequest from "./pages/tenant/TenantMaintenanceRequest";
import TenantPayment from "./pages/tenant/TenantPayment";
import TenantDocuments from "./pages/tenant/TenantDocuments";
import TenantSettings from "./pages/tenant/TenantSettings";
import HomeLayout from "./components/app/HomeLayout";
import SignUp from "./pages/SignUp";
import OnboardingPage from "./pages/Onboarding";
import { useSyncInfo } from "./hooks/useSyncInfo";
import { LandlordCreateUnit } from "./pages/landlord/LandlordCreateUnit";
import { LandlordCreateLease } from "./pages/landlord/LandlordCreateLease";
import TenantCreateMaintenanceRequest from "./pages/tenant/TenantCreateMaintenanceRequest";
import { TenantMakePayment } from "./pages/tenant/TenantMakePayment";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<Homepage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      <Route path="onboarding" element={<OnboardingPage />} />

      <Route path="/landlord" element={<LandlordLayout />}>
        <Route index element={<LandlordDashboardContent />} />
        <Route path="units" element={<LandlordUnits />} />
        <Route
          path="unit/create"
          element={<LandlordCreateUnit isEdit={false} />}
        />
        <Route
          path="unit/edit-unit/:id"
          element={<LandlordCreateUnit isEdit={true} />}
        />
        <Route path="tenants" element={<LandlordTenant />} />
        <Route path="maintenance" element={<LandlordMaintenance />} />
        <Route path="payments" element={<LandlordPayments />} />
        <Route path="documents" element={<LandlordDocuments />} />
        <Route path="settings" element={<LandlordSettings />} />
        <Route path="lease/create/:id" element={<LandlordCreateLease />} />
      </Route>

      <Route path="/tenant" element={<TenantLayout />}>
        <Route index element={<TenantDashbordContent />} />
        <Route path="unit" element={<TenantUnit />} />
        <Route path="maintenance" element={<TenantMaintenanceRequest />} />
        <Route path="payments" element={<TenantPayment />} />
        <Route path="documents" element={<TenantDocuments />} />
        <Route path="settings" element={<TenantSettings />} />
        <Route path="make-payment/:id" element={<TenantMakePayment />} />
        <Route
          path="maintenance-request/create"
          element={<TenantCreateMaintenanceRequest />}
        />
      </Route>
    </>
  )
);

function App() {
  useSyncInfo();

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
