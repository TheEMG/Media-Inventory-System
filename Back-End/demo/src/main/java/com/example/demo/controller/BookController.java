package com.example.demo.controller;

import com.example.demo.service.BookService;
import com.example.demo.model.Book;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Rest Controller for managing book-related operations.
 * This controller handles various CRUD operations related to books
 * and provides endpoints for listing, creating and specific queries related to book inventory.
 *
 * <p>Annotations Explained:</p>
 * <ul>
 *     <li><code>@RestController</code>: Indicates that this class is is a Spring MVC controller
 *          with its methods returning domain objects rather than views.It's a convenience annotation
 *          that combines <code>@Controller</code> and <code>@ResponseBody</code>.</li>
 *     <li><code>@CrossOrigin</code>: Enables cross-origin resource sharing (CORS) on the server
 *         This is useful for allowing requests from different domains typically needed
 *         in modern web applications.</li>
 *     <li><code>@RequestMapping("/api/books")</code>: Specifies that all request mappings in
 *         this controller will be prefixed with "/api/books".This helps in organizing
 *         the URL structure and versioning of the API></li>
 * </ul>
 *
 */
@RestController
@CrossOrigin
@RequestMapping("/api/books")
public class BookController {
    /**
     * Servive for handling book-related business logic.
     */
    private final BookService bookService;
    /**
     * RestTemplate for making HTTP requests (calling external API).
     */
    private final RestTemplate restTemplate;
    /**
     * Logger for this class,used for logging information and errors.
     */
    private static final Logger logger = LoggerFactory.getLogger(BookController.class);

    /**
     * API key for Google Book API, injected from applications properties.
     */
    @Value("${google.books.api.key}")
    private String googleBooksApiKey;

    /**
     * Constructs a new BookController with the specified BookService and RestTemplate.
     * @param bookService the service for handling book operations.
     * @param restTemplate the template for making HTTP requests.
     */
    @Autowired
    public BookController(BookService bookService, RestTemplate restTemplate){
        this.bookService = bookService;
        this.restTemplate = restTemplate;
    }

    /**
     * Retrieves a book by its unique identifier.
     *
     * @param id the ID of the book to retrieve.
     * @return the Book object is found, or null if not found.
     */
    @GetMapping("/{id}")
    public Book getBookById(@PathVariable String id){
        return bookService.getBookById(id);
    }

