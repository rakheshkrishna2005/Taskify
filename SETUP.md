# Task Manager Frontend - Setup Guide

This is a modern React/Next.js frontend for the Todo List API. It provides a beautiful interface to manage your tasks with full CRUD functionality, filtering, and search capabilities.

## Features

- ✅ Create, read, update, and delete tasks
- 🔍 Search tasks with debounced input
- 📋 Filter tasks by status (all, pending, completed)
- ✓ Mark tasks as completed/pending
- 📝 Edit task titles and descriptions
- 🎨 Modern dark/light theme with Tailwind CSS
- 📱 Fully responsive design
- 🚀 Fast performance with React 19 and Next.js 16

## Prerequisites

- Node.js 18+ and pnpm
- Your Todo List API running (see API_URL below)

## Setup Instructions

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure API Endpoint

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

Replace `http://localhost:3001/api` with your actual API endpoint URL.

### 3. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## API Integration

The frontend communicates with your Todo List API using the following endpoints:

- `GET /todos` - Fetch all todos (supports filtering and search)
- `GET /todos/:id` - Get a specific todo
- `POST /todos` - Create a new todo
- `PUT /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo
- `PATCH /todos/:id/complete` - Mark todo as completed
- `PATCH /todos/:id/pending` - Mark todo as pending

The API client is located at `lib/api.ts` and can be customized if your API endpoints differ.

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles and theme
├── components/
│   ├── todo-app.tsx        # Main app component with state management
│   ├── todo-list.tsx       # Todo list container
│   ├── todo-item.tsx       # Individual todo item with edit/delete
│   ├── add-todo-form.tsx   # Form to create new todos
│   ├── search-bar.tsx      # Search input component
│   ├── filters.tsx         # Filter buttons component
│   └── ui/                 # Reusable UI components (shadcn/ui)
├── lib/
│   ├── api.ts              # API client
│   └── utils.ts            # Utility functions
└── hooks/
    └── use-toast.ts        # Toast notifications hook
```

## Building for Production

```bash
pnpm build
pnpm start
```

## Deployment

Deploy to Vercel by connecting your GitHub repository or using the Vercel CLI:

```bash
npm i -g vercel
vercel
```

Make sure to add the `NEXT_PUBLIC_API_URL` environment variable in your Vercel project settings.

## Technology Stack

- **React 19.2** - UI library
- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **React Hook Form** - Form management
- **Sonner** - Toast notifications
- **Lucide React** - Icons
- **date-fns** - Date formatting
