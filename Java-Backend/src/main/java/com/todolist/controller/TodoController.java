package com.todolist.controller;

import com.todolist.dto.TodoDTO;
import com.todolist.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TodoController {

    private final TodoService todoService;

    // GET all todos
    @GetMapping
    public ResponseEntity<List<TodoDTO>> getAllTodos() {
        return ResponseEntity.ok(todoService.getAllTodos());
    }

    // GET todo by ID
    @GetMapping("/{id}")
    public ResponseEntity<TodoDTO> getTodoById(@PathVariable Long id) {
        return ResponseEntity.ok(todoService.getTodoById(id));
    }

    // POST create todo
    @PostMapping
    public ResponseEntity<TodoDTO> createTodo(@Valid @RequestBody TodoDTO todoDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(todoService.createTodo(todoDTO));
    }

    // PUT update todo
    @PutMapping("/{id}")
    public ResponseEntity<TodoDTO> updateTodo(@PathVariable Long id, @Valid @RequestBody TodoDTO todoDTO) {
        return ResponseEntity.ok(todoService.updateTodo(id, todoDTO));
    }

    // DELETE todo
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        todoService.deleteTodo(id);
        return ResponseEntity.noContent().build();
    }

    // GET completed todos
    @GetMapping("/filter/completed")
    public ResponseEntity<List<TodoDTO>> getCompletedTodos() {
        return ResponseEntity.ok(todoService.getCompletedTodos());
    }

    // GET pending todos
    @GetMapping("/filter/pending")
    public ResponseEntity<List<TodoDTO>> getPendingTodos() {
        return ResponseEntity.ok(todoService.getPendingTodos());
    }

    // GET search todos by title
    @GetMapping("/search")
    public ResponseEntity<List<TodoDTO>> searchTodosByTitle(@RequestParam String title) {
        return ResponseEntity.ok(todoService.searchTodosByTitle(title));
    }

}
