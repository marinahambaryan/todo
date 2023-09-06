import { TodoInterface, TodoUpdateInterface } from "../types";

export const getTodos = async (): Promise<TodoInterface[]> => {
  try {
    const response = await fetch(`/api/todo`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.json();
    return data || [];
  } catch (error) {
    console.log({ error });
    throw new Error("Failed to retrieve todos");
  }
};

export const createTodo = async (
  text: string,
  description: string
): Promise<TodoInterface> => {
  try {
    const data = await fetch(`/api/todo`, {
      method: "POST",
      body: JSON.stringify({ text, description }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    return data;
  } catch (error) {
    console.error({ error });
    throw new Error("Failed to get");
  }
};

export const updateTodo = async (id: string, data: TodoUpdateInterface) => {
  try {
    await fetch(`/api/todo`, {
      method: "PUT",
      body: JSON.stringify({ id, ...data }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    return data;
  } catch (error) {
    console.error({ error });
    throw new Error("Failed to update");
  }
};

export const deleteTodo = async (id: string) => {
  try {
    const data = await fetch(`/api/todo`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    return data;
  } catch (error) {
    console.error({ error });
    throw new Error("Failed to delete");
  }
};
