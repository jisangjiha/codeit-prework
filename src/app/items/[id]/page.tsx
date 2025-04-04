"use client";

import CheckListDetail from "@/components/CheckListDetail";
import { useEffect, useState } from "react";

import styles from "./page.module.css";
import imgBackgoround from "@/assets/img.svg";
import fileAdd from "@/assets/fileAdd.svg";
import fileChange from "@/assets/fileChange.svg";
import Image from "next/image";
import Button from "@/components/Button";
import { Todo } from "@/types";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const tenantId = params.id as string;

  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [memo, setMemo] = useState("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      const todos: Todo[] = JSON.parse(storedTodos);
      const todo = todos.find((t) => t.id === tenantId);
      if (todo) {
        setCurrentTodo(todo);
      }
    }
  }, [tenantId]);

  const toggleTodo = () => {
    if (!currentTodo) return;

    // 현재 Todo의 완료 상태 토글
    const updatedTodo = {
      ...currentTodo,
      completed: !currentTodo.completed,
    };
    setCurrentTodo(updatedTodo);

    // 로컬스토리지의 todos도 업데이트
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      const todos: Todo[] = JSON.parse(storedTodos);
      const updatedTodos = todos.map((t) =>
        t.id === tenantId ? updatedTodo : t
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
  };

  const handleModify = () => {};
  const handleDelete = () => {};

  const todos = currentTodo ? [currentTodo] : [];
  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className={styles.container}>
      <CheckListDetail
        activeTodos={activeTodos}
        completedTodos={completedTodos}
        onToggle={() => toggleTodo()}
        title={currentTodo?.text || "Todo 상세"}
      />
      <div className={styles.formContainer}>
        <div className={styles.imageContainer}>
          {imageUrl || <Image src={imgBackgoround} alt={""} />}
          <label htmlFor="todoImage" className={styles.fileButton}>
            {imageUrl ? (
              <Image src={fileChange} alt={""} />
            ) : (
              <Image src={fileAdd} alt={""} />
            )}
          </label>
          <input id="todoImage" type="file" accept="image/*" />
        </div>
        <div className={styles.memoContainer}>
          <label htmlFor="todoMemo">Memo</label>
          <textarea
            id="todoMemo"
            className={styles.textarea}
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="메모를 입력하세요"
          />
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          className={styles.modifyButton}
          buttonContent="수정 완료"
          onClickButton={handleModify}
        />
        <Button
          className={styles.deleteButton}
          buttonContent="삭제하기"
          onClickButton={handleDelete}
        />
      </div>
    </div>
  );
}
