export type BookStatus = "available" | "borrowed" | "reserved";

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  publishedDate: string;
  genre: string;
  pages: number;
  language: string;
  status: BookStatus;
}

