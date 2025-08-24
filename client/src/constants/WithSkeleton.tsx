import React from "react";

type WithSkeletonProps = {
  isLoading: boolean;
  skeleton: React.ReactNode;
  children: React.ReactNode;
};

const WithSkeleton = ({ isLoading, skeleton, children }: WithSkeletonProps) => {
  return <>{isLoading ? skeleton : children}</>;
};

export default WithSkeleton;
