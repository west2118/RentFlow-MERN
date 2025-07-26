import React from "react";

const DataLoading = () => {
  return (
    <div className="flex items-center justify-center h-40">
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 rounded-full animate-bounce bg-primary" />
        <div className="w-4 h-4 rounded-full animate-bounce bg-primary [animation-delay:.2s]" />
        <div className="w-4 h-4 rounded-full animate-bounce bg-primary [animation-delay:.4s]" />
      </div>
    </div>
  );
};

export default DataLoading;
