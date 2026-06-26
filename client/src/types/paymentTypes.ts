export type PaymentType = {
  _id: string;
  leaseId: string;
  unitId: string;
  landlordId: string;
  amount: number;
  dueDate: Date;
  status: string;
  tenantId?: string;
  datePaid?: string;
  method?: string;
  unitNumber?: string;
  tenantName?: string;
  lateFee?: number;
  totalAmount?: number;
  receipt?: {
    _id: string;
    method: string;
    status?: string;
  };
};
