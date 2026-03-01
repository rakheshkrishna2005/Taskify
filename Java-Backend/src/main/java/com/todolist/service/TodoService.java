package com.todolist.service;

import com.todolist.dto.TodoDTO;
import com.todolist.entity.TodoEntity;
import com.todolist.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;

    // Get all todos
    public List<TodoDTO> getAllTodos() {
        return todoRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get todo by ID
    public TodoDTO getTodoById(Long id) {
        return todoRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));
    }

    // Create todo
    public TodoDTO createTodo(TodoDTO todoDTO) {
        TodoEntity entity = convertToEntity(todoDTO);
        TodoEntity savedEntity = todoRepository.save(entity);
        return convertToDTO(savedEntity);
    }

    // Update todo
    public TodoDTO updateTodo(Long id, TodoDTO todoDTO) {
        TodoEntity entity = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));

        entity.setTitle(todoDTO.getTitle());
        entity.setDescription(todoDTO.getDescription());
        entity.setCompleted(todoDTO.getCompleted());

        TodoEntity updatedEntity = todoRepository.save(entity);
        return convertToDTO(updatedEntity);
    }

    // Delete todo
    public void deleteTodo(Long id) {
        todoRepository.deleteById(id);
    }

    // Get completed todos
    public List<TodoDTO> getCompletedTodos() {
        return todoRepository.findByCompletedTrue().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get pending todos
    public List<TodoDTO> getPendingTodos() {
        return todoRepository.findByCompletedFalse().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Search todos by title
    public List<TodoDTO> searchTodosByTitle(String title) {
        return todoRepository.findByTitleContainingIgnoreCase(title).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Helper methods
    private TodoDTO convertToDTO(TodoEntity entity) {
        return new TodoDTO(
                entity.getId(),
                entity.getTitle(),
                entity.getDescription(),
                entity.getCompleted(),
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }

    private TodoEntity convertToEntity(TodoDTO dto) {
        TodoEntity entity = new TodoEntity();
        entity.setTitle(dto.getTitle());
        entity.setDescription(dto.getDescription());
        entity.setCompleted(dto.getCompleted() != null ? dto.getCompleted() : false);
        return entity;
    }

}
