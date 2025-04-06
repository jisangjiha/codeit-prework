// 디테일 페이지에서의 할 일 목록 (타이틀)

import { Todo } from "@/types";
import styles from "./CheckListDetail.module.css";
import Image from "next/image";
import checkboxEmpty from "@/assets/checkbox-empty.svg";
import checkboxFilled from "@/assets/checkbox-filled.svg";
import { useEffect, useState } from "react";

interface CheckListDetailProps {
  activeTodos: Todo[];
  completedTodos: Todo[];
  onToggle: (id: string) => void;
  title: string;
  onTitleChange?: (newTitle: string) => void;
}

export default function CheckListDetail({
  activeTodos = [],
  completedTodos = [],
  onToggle,
  title,
  onTitleChange,
}: CheckListDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  useEffect(() => {
    setNewTitle(title);
  }, [title]);

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  // 입력창에 내용 입력할 때마다 newTitle 상태 실시간 업데이트
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  // 사용자가 input 포커스를 벗어났을 때 타이틀 수정 종료
  // 내용 바뀌었으면 변경사항 onTitleChange(newTitle)
  const handleTitleBlur = () => {
    setIsEditing(false);
    if (onTitleChange && newTitle !== title) {
      onTitleChange(newTitle);
    }
  };

  const handleCheckboxClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onToggle(id);
  };

  // 할 일 목록 불러올 때, checkbox icon 알맞는거 불러오기
  const renderActiveTodos = () => {
    return activeTodos.map((todo) => (
      <div key={todo.id}>
        <Image
          src={checkboxEmpty}
          alt="미완료"
          onClick={(e) => handleCheckboxClick(e, todo.id)}
        />
      </div>
    ));
  };

  const renderCompletedTodos = () => {
    return completedTodos.map((todo) => (
      <div key={todo.id}>
        <Image
          src={checkboxFilled}
          alt="완료됨"
          onClick={(e) => handleCheckboxClick(e, todo.id)}
        />
      </div>
    ));
  };

  // TODO/DONE 항목에 따라 박스 컬러 변경
  const hasCompletedTodos = completedTodos.length > 0;

  return (
    <div
      className={
        hasCompletedTodos
          ? styles.detailContainerCompleted
          : styles.detailContainer
      }
    >
      {renderActiveTodos()}
      {renderCompletedTodos()}
      {isEditing ? (
        <input
          className={styles.inputTodoTitle}
          value={newTitle}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          autoFocus
        />
      ) : (
        <span onClick={handleTitleClick}>{title}</span>
      )}
    </div>
  );
}
