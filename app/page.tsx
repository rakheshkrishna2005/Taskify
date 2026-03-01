import { TodoApp } from '@/components/todo-app';

export const metadata = {
  title: 'Task Manager - Stay Organized',
  description: 'A powerful todo list application to manage your tasks efficiently',
};

export default function Home() {
  return <TodoApp />;
}
