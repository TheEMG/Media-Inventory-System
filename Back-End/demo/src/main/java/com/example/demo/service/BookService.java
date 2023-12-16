package com.example.demo.service;

import com.example.demo.model.Book;
import com.example.demo.repository.BookRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Service class for managing book-related operations.
 * This class provides business logic for various operations on Book entities,
 * such as creating updating, deleting and querying books, including specialized queries
 * like fetching books sold within a certain period or calculating financial overview.
 */
@Service
public class BookService {
    /**
     * Logger for logging information and errors.
     */
    private static final Logger logger = LoggerFactory.getLogger(BookService.class);

    /**
     * Repository for handling CRUD operations on books.
     */
    private final BookRepository bookRepository;

    /**
     * Autowired constructor for dependency injection of BookRepository.
     *
     * @param bookRepository the repository for handling book data operations.
     */
    @Autowired
    public BookService(BookRepository bookRepository){
        this.bookRepository = bookRepository;
    }

    /**
     * Retrieves a list of books sold withing a specified year and month.
     *
     * @param year The year to filter the sold books.
     * @param month The month to filter the sold books.
     * @return A list of books sold in the specified year and month.
     */
    public List<Book> getBooksSoldInMonth(int year, int month) {
        // Assuming datePurchased is a java.util.Date object
        // and you are storing the date in UTC in the database

        //Create a calendar instance set to UTC timezone
        Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("UTC"));

        //Set the calendar to the first day of the specified month and year
        //Note: -1 since we start from 0
        calendar.set(year, month - 1, 1, 0, 0, 0);

        //Set the millisecond field to 0, to get the very first start of the day
        // 00:00:00.000
        calendar.set(Calendar.MILLISECOND, 0);

        //Get the start date of the month
        Date startOfMonth = calendar.getTime();

        //Move the calendar to the start of the next month
        calendar.add(Calendar.MONTH, 1);

        //Subtract one millisecond to get the last moment of the specified month
        //23:59:59.999
        calendar.add(Calendar.MILLISECOND, -1);

        //Get the end date of the month
        Date endOfMonth = calendar.getTime();

