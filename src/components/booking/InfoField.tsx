import { ReactNode } from "react";

interface Props {
  label: string;
  children: ReactNode;
  className?: string;
}

const InfoField = ({ label, children, className }: Props) => {
  return (
    <div className={className}>
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className="text-sm font-medium break-words">
        {children ?? <span className="text-muted-foreground">n.a.</span>}
      </div>
    </div>
  );
};

export default InfoField;
