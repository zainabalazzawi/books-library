"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookStatus } from "@/types";
import { mockBooks } from "@/lib/data";

const BooksDashboard = () => {


  const getStatusBadge = (status: BookStatus) => {
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
        <h1 className="text-3xl font-bold">Books Library</h1>

      {/* Books Table */}
      <Card>
        <CardHeader>
          <CardTitle>Books ({mockBooks.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead>Pages</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockBooks.map((book) => (
                <TableRow key={book.id}>
                  <TableCell className="font-medium">
                    <Link 
                      href={`/books/${book.id}`} 
                      className="flex items-center gap-2 hover:text-green-800 transition-colors duration-300"
                    >
                      {book.title}
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.genre}</TableCell>
                  <TableCell>{book.pages}</TableCell>
                  <TableCell>
                    {new Date(book.publishedDate).getFullYear()}
                  </TableCell>
                  <TableCell>{getStatusBadge(book.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default BooksDashboard;
