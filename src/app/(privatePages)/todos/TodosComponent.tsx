"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Button, Container } from "@mui/material";

import TodoModal from "./components/TodoModal";
import TodoFlow from "./components/TodoFlow";

import { TodoInterface, TodoUpdateInterface } from "@/utils/types";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "@/utils/apis/todosapi";

const TodosComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [todos, setTodos] = useState<TodoInterface[]>([]);

  useEffect(() => {
    (async () => {
      const data: TodoInterface[] = await getTodos();
      setTodos(data);
    })();
  }, []);

  const { data: session } = useSession();
  if (session === null) redirect("/");

  const handleAddTodo = async (todoText: string, todoDescription: string) => {
    if (!todoText || !todoDescription) {
      return;
    }
    try {
      const data = await createTodo(todoText, todoDescription);
      setTodos((prevProps: TodoInterface[]) => [...prevProps, data]);
    } catch (error) {
      console.error({ error });
    }
  };

  const handleStatusChange = async (id: string, isCompleted: boolean) => {
    try {
      await updateTodo(id, { completed: isCompleted });
      const newTodos = todos.map((todo: TodoInterface) => {
        if (id === todo._id) {
          todo.completed = isCompleted;
        }
        return todo;
      });
      setTodos(newTodos);
    } catch (error) {
      console.error({ error });
    }
  };

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
    const newTodos = todos.filter((todo: TodoInterface) => id !== todo._id);
    setTodos(newTodos);
  };

  const handleUpdate = async (id: string, data: TodoUpdateInterface) => {
    const newTodos = todos.map((todo: TodoInterface) => {
      if (id === todo._id) {
        return { ...todo, ...data };
      }
      return todo;
    });
    try {
      await updateTodo(id, data);
      setTodos(newTodos);
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <Container maxWidth="lg" style={{ paddingTop: "20px" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsModalOpen(true)}
      >
        Add Todo
      </Button>
      <TodoModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTodo={handleAddTodo}
      />
      <TodoFlow
        todos={todos}
        handleDelete={handleDelete}
        handleStatusChange={handleStatusChange}
        handleUpdate={handleUpdate}
      />
    </Container>
  );
};

export default TodosComponent;
