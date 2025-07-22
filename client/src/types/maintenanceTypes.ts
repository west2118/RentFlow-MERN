export type MaintenanceType = {
  _id: string;
  issueType: string;
  requestName: string;
  urgencyLevel: string;
  description: string;
  photo: string;
  unitId: string;
  tenantUid: string;
  landlordUid: string;
  status?: string;
  techNotes?: string;
  tenantName: string;
  unitNumber: string;
  createdAt: string;
  updatedAt: string;
};
