// 할 일 입력하기 창

"use client";

import React, { useState, KeyboardEvent, useEffect } from "react";

import styles from "./TodoInput.module.css";
import Button from "@/components/Button";

interface TodoInputProps {
  onAddTodo: (name: string) => void;
}

export default function TodoInput({ onAddTodo }: TodoInputProps) {
  const [newTodo, setNewTodo] = useState("");

  const onChangeTodoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  // 메인페이지의 onAddTodo prop으로 받아옴
  // 입력값이 빈문자열이나 공백이 아닌 경우 수행
  // 입력값을 props로 받아 전달
  const handleSubmit = () => {
    if (newTodo.trim()) {
      onAddTodo(newTodo.trim());
      setNewTodo("");
    }
  };

  // 입력 창 내 새로운 입력 생기면 hasChanges 상태 변경
  const hasChanges = newTodo.trim() !== "";

  // 엔터 입력으로 추가하기 버튼과 동일한 handleSubmit()
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // isComposing 속성으로 한글 입력 중인지 확인
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.inputBox}
        placeholder="할 일을 입력해주세요"
        value={newTodo}
        onChange={onChangeTodoInput}
        onKeyDown={handleKeyDown}
      />
      <Button
        className={styles.addButton}
        icon="plus"
        buttonContent="추가하기"
        onClickButton={handleSubmit}
        hasChanges={hasChanges}
      />
    </div>
  );
}
