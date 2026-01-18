import { SupportTools } from "@repo/tools";
import { generateText } from "ai";
import { ollama } from "ai-sdk-ollama";

export async function SupportAgentAI(
  conversationId: string,
  userMessage: string
) {
  const history: { role: string; content: string }[] = await SupportTools.getConversationMessages(conversationId);

  const context = history
    .map(m => `${m.role}: ${m.content}`)
    .join("\n");

  const result = await generateText({
    model: ollama("llama3"),
    prompt: `
You are a customer support agent.

Conversation history:
${context}

User message:
${userMessage}

Respond politely and helpfully.
`
  });

  return result.text;
}
