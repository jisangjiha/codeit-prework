"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Todo } from "@/types";

import CheckListDetail from "@/components/CheckListDetail";
import DetailImg from "./DetailImg";
import DetailMemo from "./DetailMemo";

import styles from "./page.module.css";
import Button from "@/components/Button";

export default function Page() {
  const params = useParams();
  const tenantId = (params.id as string) || "test-id-123";
  //const tenantId = params.id as string;

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 파일을 선택하면 진행
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // 파일명 영어 검사
      const isEnglishFilename = /^[a-zA-Z0-9_\-\.]+$/.test(file.name);
      if (!isEnglishFilename) {
        alert("파일명은 영어만 사용 가능합니다.");
        return;
      }

      // 파일 크기 제한
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert("파일 크기는 5MB 이하만 가능합니다.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImageUrl(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleModify = () => {
    if (!currentTodo) return;

    const updatedTodo = {
      ...currentTodo,
      memo: memo,
      imageUrl: imageUrl,
    };

    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      const todos: Todo[] = JSON.parse(storedTodos);
      const updatedTodos = todos.map((t) =>
        t.id === tenantId ? updatedTodo : t
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }

    // 삭제 후 페이지 이동
    window.history.back();
  };

  const handleDelete = () => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      const todos: Todo[] = JSON.parse(storedTodos);
      const updatedTodos = todos.filter((t) => t.id !== tenantId);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));

      // 삭제 후 페이지 이동
      window.history.back();
    }
  };

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
        <DetailImg imageUrl={imageUrl} handleImageUpload={handleImageUpload} />
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
