"use client";

import React, { useState } from "react";
import TodoItem from "@/components/todo/TodoItem";
import TodoForm from "@/components/todo/TodoForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
    }
    setTodos([...todos, newTodo]);
  }

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  const startEdit = (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      setEditingId(id);
      setEditText(todo.text);
    }
  }

  const saveEdit = (id: string, text: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text } : todo
      )
    );
    setEditingId(null);
    setEditText("");
  }

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  }

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Todo List</CardTitle>
      </CardHeader>
      <CardContent>
        <TodoForm onAdd={addTodo} />
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All ({todos.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({activeTodos.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedTodos.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-2">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                {...todo}
                isEditing={editingId === todo.id}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={startEdit}
                onSave={saveEdit}
                onCancel={cancelEdit}
                editText={editText}
                onEditTextChange={setEditText}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="active" className="space-y-2">
            {activeTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                {...todo}
                isEditing={editingId === todo.id}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={startEdit}
                onSave={saveEdit}
                onCancel={cancelEdit}
                editText={editText}
                onEditTextChange={setEditText}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-2">
            {completedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                {...todo}
                isEditing={editingId === todo.id}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={startEdit}
                onSave={saveEdit}
                onCancel={cancelEdit}
                editText={editText}
                onEditTextChange={setEditText}
              />
            ))}
          </TabsContent>
        </Tabs>
        
        {todos.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No todos yet. Add one above!</p>
        )}
      </CardContent>
    </Card>
  );
}

export default TodoList;