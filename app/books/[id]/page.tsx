"use client";

import { notFound } from "next/navigation";
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
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookDetail } from "@/components/ui";
import { getBookById } from "@/lib/data";
import { getStatusBadge } from "@/lib/components";

export default function BookPage() {
  const params = useParams();
  const book = getBookById(params.id as string);

  if (!book) {
    notFound();
  }

  return (
    <div className="p-6 w-[50%] mx-auto space-y-6">
      <Link
        href="/"
        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Books List
      </Link>
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
                  data={new Date(book.publishedDate).getFullYear()} 
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
