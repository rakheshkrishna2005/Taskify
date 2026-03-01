'use client';

import { useEffect, useState, useCallback } from 'react';
import { apiClient, Todo } from '@/lib/api';
import { TodoList } from './todo-list';
import { AddTodoForm } from './add-todo-form';
import { SearchBar } from './search-bar';
import { Filters } from './filters';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

type FilterStatus = 'all' | 'pending' | 'completed';

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [totalTodosCount, setTotalTodosCount] = useState(0);
  const [completedTodosCount, setCompletedTodosCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const { toast } = useToast();

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch todos
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [filteredResponse, allTodosResponse] = await Promise.all([
        apiClient.getTodos(
          filterStatus === 'all' ? undefined : filterStatus,
          debouncedSearch || undefined
        ),
        apiClient.getTodos(),
      ]);

      const filteredTodos = Array.isArray(filteredResponse?.data)
        ? filteredResponse.data
        : [];

      const allTodos = Array.isArray(allTodosResponse?.data)
        ? allTodosResponse.data
        : [];

      setTodos(filteredTodos);
      setTotalTodosCount(allTodos.length);
      setCompletedTodosCount(allTodos.filter((todo) => todo.is_completed).length);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch todos';
      setError(message);
      setTodos([]);
      setTotalTodosCount(0);
      setCompletedTodosCount(0);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: message,
      });
    } finally {
      setLoading(false);
    }
  }, [filterStatus, debouncedSearch, toast]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAddTodo = async (title: string, description: string) => {
    try {
      await apiClient.createTodo({ title, description });
      await fetchTodos();
      toast({
        title: 'Success',
        description: 'Todo created successfully',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create todo';
      toast({
        variant: 'destructive',
        title: 'Error',
        description: message,
      });
    }
  };

  const handleToggleTodo = async (id: string, currentStatus: boolean) => {
    try {
      if (currentStatus) {
        await apiClient.markAsPending(id);
      } else {
        await apiClient.markAsCompleted(id);
      }
      await fetchTodos();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update todo';
      toast({
        variant: 'destructive',
        title: 'Error',
        description: message,
      });
    }
  };

  const handleUpdateTodo = async (id: string, title: string, description: string) => {
    try {
      await apiClient.updateTodo(id, { title, description });
      await fetchTodos();
      toast({
        title: 'Success',
        description: 'Todo updated successfully',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update todo';
      toast({
        variant: 'destructive',
        title: 'Error',
        description: message,
      });
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await apiClient.deleteTodo(id);
      await fetchTodos();
      toast({
        title: 'Success',
        description: 'Todo deleted successfully',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete todo';
      toast({
        variant: 'destructive',
        title: 'Error',
        description: message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-4xl font-bold text-foreground">My Tasks</h1>
          <p className="text-muted-foreground">Stay organized and productive</p>
        </div>

        {/* Add Todo Form */}
        <AddTodoForm onAdd={handleAddTodo} />

        {/* Search and Filters */}
        <div className="space-y-4">
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search tasks..."
          />
          <Filters
            currentStatus={filterStatus}
            onStatusChange={setFilterStatus}
            totalTodos={totalTodosCount}
            completedTodos={completedTodosCount}
          />
        </div>

        {/* Todo List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-destructive">
            <p className="font-medium">Error loading todos</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        ) : todos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No tasks yet</p>
            <p className="text-muted-foreground text-sm">Create a new task to get started</p>
          </div>
        ) : (
          <TodoList
            todos={todos}
            onToggle={handleToggleTodo}
            onUpdate={handleUpdateTodo}
            onDelete={handleDeleteTodo}
          />
        )}
      </div>
    </div>
  );
}
