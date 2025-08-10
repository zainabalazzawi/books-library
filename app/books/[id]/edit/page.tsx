"use client";
import { useParams, useRouter } from "next/navigation";
import { useBook, useUpdateBook } from "@/lib/hooks/useBooks";
import BookForm from "@/components/forms/book-form";
import { Book } from "@/types";
import { toast } from "react-toastify";
import { LoadingState } from "@/components/LoadingState";

export default function EditBookPage() {
  const params = useParams();
  const router = useRouter();
  const bookId = params.id as string;
  
  const { data: book, isLoading, error } = useBook(bookId);
  const updateBookMutation = useUpdateBook();

  const handleSubmit = async (data: Omit<Book, 'id'>) => {
    try {
      await updateBookMutation.mutateAsync({ id: bookId, ...data });
      toast.success("Book updated successfully!");
      router.push(`/books/${bookId}`);
    } catch (error) {
      toast.error("Failed to update book");
      console.error("Error updating book:", error);
    }
  };

  if (isLoading) {
    return <LoadingState text="Loading book..." />;
  }

  if (error || !book) {
    return <div className="flex justify-center items-center min-h-screen">Book not found</div>;
  }

  return <BookForm mode="edit" book={book} onSubmit={handleSubmit} />;
}
