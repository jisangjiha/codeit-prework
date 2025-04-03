"use client";

import React from "react";
import { Todo } from "@/types";
import CheckList from "@/components/CheckList";

import todo from "@/assets/todo.svg";
import done from "@/assets/done.svg";
import checkboxEmpty from "@/assets/checkbox-empty.svg";
import checkboxFilled from "@/assets/checkbox-filled.svg";
import noneTodoLarge from "@/assets/none-todo-large.svg";
import noneTodoSmall from "@/assets/none-todo-small.svg";
import noneDoneLarge from "@/assets/none-done-large.svg";
import noneDoneSmall from "@/assets/none-done-small.svg";

interface ListsProps {
  activeTodos: Todo[];
  completedTodos: Todo[];
  onToggle: (id: string) => void;
}

export default function Lists({
  activeTodos,
  completedTodos,
  onToggle,
}: ListsProps) {
  return (
    <>
      <CheckList
        todos={activeTodos}
        onToggle={onToggle}
        type="todo"
        titleIcon={todo}
        checkboxIcon={checkboxEmpty}
        emptyLargeIcon={noneTodoLarge}
        emptySmallIcon={noneTodoSmall}
        emptyTitle="할 일이 없어요."
        emptySubtitle="TODO를 새롭게 추가해주세요!"
      />
      <CheckList
        todos={completedTodos}
        onToggle={onToggle}
        type="done"
        titleIcon={done}
        checkboxIcon={checkboxFilled}
        emptyLargeIcon={noneDoneLarge}
        emptySmallIcon={noneDoneSmall}
        emptyTitle="아직 다 한 일이 없어요."
        emptySubtitle="해야 할 일을 체크해보세요!"
      />
    </>
  );
}
