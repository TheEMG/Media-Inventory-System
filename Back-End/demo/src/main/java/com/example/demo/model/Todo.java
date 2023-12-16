package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

/**
 * Represents a Todo entity in the application.
 * This class models the todo data and is mapped to a MongoDB collection 'todos'.
 * It includes details such as title, description, due date, and completion status.
 */
@Document(collection = "todos")
public class Todo {
    @Id
    private String id; //Unique identifier for the todo item.
    private String title; //Title of the todo item.
    private String description; //Detailed description of the todo item.
    private Date dueDate; //The date by which the todo item should be completed
    private Boolean completed; //Indicates whether the todo item is completed.

    /**
     * Sets the unique identifier of the todo item.
     * @param id the ID to set.
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * Sets the title of the todo item.
     * @param title the title to set.
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * Sets the description of the todo item.
     * @param description the description to set.
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * Sets the due date of the todo item.
     * @param dueDate the due date to set.
     */
    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    /**
     * Sets the completed todo item
     * @param completed , the completed todo item to set
     */
    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }


    /**
     * Gets the unique identifier of the todo item.
     * @return the todo id.
     */
    public String getId() {
        return id;
    }

    /**
     * Gets the title of the todo item.
     * @return the title of the todo item.
     */
    public String getTitle() {
        return title;
    }

    /**
     * Gets the description of the todo item.
     * @return the description of the todo item.
     */
    public String getDescription() {
        return description;
    }

    /**
     * Gets the due date of the todo item.
     * @return the due date of the todo item.
     */
    public Date getDueDate() {
        return dueDate;
    }

    /**
     * Gets the completed todo item.
     * @return the completed todo item.
     */
    public Boolean getCompleted() {
        return completed;
    }
}