    /**
     * Fetches a paginated list of books
     *
     * @param page the number of the books list to retrieve.
     * @param limit limit the maximum number of books to return in a single page.
     * @return a page of Book objects.
     */
    @GetMapping("/all-books")
    public Page<Book> getBooks(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "limit", defaultValue = "20") int limit
    ) {
        return bookService.getBooks(page, limit);
    }

    /**
     * Searches for books by their ISBN.
     * This method queries the database for books matching the provided ISBN
     * and returns a list of matching books.
     *
     * @param isbn the International Standard Book Number (ISBN) of the books to search for.
     * @return A ResponseEntity containing a list of books if found or a 404 Not Found.
     */
    @GetMapping("/search")
    public ResponseEntity<List<Book>> searchByIsbn(@RequestParam String isbn) {
        List<Book> books = bookService.searchByIsbn(isbn);
        if (books.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(books);
    }

    /**
     * Retrieves the books sold in a specified month and year.
     * Logs the request details and validates the month value.
     * Returns a list of books sold in the given month and year.
     *
     * @param year The year to filter the sold books.
     * @param month The month to filter the sold books. Must be between 1 and 12.
     * @return A ResponseEntity containing a list of sold books or appropriate HTTP status based on the result.
     */
    @GetMapping("/sold-in-month")
    public ResponseEntity<Object> getBooksSoldInMonth(
            @RequestParam("year") int year,
            @RequestParam("month") int month) {
        logger.info("getBooksSoldInMonth called with year: {}, month: {}", year, month);

        // Validate the month
        if (month < 1 || month > 12) {
            return ResponseEntity.badRequest().body("Month must be between 1 and 12");
        }

        List<Book> books = bookService.getBooksSoldInMonth(year, month);
        if (books.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(books);
        }
    }

    /**
     * Creates a new book entity.
     * Recieves book data as a request body, logs the request, and creates
     * a new book record in the database.
     *
     * @param book The Book object to be created, provided in the request body.
     * @return A responseEntity with the created book and HTTP status 201 Created.
     */
    @PostMapping("/create-book")
    public ResponseEntity<Book> createBook(@RequestBody Book book) {
        logger.info("Received request to create book: {}", book);
        Book savedBook = bookService.createBook(book);
        return new ResponseEntity<>(savedBook, HttpStatus.CREATED);
    }

    /**
     * Updates the details of an existing book.
     * The book to be updated is identified by its ID and the updated details are provided in the request body.
     *
     * @param id The unique identifier of the book to be updated.
     * @param updatedBook The book object containing updated details.
     * @return A ResponseEntity containing the updated book and HTTP status 200 OK.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable String id, @RequestBody Book updatedBook) {
        Book book = bookService.updateBook(id, updatedBook);
        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    /**
     * Deletes a book identified by its ID.
     * The method calls the service to delete the book and responds with an HTTP 204 No Content status
     * upon successful deletion.
     *
     * @param id The unique identifier of the book to be deleted.
     * @return A ResponseEntity with HTTP status 204 No content.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable String id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Retrieves the active book in the inventory.
     * This endpoint provides the total number of books that are active in inventory.
     *
     * @return A ResponseEntity with teh count of active books.
     */
    @GetMapping("/active-inventory-count")
    public ResponseEntity<Long> getActiveInventoryCount() {
        long count = bookService.countActiveInventory();
        return ResponseEntity.ok(count);
    }

    /**
     * Provides a financial overview of book sales.
     * This endpoint return a map with key-value pairs representing different financial aspects
     * such as total earnings.
     *
     * @return A ResponseEntity with a map of financial data.
     */
    @GetMapping("/financial-overview")
    public ResponseEntity<Map<String, Double>> getFinancialOverview() {
        Map<String, Double> financials = bookService.getFinancialOverview();
        return ResponseEntity.ok(financials);
    }

    /**
     * Retrieves the inventory status showing sold and unsold book counts.
     * This endpoint calculates and returns the count of books that have been sold and those still unsold.
     *
     * @return A ResponseEntity with a map Containing counts of sold and unsold books.
     */
    @GetMapping("/inventory-status")
    public ResponseEntity<Map<String, Long>> getInventoryStatus() {
        long soldCount = bookService.countBySoldIsNotNull();
        long unsoldCount = bookService.countBySoldIsNull();

        Map<String, Long> status = new HashMap<>();
        status.put("sold", soldCount);
        status.put("unsold", unsoldCount);

        return ResponseEntity.ok(status);
    }


    /**
     * Retrieves the book details form the Google Books Api by ISBN.
     * This method forms a request to the Google Books API, using the provided ISBN
     * as a search parameter. It then extracts relevant book details from the response.
     *
     * <p>This is useful for obtaining comprehensive information about books,including
     *    titles, authors, and cover images, which might not be available in the local database</p>
     * @param isbn the International Book Number(ISBN) of the book
     * @return A ResponseEntity containing a map of book details or an error message.
     */
    @GetMapping("/book-details")
    public ResponseEntity<Map<String, Object>> getBookDetailsByISBN(@RequestParam String isbn) {
        String apiUrl = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn + "&key=" + googleBooksApiKey;
        try {
            ResponseEntity<Map> response = restTemplate.getForEntity(apiUrl, Map.class);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                List<Map<String, Object>> items = (List<Map<String, Object>>) response.getBody().get("items");
                if (items != null && !items.isEmpty()) {
                    Map<String, Object> volumeInfo = (Map<String, Object>) items.get(0).get("volumeInfo");
                    if (volumeInfo != null) {
                        Map<String, Object> imageLinks = (Map<String, Object>) volumeInfo.get("imageLinks");
                        String title = (String) volumeInfo.get("title");
                        String imageUrl = imageLinks != null ? (String) imageLinks.get("thumbnail") : null;
                        Map<String, Object> bookDetails = new HashMap<>();
                        bookDetails.put("title", title);
                        bookDetails.put("imageUrl", imageUrl);
                        return ResponseEntity.ok(bookDetails);
                    }
                }
            }

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Book details not found"));
        } catch (Exception e) {
            logger.error("Error retrieving book details", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Error retrieving book details"));
        }
    }


}
