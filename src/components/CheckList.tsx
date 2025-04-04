"use client";

import React from "react";
import { Todo } from "../types";

import styles from "./CheckList.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CheckListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  type: "todo" | "done";
  titleIcon: any;
  checkboxIcon: any;
  emptyLargeIcon: any;
  emptySmallIcon: any;
  emptyTitle: string;
  emptySubtitle: string;
}

export default function CheckList({
  todos = [],
  onToggle,
  type,
  titleIcon,
  checkboxIcon,
  emptyLargeIcon,
  emptySmallIcon,
  emptyTitle,
  emptySubtitle,
}: CheckListProps) {
  const router = useRouter();

  const containerClassName =
    type === "todo" ? styles.TodoContainer : styles.DoneContainer;
  const listItemClassName =
    type === "todo" ? styles.checkTodoList : styles.checkDoneList;

  const handleClick = (id: string) => {
    router.push(`/items/${id}`);
  };

  // 체크박스 클릭시 이벤트 버블링 방지, toggle만 수행
  const handleCheckboxClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onToggle(id);
  };

  return (
    <div className={containerClassName}>
      <Image src={titleIcon} alt={type === "todo" ? "할 일" : "완료된 일"} />
      {todos.length === 0 ? (
        <div className={styles.none}>
          <div className={styles.noneImg}>
            <Image
              className={styles.desktopImg}
              src={emptyLargeIcon}
              alt={""}
            />
            <Image className={styles.mobileImg} src={emptySmallIcon} alt={""} />
          </div>
          <p>{emptyTitle}</p>
          <p>{emptySubtitle}</p>
        </div>
      ) : (
        <ul className={styles.checkLists}>
          {todos.map((todo) => (
            <li
              className={listItemClassName}
              key={todo.id}
              onClick={() => handleClick(todo.id)}
            >
              <Image
                className={styles.checkbox}
                src={checkboxIcon}
                alt={""}
                onClick={(e) => handleCheckboxClick(e, todo.id)}
              />
              <span className={type === "done" ? "completed" : ""}>
                {todo.text}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
