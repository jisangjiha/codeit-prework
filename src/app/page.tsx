"use client";

import { useEffect, useState } from "react";

import { Todo } from "@/types";
import { fetchTodos, createTodo, toggleTodoStatus } from "@/api";

import TodoInput from "./mainpage/TodoInput";
import Lists from "./mainpage/Lists";

import styles from "./page.module.css";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos().then((data) => {
      const formattedTodos = data.map((item: any) => ({
        id: item.id,
        name: item.name,
        isCompleted: item.isCompleted,
      }));
      setTodos(formattedTodos);
    });
  }, []);

  const addTodo = (name: string) => {
    if (!name.trim()) return;

    createTodo(name).then((createdTodo) => {
      const newTodo: Todo = {
        id: createdTodo.id,
        name: createdTodo.name,
        isCompleted: createdTodo.completed,
      };
      setTodos((prev) => [...prev, newTodo]);
    });
  };

  const toggleTodo = (id: string) => {
    const target = todos.find((todo) => todo.id === id);
    if (!target) return;

    toggleTodoStatus(id, !target.isCompleted).then((updated) => {
      const updatedTodo = {
        id: updated.id,
        name: updated.content,
        isCompleted: updated.completed,
      };
      // API 즉시 반영
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: updated.isCompleted } : todo
        )
      );
    });
  };

  // 미완료 또는 완료된 todo 각 필터링
  const activeTodos = todos.filter((todo) => !todo.isCompleted);
  const completedTodos = todos.filter((todo) => todo.isCompleted);

  return (
    <>
      <TodoInput onAddTodo={addTodo} />
      <div className={styles.listsContainer}>
        <Lists
          activeTodos={activeTodos}
          completedTodos={completedTodos}
          onToggle={toggleTodo}
        />
      </div>
    </>
  );
}
