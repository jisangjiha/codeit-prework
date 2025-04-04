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
      console.log("🚀 fetchTodos data:", data);
      const formattedTodos = data.map((item: any) => ({
        id: item.id,
        text: item.name,
        completed: item.isCompleted,
      }));
      setTodos(formattedTodos);
    });
  }, []);

  const addTodo = (text: string) => {
    if (!text.trim()) return;

    createTodo(text).then((createdTodo) => {
      const newTodo: Todo = {
        id: createdTodo.id,
        text: createdTodo.name,
        completed: createdTodo.completed,
      };
      setTodos((prev) => [...prev, newTodo]);
    });
  };

  const toggleTodo = (id: string) => {
    const target = todos.find((todo) => todo.id === id);
    if (!target) return;

    toggleTodoStatus(id, !target.completed)
      .then((updated) => {
        const updatedTodo = {
          id: updated.id,
          text: updated.content,
          completed: updated.completed,
        };
        // API 즉시 반영
        setTodos((prev) =>
          prev.map((todo) =>
            todo.id === id ? { ...todo, completed: updated.isCompleted } : todo
          )
        );
      })
      .catch((error) => {
        console.error("할 일 상태 토글 실패:", error);
      });
  };

  // 미완료 또는 완료된 todo 각 필터링
  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

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
