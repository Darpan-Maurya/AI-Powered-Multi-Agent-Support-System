import { generateText } from "ai";
import { ollama } from "ai-sdk-ollama";
import { BillingTools } from "@repo/tools";

export async function BillingAgentAI(
  orderId: string,
  conversationContext: string
) {
  const payment = await BillingTools.getPaymentByOrderId(orderId);

  if (!payment) {
    return "I couldn’t find payment details for this order.";
  }

  const result = await generateText({
    model: ollama("llama3"),
    prompt: `
You are a billing support agent.

Conversation context:
${conversationContext}

Payment details (authoritative):
${JSON.stringify(payment)}

Explain the payment or refund status empathetically.
`
  });

  return result.text;
}
