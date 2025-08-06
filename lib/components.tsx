import { BookStatus } from "@/types";

export const getStatusBadge = (status: BookStatus) => {
  return (
    <span
      className={`
        px-3 
        py-1 
        rounded-full 
        text-xs 
        font-medium
        ${
          status === "available"
            ? "bg-green-100 text-green-800"
            : status === "borrowed"
            ? "bg-yellow-100 text-yellow-800"
            : status === "reserved"
            ? "bg-blue-100 text-blue-800"
            : "bg-gray-100 text-gray-800"
        }
      `}
    >
      {status}
    </span>
  );
}; 