'use client';

import { Button } from '@/components/ui/button';
import { CheckCircle2, Circle, ListTodo } from 'lucide-react';

type FilterStatus = 'all' | 'pending' | 'completed';

interface FiltersProps {
  currentStatus: FilterStatus;
  onStatusChange: (status: FilterStatus) => void;
  totalTodos: number;
  completedTodos: number;
}

export function Filters({
  currentStatus,
  onStatusChange,
  totalTodos,
  completedTodos,
}: FiltersProps) {
  const pendingTodos = totalTodos - completedTodos;

  const filters: Array<{
    status: FilterStatus;
    label: string;
    icon: React.ReactNode;
    count: number;
  }> = [
    {
      status: 'all',
      label: 'All Tasks',
      icon: <ListTodo className="w-4 h-4" />,
      count: totalTodos,
    },
    {
      status: 'pending',
      label: 'Pending',
      icon: <Circle className="w-4 h-4" />,
      count: pendingTodos,
    },
    {
      status: 'completed',
      label: 'Completed',
      icon: <CheckCircle2 className="w-4 h-4" />,
      count: completedTodos,
    },
  ];

  return (
    <div className="flex gap-2 flex-wrap">
      {filters.map(({ status, label, icon, count }) => (
        <Button
          key={status}
          variant={currentStatus === status ? 'default' : 'outline'}
          size="sm"
          onClick={() => onStatusChange(status)}
          className="gap-2"
        >
          {icon}
          <span>{label}</span>
          <span className="ml-1 px-2 py-0.5 bg-muted text-muted-foreground rounded text-xs font-medium">
            {count}
          </span>
        </Button>
      ))}
    </div>
  );
}
