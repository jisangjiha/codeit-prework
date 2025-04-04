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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

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
