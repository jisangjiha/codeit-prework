const baseUrl = "https://assignment-todolist-api.vercel.app";

// 테스트
const tenantId = "test-id-1";

export async function fetchTodos() {
  const res = await fetch(`${baseUrl}/api/${tenantId}/items`);
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
}

export async function createTodo(text: string) {
  if (!text || !text.trim()) {
    throw new Error("Text cannot be empty");
  }

  const payload = { name: text };

  const res = await fetch(`${baseUrl}/api/${tenantId}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to create todo");
  return res.json();
}

export async function toggleTodoStatus(id: string, completed: boolean) {
  const res = await fetch(`${baseUrl}/api/${tenantId}/items/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isCompleted: completed }),
  });

  const result = await res.text(); // 👈 JSON으로 파싱 전에 응답 보기!
  if (!res.ok) {
    console.error("🔴 PATCH 응답 오류:", result);
    throw new Error("Failed to toggle todo status");
  }

  return JSON.parse(result); // 응답이 유효하다면 다시 JSON으로 파싱
}
