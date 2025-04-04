import { Todo } from "@/types";

const baseUrl = "https://assignment-todolist-api.vercel.app";
const tenantId = "test-id-1";

// 전체 혹은 특정 Todo 가져오기
export const fetchTodos = (id?: string) => {
  const url = id
    ? `${baseUrl}/api/${tenantId}/items/${id}`
    : `${baseUrl}/api/${tenantId}/items`;

  return fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch todos");
    return res.json();
  });
};

// Todo 생성
export const createTodo = (name: string) => {
  const payload = { name };

  return fetch(`${baseUrl}/api/${tenantId}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to create todo");
    return res.json();
  });
};

// Todo 업데이트
export const updateTodo = (id: string, updatedTodo: Partial<Todo>) => {
  return fetch(`${baseUrl}/api/${tenantId}/items/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTodo),
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to update todo");
    return res.json();
  });
};

// Todo 삭제
export const deleteTodo = (id: string) => {
  return fetch(`${baseUrl}/api/${tenantId}/items/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) throw new Error("삭제 실패");
    return res.json();
  });
};
