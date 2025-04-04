import { Todo } from "@/types";
import styles from "./CheckListDetail.module.css";
import Image from "next/image";
import checkboxEmpty from "@/assets/checkbox-empty.svg";
import checkboxFilled from "@/assets/checkbox-filled.svg";

interface CheckListDetailProps {
  activeTodos: Todo[];
  completedTodos: Todo[];
  onToggle: (id: string) => void;
  title: string;
}

export default function CheckListDetail({
  activeTodos = [],
  completedTodos = [],
  onToggle,
  title,
}: CheckListDetailProps) {
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
      <span>{title}</span>
    </div>
  );
}
