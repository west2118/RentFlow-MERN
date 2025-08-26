import React from "react";

const ExpiredLeaseContent = () => {
  return (
    <div className="flex-1">
      <div className="text-xl font-bold text-muted-foreground">
        Lease Expired
      </div>
      <p className="text-sm text-muted-foreground">
        Your lease has ended. Please contact your landlord to renew or sign a
        new lease.
      </p>
    </div>
  );
};

export default ExpiredLeaseContent;
