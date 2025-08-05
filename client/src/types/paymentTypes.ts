export type PaymentType = {
  _id: string;
  leaseId: string;
  unitId: string;
  landlordUid: string;
  amount: number;
  dueDate: Date;
  status: string;
  tenantUid?: string;
  datePaid?: string;
  method?: string;
  unitNumber?: string;
  tenantName?: string;
  lateFee?: number;
  totalAmount?: number;
  receipt?: {
    _id: string;
    method: string;
  };
};
