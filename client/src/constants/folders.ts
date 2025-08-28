import { DollarSign, FileText, Folder, User, Wrench } from "lucide-react";

export const folderTypes = [
  {
    value: "lease",
    label: "Lease Documents",
    icon: FileText,
  },
  {
    value: "payment",
    label: "Payment Receipts",
    icon: DollarSign,
  },
  {
    value: "maintenance",
    label: "Maintenance Records",
    icon: Wrench,
  },
  {
    value: "tenant-docs",
    label: "Tenant Documents",
    icon: User,
  },
  {
    value: "other",
    label: "Other Documents",
    icon: Folder,
  },
];
