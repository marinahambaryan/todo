"use client";
import React, { useState, useEffect } from "react";
import { Button, Container, Typography } from "@mui/material";
import TodoModal from "./components/TodoModal";
import { TodoInterface, TodoUpdateInterface } from "@/utils/types";
import { createTodo, deleteTodo, getTodos, updateTodo } from "@/utils/api";
import TodoFlow from "./components/TodoFlow";

const TodoComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todos, setTodos] = useState<TodoInterface[]>([]); // Use an array of strings for todos

  useEffect(() => {
    (async () => {
      const data: TodoInterface[] = await getTodos();
      console.log({ data });
      setTodos(data);
    })();
  }, []);

  const handleAddTodo = async (todoText: string, todoDescription: string) => {
    if (!todoText || !todoDescription) {
      return;
    }
    const data = await createTodo(todoText, todoDescription);
    console.log({ data });
    setTodos((prevProps: TodoInterface[]) => [...prevProps, data]);
  };

  const handleStatusChange = async (id: string, isCompleted: boolean) => {
    await updateTodo(id, { completed: isCompleted });
    const newTodos = todos.map((todo: TodoInterface) => {
      if (id === todo._id) {
        todo.completed = isCompleted;
      }
      return todo;
    });
    setTodos(newTodos);
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
    await updateTodo(id, data);
    console.log({ newTodos });
    setTodos(newTodos);
    return true;
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

export default TodoComponent;
