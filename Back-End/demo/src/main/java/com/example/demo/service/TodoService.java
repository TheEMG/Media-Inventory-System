package com.example.demo.service;

import com.example.demo.model.Todo;
import com.example.demo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class for managing Todo-related operations.
 * Provides business logic for operations on Todo entries,
 * such as retrieving all todos, adding a new todo, updating an existing todo, and
 * deleting a todo.
 */
@Service
public class TodoService {
    /**
     * Repository for handling CRUD operations on todos.
     */
    private final TodoRepository todoRepository;

    /**
     * Autowired constructor for dependency injection of TodoRepository.
     * @param todoRepository the repository for handling Todo data operations.
     */
    @Autowired
    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    /**
     * Retrieves a list of all Todo items.
     *
     * @return A list of Todo objects representing all todos in the database.
     */
    public List<Todo> findAllTodos() {
        return todoRepository.findAll();
    }

    /**
     * Adds a new Todo item to the database.
     * Accepts a Todo object and saves it to the repository.
     *
     * @param todo The Todo object to be added.
     * @return The added Todo object with generated ID and other details.
     */
    public Todo addTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    /**
     * Updates the existing Todo item identified by its ID.
     * Sets the ID of the provided Todo object and saves the updated object to the repository.
     *
     * @param id the ID of the Todo to be updated.
     * @param todo The Todo object with updated details.
     * @return The updated Todo object.
     */
    public Todo updateTodo(String id, Todo todo) {
        todo.setId(id);
        return todoRepository.save(todo);
    }

    /**
     * Deletes a Todo item identified by its ID.
     * If the todo item is found, it is deleted from the repository.
     *
     * @param id id the ID of the Todo to be deleted
     */
    public void deleteTodo(String id) {
        todoRepository.deleteById(id);
    }
}
