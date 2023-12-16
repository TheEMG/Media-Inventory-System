package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

/**
 * Represents the book entity in the application.
 * This class models the book's data is mapped to a MongoDB collection 'Book'.
 * It includes details such as ISBN, cost of goods sold (COGS), purchase and sold dates,
 * and financial calculations.
 */
@Document (collection = "Book")
public class Book {
    @Id
    private String id; //Unique identifier for the book.
    private String isbn; //International Standard Book Number.
    private Double cogs; //Cost of goods sold.
    /**
     * The date the book was purchased.
     * Formatted as yyyy-MM-dd in UTC timezone.
     */
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "UTC")
    private Date datePurchased;

    /**
     * The date the book was sold.
     * Formatted as yyyy-MM-dd in UTC timezone.
     */
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "UTC")
    private Date sold;
    private Double payout; //The amount paid out for the book.
    private Double profit; //The profit of the book.
    private String title; //The title of the book.


    /**
     * Gets the unique identifier of the book.
     * @return The book's ID.
     */
   public String getId(){
       return id;
   }

    /**
     * Sets the unique identifier of the book.
     * @param id the ID to set.
     */
   public void setId(String id){
       this.id=id;
   }

    /**
     * Gets the title of the book.
     * @return The book title.
     */
    public String getTitle() {
        return title;
    }

    /**
     * Sets the unique identifier of the book.
     * @param title the title to set.
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * Gets the ISBN of the book
     * @return the ISBN of the book
     */
    public String getISBN() {
        return isbn;
    }

    /**
     * Sets the ISBN of the Book.
     * @param ISBN the ISBN of the book.
     */
    public void setISBN(String ISBN) {
        this.isbn = ISBN;
    }

    /**
     * Gets the cogs of the book.
     * @return the cogs of the book.
     */
    public Double getCOGS() {
        return cogs;
    }

    /**
     * Sets the cogs of the book.
     * @param COGS the cogs of the book.
     */
    public void setCOGS(Double COGS) {
        this.cogs = COGS;
    }

    /**
     * Gets the date purchased of the book.
     * @return date purchased of the book.
     */
    public Date getDatePurchased() {
        return datePurchased;
    }

    /**
     * Sets the date purchased of the book.
     * @param datePurchased the date purchased of the book
     */
    public void setDatePurchased(Date datePurchased) {
        this.datePurchased = datePurchased;
    }

    /**
     * Gets the date sold of the book.
     * @return the date sold of the book.
     */
    public Date getSold() {
        return sold;
    }

    /**
     * Sets the date sold of the book.
     * @param sold the sold date of the book.
     */
    public void setSold(Date sold) {
        this.sold = sold;
    }

    /**
     * Gets the payout of the book.
     * @return the payout of the book.
     */
    public Double getPayout() {
        return payout;
    }

    /**
     * Sets the payout of the book.
     * @param payout the payout of the book.
     */
    public void setPayout(Double payout) {
        this.payout = payout;
    }

    /**
     * Gets the profit of the book.
     * @return the profit of the book.
     */
    public Double getProfit() {
        return profit;
    }

    /**
     * Sets the profit of the book.
     * @param profit the profit of the book.
     */
    public void setProfit(Double profit) {
        this.profit = profit;
    }
}
