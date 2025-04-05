"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Todo } from "@/types";

import CheckListDetail from "@/components/CheckListDetail";
import DetailImg from "./DetailImg";
import DetailMemo from "./DetailMemo";
import Button from "@/components/Button";

import styles from "./page.module.css";

import { fetchTodos, updateTodo, deleteTodo } from "@/api";

export default function Page() {
  const { id } = useParams();
  const todoId = id as string;
  const router = useRouter();

  const [initialTodo, setInitialTodo] = useState<Todo | null>(null);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [memo, setMemo] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (!todoId) return;

    fetchTodos(todoId).then((foundTodo) => {
      if (foundTodo) {
        setInitialTodo(foundTodo);
        setCurrentTodo(foundTodo);
        setMemo(foundTodo.memo || "");
        setImageUrl(foundTodo.imageUrl || "");
        setHasChanges(false);
      }
    });
  }, [todoId]);

  useEffect(() => {
    if (!currentTodo || !initialTodo) return;

    const isChanged =
      currentTodo.name !== initialTodo.name ||
      currentTodo.isCompleted !== initialTodo.isCompleted ||
      memo !== (currentTodo.memo || "") ||
      imageUrl !== (currentTodo.imageUrl || "");

    setHasChanges(isChanged);
  }, [memo, imageUrl, currentTodo, initialTodo]);

  const handleChangeTitle = (newTitle: string) => {
    if (!currentTodo || newTitle.trim() === "") return;

    updateTodo(todoId, { name: newTitle }).then((updatedData) => {
      setCurrentTodo((prev) => (prev ? { ...prev, ...updatedData } : prev));
    });
  };

  const toggleTodo = () => {
    if (!currentTodo) return;

    updateTodo(todoId, { isCompleted: !currentTodo.isCompleted }).then(
      (updatedData) => {
        setCurrentTodo((prev) => (prev ? { ...prev, ...updatedData } : prev));
      }
    );
  };

  const handleModify = () => {
    if (!currentTodo) return;

    const updatedTodo = {
      name: currentTodo.name,
      isCompleted: currentTodo.isCompleted,
      memo: memo,
      // imageUrl을 서버가 받을 수 있는 형식으로 가공
      imageUrl: imageUrl.startsWith("data:") ? "" : imageUrl,
    };

    updateTodo(todoId, updatedTodo).then((updatedData) => {
      setCurrentTodo((prev) => (prev ? { ...prev, ...updatedData } : prev));
      setHasChanges(false);
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
        onTitleChange={handleChangeTitle}
      />
      <div className={styles.formContainer}>
        <DetailImg imageUrl={imageUrl} setImageUrl={setImageUrl} />
        <DetailMemo memo={memo} onChangeMemo={setMemo} />
      </div>
      <div className={styles.buttonContainer}>
        <Button
          className={styles.modifyButton}
          icon="check"
          buttonContent="수정 완료"
          onClickButton={handleModify}
          hasChanges={hasChanges}
        />
        <Button
          className={styles.deleteButton}
          icon="x"
          buttonContent="삭제하기"
          onClickButton={handleDelete}
        />
      </div>
    </div>
  );
}
