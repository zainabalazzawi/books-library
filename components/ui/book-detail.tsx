import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface BookDetailProps {
  label: string;
  data: string | number | ReactNode;
  icon: LucideIcon;
}

export const BookDetail = ({ label, data, icon: Icon }: BookDetailProps) => {
  return (
    <div className="flex flex-col m-2">
      <div className="flex flex-row gap-2 items-center text-muted-foreground">
        <Icon className="h-4 w-4" />
        <p>{label}</p>
      </div>
      <div>{data}</div>
    </div>
  );
};
