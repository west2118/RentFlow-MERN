export type DocumentType = {
  _id: string;
  landlordId: string;
  tenantId: string;
  tenantFullName: string;
  category: string;
  unitNumber: string;
  documents: [
    {
      name: string;
      file: string;
      size: string;
    }
  ];
  createdAt: Date;
  updatedAt: Date;
};
