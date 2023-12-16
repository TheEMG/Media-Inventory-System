package com.example.demo.repository;




import com.example.demo.model.Book;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

/**
 * Repository interface for accessing the Book collection in MongoDB.
 * This interface extends MongoRepository, providing CRUD operations
 * and custom query methods for Book entities.
 */
@Repository
public interface BookRepository extends MongoRepository<Book, String> {

    /**
     * Finds books by their ISBN
     *
     * @param isbn the ISBN to search for.
     * @return A list of books with the specified ISBN.
     */
    List<Book> findByIsbn(String isbn);

    /**
     * Finds books purchased between two dates.
     *
     * @param start The start date of the purchase period.
     * @param end The end date of the purchase period.
     * @return A list of books purchased between the specified dates.
     */
    List<Book> findBooksByDatePurchasedBetween(Date start, Date end);

    /**
     * Counts the number of books that are still in inventory (unsold).
     *
     * @return The count of unsold books.
     */
    long countBySoldIsNull();

    /**
     * Counts the number of books that have been sold
     *
     * @return The count of sold books.
     */
    long countBySoldIsNotNull();

    /**
     * Retrieves a summary of financial data for all books, focusing on 'cogs' and 'profit'.
     * This custom aggregation query is used for financial analysis.
     *
     * @return A list of books with only 'cogs' and 'profit' fields  included.
     */
    @Query(value="{}", fields="{ 'cogs' : 1, 'profit' : 1 }")   // Aggregation queries to calculate the sum of 'cogs' and 'profit'
    List<Book> findAllForFinancialSummary();


}

