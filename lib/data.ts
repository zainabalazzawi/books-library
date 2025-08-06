import { Book } from "@/types";

// Mock data for demonstration - later will be removed and data will come from database
export const mockBooks: Book[] = [
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

// Helper function to get a book by ID
export const getBookById = (id: string): Book | undefined => {
  return mockBooks.find((book) => book.id === id);
};

// Helper function to get all books
export const getAllBooks = (): Book[] => {
  return mockBooks;
}; 