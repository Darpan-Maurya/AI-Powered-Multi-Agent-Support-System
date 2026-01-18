import { useState } from "react";
import { sendMessageStream } from "../api/chat";
import { Message } from "./Message";

type ChatMessage = {
  role: "user" | "agent";
  content: string;
};

export function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  async function handleSend() {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");

    let agentResponse = "";

    // Placeholder agent message
    setMessages((prev) => [...prev, { role: "agent", content: "" }]);

    await sendMessageStream(
      { message: input },
      (chunk) => {
        agentResponse += chunk;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "agent",
            content: agentResponse
          };
          return updated;
        });
      },
      (statusText) => setStatus(statusText)
    );

    setStatus(null);
  }

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>AI Support Chat</h2>

      <div style={{ minHeight: 300, border: "1px solid #ccc", padding: 16 }}>
        {messages.map((m, i) => (
          <Message key={i} role={m.role} content={m.content} />
        ))}

        {status && (
          <div style={{ fontStyle: "italic", color: "#666" }}>
            🤖 {status}...
          </div>
        )}
      </div>

      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, padding: 8 }}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
