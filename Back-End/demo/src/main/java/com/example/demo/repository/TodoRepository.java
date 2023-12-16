package com.example.demo.repository;

import com.example.demo.model.Todo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for accessing the Todo collection in MongoDB.
 * Extends MongoRepository  to provide standard CRUD operations for Todo entities.
 * This interface can be further extend to include custom query methods if needed.
 *
 * The MongoRepository interface provides methods such as save, findAll, findbyId, delete, etc...
 * which can be directly used without explicit definition
 */
@Repository
    public interface TodoRepository extends MongoRepository<Todo, String> {

    }

