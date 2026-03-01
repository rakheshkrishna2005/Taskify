// API client for todo-list-api
// Update BASE_URL to match your API endpoint
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export interface Todo {
  id: string;
  title: string;
  description: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateTodoInput {
  title: string;
  description?: string;
}

export interface UpdateTodoInput {
  title?: string;
  description?: string;
  is_completed?: boolean;
}

interface BackendTodo {
  id: number | string;
  title: string;
  description?: string | null;
  completed?: boolean;
  is_completed?: boolean;
  createdAt?: string;
  updatedAt?: string;
  created_at?: string;
  updated_at?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const responseText = await response.text();

    if (!response.ok) {
      const error = responseText ? JSON.parse(responseText) : {};
      throw new Error(error.message || `API error: ${response.status}`);
    }

    if (!responseText) {
      return undefined as T;
    }

    return JSON.parse(responseText) as T;
  }

  private normalizeTodo(raw: BackendTodo): Todo {
    const createdAt = raw.createdAt ?? raw.created_at;
    const updatedAt = raw.updatedAt ?? raw.updated_at;

    return {
      id: String(raw.id),
      title: raw.title,
      description: raw.description ?? '',
      is_completed: Boolean(raw.completed ?? raw.is_completed),
      created_at: createdAt ?? new Date().toISOString(),
      updated_at: updatedAt ?? createdAt ?? new Date().toISOString(),
    };
  }

  // Get all todos
  async getTodos(
    status?: 'all' | 'pending' | 'completed',
    search?: string,
    sort?: string,
    limit?: number,
    offset?: number
  ): Promise<{ data: Todo[]; total: number }> {
    void sort;
    void limit;
    void offset;

    let endpoint = '/todos';
    const trimmedSearch = search?.trim();

    if (trimmedSearch) {
      endpoint = `/todos/search?title=${encodeURIComponent(trimmedSearch)}`;
    } else if (status === 'completed') {
      endpoint = '/todos/filter/completed';
    } else if (status === 'pending') {
      endpoint = '/todos/filter/pending';
    }

    const result = await this.request<
      BackendTodo[] | { data: BackendTodo[]; total?: number }
    >(endpoint);

    const rawTodos = Array.isArray(result)
      ? result
      : Array.isArray(result?.data)
        ? result.data
        : [];

    const todos = rawTodos.map((todo) => this.normalizeTodo(todo));
    const total = Array.isArray(result)
      ? todos.length
      : typeof result?.total === 'number'
        ? result.total
        : todos.length;

    return { data: todos, total };
  }

  // Get single todo
  async getTodo(id: string): Promise<Todo> {
    const response = await this.request<BackendTodo>(`/todos/${id}`);
    return this.normalizeTodo(response);
  }

  // Create todo
  async createTodo(data: CreateTodoInput): Promise<Todo> {
    const response = await this.request<BackendTodo>('/todos', {
      method: 'POST',
      body: JSON.stringify({
        title: data.title,
        description: data.description ?? '',
        completed: false,
      }),
    });
    return this.normalizeTodo(response);
  }

  // Update todo
  async updateTodo(id: string, data: UpdateTodoInput): Promise<Todo> {
    const existingTodo = await this.getTodo(id);
    const payload = {
      title: data.title ?? existingTodo.title,
      description: data.description ?? existingTodo.description ?? '',
      completed: data.is_completed ?? existingTodo.is_completed,
    };

    const response = await this.request<BackendTodo>(`/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    return this.normalizeTodo(response);
  }

  // Delete todo
  async deleteTodo(id: string): Promise<void> {
    await this.request<void>(`/todos/${id}`, {
      method: 'DELETE',
    });
  }

  // Mark as completed
  async markAsCompleted(id: string): Promise<Todo> {
    return this.updateTodo(id, { is_completed: true });
  }

  // Mark as pending
  async markAsPending(id: string): Promise<Todo> {
    return this.updateTodo(id, { is_completed: false });
  }
}

export const apiClient = new ApiClient(BASE_URL);
