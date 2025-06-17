import { ReactNode } from "react";
import { cn } from "../_lib/utils";

export const SubHeaderTitle = ({ children }: { children: ReactNode }) => {
  return <h1 className="text-xl font-semibold">{children}</h1>;
};

export const SubHeaderSubtitle = ({ children }: { children: ReactNode }) => {
  return <h2 className="text-base font-semibold text-[#8E8E8E]">{children}</h2>;
};

export const SubHeaderArticle = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <p className={`text-base font-semibold ${className}`}>{children}</p>;
};

export const SubHeaderLeft = ({ children }: { children: ReactNode }) => {
  return <div className="space-y-2">{children}</div>;
};

export const SubHeaderRight = ({ children }: { children: ReactNode }) => {
  return <div className="mt-auto space-y-2">{children}</div>;
};

const SubHeader = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      {children}
    </div>
  );
};

export default SubHeader;
