"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  User,
  Calendar,
  Hash,
  FileText,
  Globe,
  TrendingUp,
  Edit,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookDetail } from "@/components/ui";
import { useBook } from "@/lib/hooks/useBooks";
import { getStatusBadge } from "@/lib/components";
import { LoadingState } from "@/components/LoadingState";

export default function BookPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: book, isLoading, error } = useBook(id);

   if (isLoading) {
      return (
        <LoadingState 
          text='Loading book page'
          iconSize={64}
          className="animate-spin text-[#649C9E]"
        />
      ) }

  if (error || !book) {
    return (
      <div className="p-6 w-[50%] mx-auto">
        <Link href="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Books List
        </Link>
        <div className="mt-6 text-red-600">Book not found.</div>
      </div>
    );
  }

  return (
    <div className="p-6 w-[50%] mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Books List
        </Link>
        <Link href={`/books/${book.id}/edit`}>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Book
          </Button>
        </Link>
      </div>
      
      <h1 className="text-4xl font-bold">{book.title}</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Book details
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-2">
          <BookDetail 
            label="Author" 
            data={book.author} 
            icon={User} 
          />
          <BookDetail 
            label="Genre" 
            data={book.genre} 
            icon={Hash} 
          />
          <BookDetail 
            label="Pages" 
            data={book.pages} 
            icon={FileText} 
          />
          <BookDetail 
            label="Language" 
            data={book.language} 
            icon={Globe} 
          />
          <BookDetail 
            label="Published" 
            data={book.publishedDate} 
            icon={Calendar} 
          />
          <BookDetail 
            label="Status" 
            data={getStatusBadge(book.status)} 
            icon={TrendingUp} 
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed text-lg">
            {book.description}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
