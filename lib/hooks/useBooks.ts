import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Book } from '@/types';

// Use environment variable for Go backend URL, fallback to localhost for development
const API_BASE_URL = process.env.NEXT_PUBLIC_GO_BACKEND_URL || 'http://localhost:8080/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
});

// API functions using axios
const fetchBooks = async (): Promise<Book[]> => {
  const response = await api.get('/books');
  return response.data;
};

const fetchBook = async (id: string): Promise<Book> => {
  const response = await api.get(`/books/${id}`);
  return response.data;
};

const createBook = async (bookData: Omit<Book, 'id'>): Promise<Book> => {
  const response = await api.post('/books', bookData);
  return response.data;
};

const updateBook = async ({ id, ...bookData }: Partial<Book> & { id: string }): Promise<Book> => {
  const response = await api.put(`/books/${id}`, bookData);
  return response.data;
};

const deleteBook = async (id: string): Promise<void> => {
  await api.delete(`/books/${id}`);
};

// Custom hooks
export const useBooks = () => {
  return useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
  });
};

export const useBook = (id: string) => {
  return useQuery({
    queryKey: ['books', id],
    queryFn: () => fetchBook(id),
    enabled: !!id,
  });
};

export const useCreateBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });
};

export const useUpdateBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateBook,
    onSuccess: (updatedBook) => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      queryClient.invalidateQueries({ queryKey: ['books', updatedBook.id] });
    },
  });
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });
}; 