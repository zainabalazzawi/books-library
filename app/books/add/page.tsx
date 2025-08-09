"use client";

import { useRouter } from "next/navigation";
import BookForm from "@/components/forms/book-form";
import { useCreateBook } from "@/lib/hooks/useBooks";
import { toast } from "react-toastify";

export default function AddBookPage() {
  const router = useRouter();
  const createBookMutation = useCreateBook();

  const handleSubmit = async (data: any) => {
    try {
      await createBookMutation.mutateAsync(data);
      toast.success("Book created successfully");
      router.push("/");
    } catch (error: any) {
      toast.error(error?.message || "Failed to create book. Please try again.");
    }
  };

  return <BookForm mode="add" onSubmit={handleSubmit} />;
}
