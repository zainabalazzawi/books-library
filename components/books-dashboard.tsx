"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Book, BookStatus } from "@/types";

// Mock data for demonstration later will be removed and the date will come from the database
const mockBooks: Book[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description:
      "A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
    publishedDate: "1925-04-10",
    genre: "Fiction",
    pages: 180,
    language: "English",
    status: "available",
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description:
      "The story of young Scout Finch and her father Atticus in a racially divided Alabama town.",
    publishedDate: "1960-07-11",
    genre: "Fiction",
    pages: 281,
    language: "English",
    status: "borrowed",
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    description:
      "A dystopian novel about totalitarianism and surveillance society.",
    publishedDate: "1949-06-08",
    genre: "Science Fiction",
    pages: 328,
    language: "English",
    status: "available",
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description:
      "A romantic novel of manners that follows the emotional development of Elizabeth Bennet.",
    publishedDate: "1813-01-28",
    genre: "Romance",
    pages: 432,
    language: "English",
    status: "reserved",
  },
  {
    id: "5",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    description:
      "A fantasy novel about a hobbit's journey to reclaim a dwarf kingdom.",
    publishedDate: "1937-09-21",
    genre: "Fantasy",
    pages: 366,
    language: "English",
    status: "available",
  },
];

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
                  <TableCell className="font-medium">{book.title}</TableCell>
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