        // Call the repository method to find books sold within the given date range
        return bookRepository.findBooksByDatePurchasedBetween(startOfMonth, endOfMonth);
    }

    /**
     * Fetches a book by its unique identifier.
     *
     * @param id The ID of the book to retrieve.
     * @return The found Book object or null if no book is found with the provided ID.
     */
    public Book getBookById(String id){
        return bookRepository.findById(id).orElse(null);
    }

    /**
     * Creates a new book record.
     * Validates the provided Book object and saves it to the repository.
     *
     *
     * @param book The Book object to create.
     * @return The created Book object.
     * @throws IllegalArgumentException if essential fields like ISBN and COGS are missing
     */
    public Book createBook(Book book){
        logger.info("Attempting to create book with ISBN: {}", book.getISBN());

        // Inline validation logic
        if (book.getISBN() == null || book.getISBN().trim().isEmpty()) {
            logger.error("ISBN is a mandatory field and was not provided.");
            throw new IllegalArgumentException("ISBN is a mandatory field.");
        }
        if (book.getCOGS() == null) {
            logger.error("COGS is a mandatory field and was not provided.");
            throw new IllegalArgumentException("COGS is a mandatory field.");
        }
       // logActivity(book.getId(), "created");

        // Assume profit calculation and other logic already included
        return saveBook(book);
    }

    /**
     * Updates the details of an existing book identified by its ID.
     * Retrieves the book from the repository and updates the details with the provided updatedBook object.
     * Throws IllegalArgumentException if the book with the given ID is not found.
     *
     * @param id The ID of the book to be updated.
     * @param updatedBook The Book object containing the updated details.
     * @return the updated Book object.
     * @throws IllegalArgumentException If no book is found with the provided ID.
     */
    public Book updateBook(String id, Book updatedBook) {
        Book existingBook = bookRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("Book with ID: " + id + " not found."));

        // Update the existing book details with updatedBook details
        // Assuming that you have setters in Book class for each field you want to update
        existingBook.setISBN(updatedBook.getISBN());
        existingBook.setCOGS(updatedBook.getCOGS());
        existingBook.setDatePurchased(updatedBook.getDatePurchased());
        existingBook.setSold(updatedBook.getSold());
        existingBook.setPayout(updatedBook.getPayout());
        existingBook.setProfit(updatedBook.getProfit());
        existingBook.setTitle(updatedBook.getTitle());
       // logActivity(id, "updated");
        // Save and return the updated book
        return saveBook(existingBook);
    }

    /**
     * Deletes a book identified by its ID.
     * If the book is found, it is deleted from the repository.
     *
     * @param id the ID of the book to be deleted.
     */
    public void deleteBook(String id){
      //  logActivity(id, "deleted");
        bookRepository.deleteById(id);
    }

    /**
     * Retrieves  a paginated list of books.
     * Fetches books based on the provided page number and page size (limit).
     *
     * @param page The page number to retrieve , starting from 0.
     * @param limit The maximum number of books to return in a single page.
     * @return A Page of Book objects containing books for the specified page and limit.
     */
    public Page<Book> getBooks(int page, int limit) {
        Pageable pageable = PageRequest.of(page, limit);
        return bookRepository.findAll(pageable);
    }

    /**
     * Searches for books by their ISBN.
     *
     * @param isbn the International Standard Book Number (ISBN) to search.
     * @return A list of books that match the given ISBN.
     */
    public List<Book> searchByIsbn(String isbn) {
        return bookRepository.findByIsbn(isbn); // Returns a list of books
    }

    /**
     * Saves a Book object to the repository.
     * This method attempts to save the provided books and logs the outcome.
     *
     * @param book The Book object to be saved.
     * @return The saved Book object.
     */
    private Book saveBook(Book book) {
        try {
            Book savedBook = bookRepository.save(book);
            logger.info("Book successfully saved with ISBN: {}", book.getISBN());
            return savedBook;
        } catch (Exception e) {
            logger.error("An error occurred while saving the book with ISBN: {}: {}", book.getISBN(), e.getMessage());
            throw e;
        }
    }

    /**
     * Counts the number of active inventory books if 'date' is null.
     *
     * @return The count of active inventory books.
     */
    public long countActiveInventory() {
        return bookRepository.countBySoldIsNull();
    }

    /**
     * Provides a financial overview of all books.
     * This method calculates the total cost of goods sold (COGS) and total profit
     * from all books and returns them in a map.
     *
     * @return A map containing the total COGS and total profit.
     */
    public Map<String, Double> getFinancialOverview() {
        //Retrieve the list of all books with only 'cogs' and 'profit' field.
        List<Book> books = bookRepository.findAllForFinancialSummary();

        //Calculate total COGS
        //Stream through the list of the books
        double totalCOGS = books.stream()
                //Filter out books with COGS  is null to avoid NullPointerException.
                .filter(book -> book.getCOGS() != null)
                //Convert each Book object to its COGS value.
                .mapToDouble(Book::getCOGS)
                //Sum up all COGS values to get the total.
                .sum();
        double totalProfit = books.stream()
                //Filter out books with profit is null to avoid NullPointerException.
                .filter(book -> book.getProfit() != null)
                //Convert each Book object to its profit value.
                .mapToDouble(Book::getProfit)
                //Sum up all profit values to get the total.
                .sum();
        //Create a map to store and return financial data.
        Map<String, Double> financials = new HashMap<>();
        //Put total COGS in the map with key 'cogs'
        financials.put("cogs", totalCOGS);
        //Put total profit in the map with key 'profit'
        financials.put("profit", totalProfit);
        //Return the map containing total COGS and total profit
        return financials;
    }

    /**
     * Counts the number of books that have been sold, indicated by
     * 'sold' being not null.
     *
     * @return The count of sold books.
     */
    public long countBySoldIsNotNull() {
        return bookRepository.countBySoldIsNotNull();
    }

    /**
     * Counts the number of books that have not sold, indicated by
     * 'sold' being null.
     *
     * @return The count of unsold books.
     */
    public long countBySoldIsNull() {
        return bookRepository.countBySoldIsNull();
    }



}
