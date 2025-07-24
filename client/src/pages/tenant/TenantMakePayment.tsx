import { Loading } from "@/components/app/Loading";
import TenantMakePaymentFormCard from "@/components/app/tenant/make-payment/TenantMakePaymentFormCard";
import TenantMakePaymentSummaryCard from "@/components/app/tenant/make-payment/TenantMakePaymentSummaryCard";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/useUserStore";
import type { PaymentType } from "@/types/paymentTypes";
import axios from "axios";
import {
  Upload,
  Banknote,
  Phone,
  User,
  Home,
  DollarSign,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export function TenantMakePayment() {
  const navigate = useNavigate();
  const token = useUserStore((state) => state.userToken);

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Banknote className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">Submit Payment Proof</h1>
            <p className="text-muted-foreground">
              Upload your payment receipt and details
            </p>
          </div>
        </div>
        <div>
          <Button onClick={() => navigate(-1)}>
            <ArrowRight />
          </Button>
        </div>
      </div>

      {/* Payment Summary Section */}
      <TenantMakePaymentSummaryCard token={token} />

      {/* Payment Upload Form */}
      <TenantMakePaymentFormCard token={token} />

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h3 className="font-medium flex items-center gap-2 text-blue-700">
          <Phone className="h-4 w-4" />
          Payment Reminder
        </h3>
        <p className="mt-2 text-sm text-blue-700">
          Make sure to notify your landlord after submitting this form and
          sending the payment.
        </p>
      </div>
    </div>
  );
}
