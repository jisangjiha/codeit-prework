"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Todo } from "@/types";

import CheckListDetail from "@/components/CheckListDetail";
import DetailImg from "./DetailImg";
import DetailMemo from "./DetailMemo";
import Button from "@/components/Button";

import styles from "./page.module.css";
import { fetchTodoById, toggleTodoStatus, updateTodo, deleteTodo } from "@/api";

export default function Page() {
  const { id } = useParams();
  const todoId = id as string;
  const router = useRouter();

  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [memo, setMemo] = useState("");

  useEffect(() => {
    if (!todoId) return;

    fetchTodoById(todoId).then((foundTodo) => {
      if (foundTodo) {
        setCurrentTodo(foundTodo);
        setMemo(foundTodo.memo || "");
        setImageUrl(foundTodo.imageUrl || "");
      }
    });
  }, [todoId]);

  const toggleTodo = () => {
    if (!currentTodo) return;

    const updatedTodo = {
      ...currentTodo,
      isCompleted: !currentTodo.isCompleted,
    };

    toggleTodoStatus(todoId, !currentTodo.isCompleted)
      .then((updatedData) => {
        setCurrentTodo((prev) => (prev ? { ...prev, ...updatedData } : prev));
      })
      .catch((error) => {
        console.error("토글 오류:", error);
      });
  };

  const handleModify = () => {
    if (!currentTodo) return;

    const updatedTodo = { ...currentTodo, memo, imageUrl };

    updateTodo(todoId, updatedTodo).then((updatedData) => {
      setCurrentTodo((prev) => (prev ? { ...prev, ...updatedData } : prev));
      router.back();
    });
  };

  const handleDelete = () => {
    if (!id) return;

    deleteTodo(todoId).then(() => router.back());
  };

  return (
    <div className={styles.container}>
      <CheckListDetail
        activeTodos={
          currentTodo && !currentTodo.isCompleted ? [currentTodo] : []
        }
        completedTodos={
          currentTodo && currentTodo.isCompleted ? [currentTodo] : []
        }
        onToggle={toggleTodo}
        title={currentTodo?.name || "Todo 상세"}
      />
      <div className={styles.formContainer}>
        <DetailImg imageUrl={imageUrl} setImageUrl={setImageUrl} />
        <DetailMemo memo={memo} onChangeMemo={setMemo} />
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
