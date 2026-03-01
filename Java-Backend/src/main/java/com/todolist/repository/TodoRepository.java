package com.todolist.repository;

import com.todolist.entity.TodoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<TodoEntity, Long> {
    List<TodoEntity> findByCompletedFalse();
    List<TodoEntity> findByCompletedTrue();
    List<TodoEntity> findByTitleContainingIgnoreCase(String title);
}
