export type Verification = {
  idFront: string;
  idBack: string;
  proofOfAddres?: string;
};

export type UserRole = "landlord" | "tenant";

export type UserType = {
  _id: string;
  uid: string;
  __v: number;
  createdAt: string; // or Date
  updatedAt: string; // or Date
  email: string;
  firstName: string;
  lastName: string;
  notifications: boolean;
  role: UserRole;
  verification: Verification;
  accountType?: string; // landlord only
  numberOfProperties?: number; // landlord only
  emergencyContact?: string; // tenant only
  moveInDate?: string; // tenant only
};
