import { streamText } from "ai";
import { ollama } from "ai-sdk-ollama";
import { handleChatMessage } from "../services/chat.service";

export async function chatController(c: any) {
  const { userId, conversationId, message } = await c.req.json();

  // 🔹 Typing / thinking indicator
  c.header("X-Agent-Status", "Thinking");

  // 🔹 Stream the AI response
  // Await the service first because streamText.prompt expects a string or ModelMessage[]
  c.header("X-Agent-Phase", "Generating response");

  const result = await handleChatMessage({
    userId,
    conversationId,
    message
  });

  return streamText({
    model: ollama("llama3"),
    prompt: result.response
  });
}
