export type MaintenanceType = {
  _id: string;
  issueType: string;
  requestName: string;
  urgencyLevel: string;
  description: string;
  photo: string;
  unitId: string;
  tenantId: string;
  landlordId: string;
  status?: string;
  techNotes?: string;
  tenantName: string;
  unitNumber: string;
  createdAt: string;
  updatedAt: string;
};
