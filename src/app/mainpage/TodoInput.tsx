"use client";

import React, { useState, KeyboardEvent } from "react";

import styles from "./TodoInput.module.css";
import plus from "@/assets/plus.svg";
import Image from "next/image";

interface TodoInputProps {
  onAddTodo: (name: string) => void;
}

export default function TodoInput({ onAddTodo }: TodoInputProps) {
  const [newTodo, setNewTodo] = useState("");

  const onChangeTodoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  // 입력값이 빈문자열이나 공백이 아닌 경우 수행
  // 입력값을 props로 받아 전달
  const handleSubmit = () => {
    if (newTodo.trim()) {
      onAddTodo(newTodo.trim());
      setNewTodo("");
    }
  };

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
      <button
        className={styles.addButton}
        //className={todos?.length ? styles.addButton : styles.coloredAddButton}
        type="button"
        onClick={handleSubmit}
      >
        <div className={styles.inlineButton}>
          <Image src={plus} alt={""} />
          <div>추가하기</div>
        </div>
      </button>
    </div>
  );
}
