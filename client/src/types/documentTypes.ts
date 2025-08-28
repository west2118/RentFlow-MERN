export type DocumentType = {
  _id: string;
  landlordUid: string;
  tenantUid: string;
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
