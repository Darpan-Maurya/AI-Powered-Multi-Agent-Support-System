import type { SendMessageInput } from "@repo/rpc";

export async function sendMessageStream(
  input: SendMessageInput,
  onChunk: (chunk: string) => void,
  onStatus: (status: string) => void
) {
  const res = await fetch("http://localhost:3000/api/chat/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  });

  // 🔹 Typing / thinking indicator
  const status = res.headers.get("X-Agent-Status");
  if (status) onStatus(status);

  // 🔹 Streaming response
  const reader = res.body?.getReader();
  const decoder = new TextDecoder();

  if (!reader) return;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    onChunk(decoder.decode(value));
  }
}
