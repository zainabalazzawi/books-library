"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ExternalLink, MoreHorizontal, Plus, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useBooks, useDeleteBook } from "@/lib/hooks/useBooks";
import { getStatusBadge } from "@/lib/components";

const BooksDashboard = () => {
  const { data: books = [], isLoading, error } = useBooks();
  const deleteBookMutation = useDeleteBook();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [targetId, setTargetId] = useState<string | null>(null);

  const openConfirm = (id: string) => {
    setTargetId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!targetId) return;
    try {
      await deleteBookMutation.mutateAsync(targetId);
    } finally {
      setConfirmOpen(false);
      setTargetId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading books...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">Error: {error.message}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Books Library</h1>
        <Link href="/books/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Book
          </Button>
        </Link>
      </div>

      {/* Books Table */}
      <Card>
        <CardHeader>
          <CardTitle>Books ({books.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {books.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No books found. Add your first book!</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Genre</TableHead>
                  <TableHead>Pages</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>More</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {books.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell className="font-medium">
                      <Link href={`/books/${book.id}`} className="flex items-center gap-2 hover:text-green-800 transition-colors duration-300">
                        {book.title}
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.genre}</TableCell>
                    <TableCell>{book.pages}</TableCell>
                    <TableCell>{book.publishedDate}</TableCell>
                    <TableCell>{getStatusBadge(book.status || "available")}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/books/${book.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Book
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => openConfirm(book.id)}
                            disabled={deleteBookMutation.isPending}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            {deleteBookMutation.isPending ? "Deleting..." : "Delete Book"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Confirm Delete Dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Book</DialogTitle>
            <DialogDescription>
              This action cannot be undone. Are you sure you want to delete this book?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)} disabled={deleteBookMutation.isPending}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={deleteBookMutation.isPending}>
              {deleteBookMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BooksDashboard;
