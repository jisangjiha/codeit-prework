"use client";

import { useState } from "react";
import TodoInput from "./mainpage/TodoInput";
import Lists from "./mainpage/Lists";
import { Todo } from "@/types";

import styles from "./page.module.css";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // todo 새로 추가 > setTodos
  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos([...todos, newTodo]);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  // todo completed 토글
  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);

    localStorage.setItem("todos", JSON.stringify(updatedTodos));
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
