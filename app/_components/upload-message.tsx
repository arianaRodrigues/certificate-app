import React from "react";

type UploadMessageProps = {
  type?: "default" | "error" | "success";
  children: React.ReactNode;
};

export const UploadMessage: React.FC<UploadMessageProps> = ({
  type = "default",
  children,
}) => {
  const messageColors = {
    default: "text-primary",
    error: "text-red-500",
    success: "text-green-500",
  };

  return (
    <p
      className={`flex items-center justify-center p-1 text-center font-bold ${messageColors[type]}`}
    >
      {children}
    </p>
  );
};
