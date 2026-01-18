import { generateText } from "ai";
import { ollama } from "ai-sdk-ollama";
import { OrderTools } from "@repo/tools";

export async function OrderAgentAI(
  orderId: string,
  conversationContext: string
) {
  const order = await OrderTools.getOrderById(orderId);

  if (!order) {
    return "I couldn’t find that order. Please check the order ID.";
  }

  const result = await generateText({
    model: ollama("llama3"),
    prompt: `
You are an order support agent.

Conversation context:
${conversationContext}

Order details (authoritative):
${JSON.stringify(order)}

Explain the order status clearly.
`
  });

  return result.text;
}
