import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/constants/formatDate";
import { statusPaymentStyle } from "@/constants/statusPaymentStyle";
import useFetchData from "@/hooks/useFetchData";
import { useUserStore } from "@/store/useUserStore";
import type { PaymentType } from "@/types/paymentTypes";
import type { ReceiptType } from "@/types/receiptTypes";
import axios from "axios";
import {
  Download,
  X,
  CheckCircle2,
  Clock,
  AlertCircle,
  Banknote,
  Calendar,
  FileText,
  ImageIcon,
  Check,
  Loader,
} from "lucide-react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import { LazyImage } from "./LazyImage";
import DataLoading from "./DataLoading";

type ReceiptModalProps = {
  isModalOpen: true;
  isCloseModal: () => void;
  payment: PaymentType;
};

export function ReceiptModal({
  isModalOpen,
  isCloseModal,
  payment,
}: ReceiptModalProps) {
  const userUid = useUserStore((state) => state.user?.uid);
  const token = useUserStore((state) => state.userToken);

  const [data, setData] = useState<ReceiptType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isButtonsLoading, setIsButtonsLoading] = useState(false);

  useEffect(() => {
    if (!payment?._id || !token) return;

    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          `http://localhost:8080/api/receipt/${payment._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Data: ", response.data);

        setData(response.data);
      } catch (error: any) {
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [payment?._id, token]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isModalOpen]);

  const handleAcceptReceipt = async (status: string) => {
    setIsButtonsLoading(true);

    try {
      let response;

      if (status === "Accepted") {
        response = await axios.put(
          `http://localhost:8080/api/accept-receipt/${data?._id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        response = await axios.put(
          `http://localhost:8080/api/reject-receipt/${data?._id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      toast.success(response?.data?.message);
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsButtonsLoading(false);
    }
  };

  console.log(data?.status);

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      onClick={isCloseModal}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        {/* Modal Header */}
        <div className="flex items-center rounded-lg justify-between p-4 border-b sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold">Payment Receipt</h2>
          </div>
          <button
            onClick={isCloseModal}
            className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content */}
        {loading ? (
          <DataLoading />
        ) : !data ? (
          <Card className="flex items-center justify-center h-40">
            <div className="text-center space-y-1">
              <FileText className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No receipt found yet.
              </p>
            </div>
          </Card>
        ) : (
          <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto hide-scrollbar">
            {/* Payment Status Badge */}
            <div className="flex justify-between items-center">
              {statusPaymentStyle(payment?.status)}

              <span className="text-sm text-muted-foreground">
                Transaction ID: #{data?._id}
              </span>
            </div>

            {/* Payment Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Banknote className="h-5 w-5" />
                  Payment Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Amount Due</p>
                    <p className="font-medium">${payment?.amount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Due Date</p>
                    <p className="font-medium">
                      {formatDate(payment?.dueDate.toString())}
                    </p>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Amount Paid</p>
                  <p className="text-2xl font-bold">
                    ${data?.amountPaid.toFixed(2)}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Payment Date
                    </p>
                    <p className="font-medium">
                      {formatDate(data?.transactionDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Payment Method
                    </p>
                    <p className="font-medium">{data?.method}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Account Number
                  </p>
                  <p className="font-medium">XXXX-XXXX-7890</p>
                </div>
              </CardContent>
            </Card>

            {/* Receipt Preview */}
            {/* <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Receipt Document
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50 h-64">
                <div className="bg-white p-6 rounded shadow-sm border w-full h-full flex flex-col items-center justify-center">
                  <FileText className="h-12 w-12 text-primary mb-4" />
                  <p className="font-medium">payment_receipt_052024.pdf</p>
                  <p className="text-sm text-muted-foreground">2.4 MB</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Receipt
              </Button>
            </CardFooter>
          </Card> */}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  Receipt Photo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <LazyImage src={data?.fileUrl} alt="Payment receipt" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardFooter>
            </Card>

            {/* Additional Notes */}
            {data?.notes && (
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Additional Notes
                </h3>
                <div className="p-4 border rounded-lg bg-muted/50">
                  <p className="text-sm">{data?.notes}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Modal Footer */}
        <div className="p-4 border-t flex justify-between gap-2">
          <Button
            disabled={isButtonsLoading}
            onClick={isCloseModal}
            variant="outline">
            Close
          </Button>
          {data?.status === "Pending" && data?.landlordUid === userUid ? (
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => handleAcceptReceipt("Rejected")}
                disabled={isButtonsLoading}
                variant="destructive">
                <X className="h-4 w-4 mr-1" />
                Reject Receipt
              </Button>
              <Button
                disabled={isButtonsLoading}
                onClick={() => handleAcceptReceipt("Accepted")}>
                <Check className="h-4 w-4 mr-1" />
                Accept Receipt
              </Button>
            </div>
          ) : data ? (
            <Button>
              <Download className="h-4 w-4 mr-1" />
              Download Receipt
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>,
    modalRoot
  );
}
