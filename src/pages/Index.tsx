"use client";

import TodoList from "@/components/todo/TodoList";
import { MadeWithApplaa } from "@/components/made-with-applaa";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">My Todo App</h1>
        <TodoList />
      </div>
      <MadeWithApplaa />
    </div>
  );
};

export default Index;