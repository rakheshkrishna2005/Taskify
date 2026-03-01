'use client';

import { Todo } from '@/lib/api';
import { TodoItem } from './todo-item';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string, currentStatus: boolean) => Promise<void>;
  onUpdate: (id: string, title: string, description: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function TodoList({
  todos,
  onToggle,
  onUpdate,
  onDelete,
}: TodoListProps) {
  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
