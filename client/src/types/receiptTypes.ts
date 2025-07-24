export interface ReceiptType {
  _id?: string;
  paymentId: string;
  tenantUid: string;
  landlordUid: string;
  leaseId: string;
  amountPaid: number;
  accountNumber: string;
  fileUrl: string;
  transactionDate: string;
  status?: string; // adjust based on your app logic
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
  method: string;
}
