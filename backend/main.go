package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"books-library-backend/db"
)

func main() {
	// Initialize Prisma client
	client := db.NewClient()
	if err := client.Prisma.Connect(); err != nil {
		log.Fatal(err)
	}
	defer client.Prisma.Disconnect()

	// Create context
	ctx := context.Background()

	r := chi.NewRouter()

	// CORS for Next.js dev on 3000
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000", "http://127.0.0.1:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: false,
		MaxAge:           300,
	}))

	// Define routes
	r.Options("/*", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})

	r.Get("/api/books", func(w http.ResponseWriter, r *http.Request) {
		getBooks(w, r, client, ctx)
	})
	r.Post("/api/books", func(w http.ResponseWriter, r *http.Request) {
		createBook(w, r, client, ctx)
	})
	r.Get("/api/books/{id}", func(w http.ResponseWriter, r *http.Request) {
		getBookByID(w, r, client, ctx)
	})
	// r.Put("/api/books/{id}", func(w http.ResponseWriter, r *http.Request) {
	// 	updateBook(w, r, client, ctx)
	// })
	// r.Delete("/api/books/{id}", func(w http.ResponseWriter, r *http.Request) {
	// 	deleteBook(w, r, client, ctx)
	// })

	// Start server
	log.Println("Server starting on :8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}

func getBooks(w http.ResponseWriter, r *http.Request, client *db.PrismaClient, ctx context.Context) {
	books, err := client.Book.FindMany().Exec(ctx)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(books)
}

func getBookByID(w http.ResponseWriter, r *http.Request, client *db.PrismaClient, ctx context.Context) {
	id := chi.URLParam(r, "id")
	if id == "" {
		http.Error(w, "Book ID is required", http.StatusBadRequest)
		return
	}

	book, err := client.Book.FindUnique(
		db.Book.ID.Equals(id),
	).Exec(ctx)

	if err != nil {
		http.Error(w, "Book not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(book)
}

func createBook(w http.ResponseWriter, r *http.Request, client *db.PrismaClient, ctx context.Context) {
	var bookData struct {
		Title         string `json:"title"`
		Author        string `json:"author"`
		Description   string `json:"description"`
		PublishedDate string `json:"publishedDate,omitempty"`
		Genre         string `json:"genre,omitempty"`
		Pages         int    `json:"pages,omitempty"`
		Language      string `json:"language,omitempty"`
		Status        string `json:"status,omitempty"`
	}

	if err := json.NewDecoder(r.Body).Decode(&bookData); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Validate required fields
	if bookData.Title == "" || bookData.Author == "" || bookData.Description == "" ||
		bookData.PublishedDate == "" || bookData.Genre == "" || bookData.Pages <= 0 ||
		bookData.Language == "" || bookData.Status == "" {
		http.Error(w, "all fields are required: title, author, description, publishedDate, genre, pages (>0), language, status", http.StatusBadRequest)
		return
	}

	// Create book in database with ALL fields that were sent
	book, err := client.Book.CreateOne(
		db.Book.Title.Set(bookData.Title),
		db.Book.Author.Set(bookData.Author),
		db.Book.Description.Set(bookData.Description),
		db.Book.PublishedDate.Set(bookData.PublishedDate),
		db.Book.Genre.Set(bookData.Genre),
		db.Book.Pages.Set(bookData.Pages),
		db.Book.Language.Set(bookData.Language),
		db.Book.Status.Set(bookData.Status),
	).Exec(ctx)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(book)
}

// func deleteBook(w http.ResponseWriter, r *http.Request, client *db.PrismaClient, ctx context.Context) {
// 	id := chi.URLParam(r, "id")
// 	if id == "" {
// 		http.Error(w, "Book ID is required", http.StatusBadRequest)
// 		return
// 	}

// 	_, err := client.Book.FindUnique(
// 		db.Book.ID.Equals(id),
// 	).Delete().Exec(ctx)
// 	if err != nil {
// 		http.Error(w, "Book not found", http.StatusNotFound)
// 		return
// 	}

// 	w.WriteHeader(http.StatusNoContent)
// }

