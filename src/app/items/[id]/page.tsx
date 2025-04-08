// 상세 페이지

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
  const [isUploading, setIsUploading] = useState(false);
  const [memo, setMemo] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {}, [imageUrl]);

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

  // initialTodo와 currentTodo 비교하여 hasChanges 상태 변화 > 버튼 컬러 변경
  useEffect(() => {
    if (!currentTodo || !initialTodo) return;

    const isChanged =
      currentTodo.name !== initialTodo.name ||
      currentTodo.isCompleted !== initialTodo.isCompleted ||
      memo !== (currentTodo.memo || "") ||
      imageUrl !== (currentTodo.imageUrl || "");

    setHasChanges(isChanged);
  }, [memo, imageUrl, currentTodo, initialTodo]);

  // 할 일 제목 변경 시 updateTodo 진행
  const handleChangeTitle = (newTitle: string) => {
    if (!currentTodo || newTitle.trim() === "") return;

    updateTodo(todoId, { name: newTitle }).then((updatedData) => {
      setCurrentTodo((prev) => (prev ? { ...prev, ...updatedData } : prev));
    });
  };

  // 할 일 완료/미완료 토글, updateTodo 변경
  const toggleTodo = () => {
    if (!currentTodo) return;

    updateTodo(todoId, { isCompleted: !currentTodo.isCompleted }).then(
      (updatedData) => {
        setCurrentTodo((prev) => (prev ? { ...prev, ...updatedData } : prev));
      }
    );
  };

  // 수정 완료 버튼 시 updateTodo 진행, 페이지 뒤로 가기
  const handleModify = (finalImageUrl?: string) => {
    if (!currentTodo) return;

    // imageUrl이 아직 서버에 업로드 안 된 경우를 걸러내기
    // blob:, data: URL은 브라우저에서만 쓰는 임시 미리보기 URL
    const cleanImageUrl =
      finalImageUrl ??
      (imageUrl.startsWith("blob:") || imageUrl.startsWith("data:")
        ? ""
        : imageUrl);

    const updatedTodo = {
      name: currentTodo.name,
      isCompleted: currentTodo.isCompleted,
      memo: memo,
      imageUrl: cleanImageUrl,
    };

    updateTodo(todoId, updatedTodo).then((updatedData) => {
      setCurrentTodo((prev) => (prev ? { ...prev, ...updatedData } : prev));
      setHasChanges(false);
      router.back();
    });
  };

  // 삭제하기 버튼 시 deleteTodo 진행, 페이지 뒤로 가기
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
        <DetailImg
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          setIsUploading={setIsUploading}
        />
        <DetailMemo memo={memo} onChangeMemo={setMemo} />
      </div>
      <div className={styles.buttonContainer}>
        <Button
          className={styles.modifyButton}
          icon="check"
          buttonContent="수정 완료"
          onClickButton={() => handleModify(imageUrl)}
          hasChanges={hasChanges}
          disabled={isUploading}
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
