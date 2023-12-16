package com.example.demo.controller;

import com.example.demo.service.TodoService;
import com.example.demo.model.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for managing Todo-related operations.
 * This class provides endpoints for CRUD operations on Todo items, including
 * listing all todos, adding a new todo, updating an existing todo, and
 * deleting a todo.
 *
 * <p>Annotations Explained:</p>
 * <ul>
 *     <li><code>@RestController</code>Marks this class as a controller with methods returning data directly.</li>
 *     <li><code>@CrossOrigin</code>: Allows cross-origin requests, enabling frontend to communicate with the backend
 *                service.</li>
 *     <li><code>@RequestMapping</code> Maps HTTP requests to handler methods of MVC and REST controllers.</li>
 *
 * </ul>
 *
 */
@RestController
@CrossOrigin
@RequestMapping("/api/todos")
public class TodoController {
    /**
     * Service for handling Todo-related buisness logic.
     */
    private final TodoService todoService;

    /**
     * Autowired constructor for dependency injection of TodoService.
     * @param todoService the service for handling Todo operations.
     */
    @Autowired
    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    /**
     * Retrieves a list of all Todo items.
     *
     * @return A list of Todo objects representing all todos in the database.
     */
    @GetMapping
    public List<Todo> getAllTodos() {
        return todoService.findAllTodos();
    }

    /**
     * Adds a new Todo item to the database.
     * Accepts a Todo object in the request body and adds it to the database.
     * @param todo the Todo object to be added.
     * @return The added Todo object with generated ID and other details.
     */
    @PostMapping
    public Todo addNewTodo(@RequestBody Todo todo) {
        return todoService.addTodo(todo);
    }

    /**
     * Updates the existing Todo item.
     * The Todo to be updated is identified by its ID, and the new details.
     *
     * @param id The unique identifier of the Todo to be updated.
     * @param todo the Todo object with updated details.
     * @return The updated Todo object.
     */
    @PutMapping("/{id}")
    public Todo updateTodo(@PathVariable String id, @RequestBody Todo todo) {
        return todoService.updateTodo(id, todo);
    }

    /**
     * Deletes a Todo item identified by its ID.
     *
     * @param id The unique identifier of the Todo to be deleted.
     */
    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable String id) {
        todoService.deleteTodo(id);
    }


}
