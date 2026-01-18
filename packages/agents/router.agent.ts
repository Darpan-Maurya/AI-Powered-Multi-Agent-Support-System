import { generateObject } from "ai";
import { ollama } from "ai-sdk-ollama";
import { z } from "zod";

export type AgentType = "support" | "order" | "billing";

const RoutingSchema = z.object({
  agent: z.enum(["support", "order", "billing"]),
  confidence: z.number().min(0).max(1)
});

export async function routeMessageAI(
  message: string,
  contextSummary?: string
) {
  const result = await generateObject({
    model: ollama("llama3"),
    schema: RoutingSchema,
    prompt: `
You are a router agent in a customer support system.

Choose the best agent:
- support
- order
- billing

User message:
"${message}"

Conversation context:
"${contextSummary ?? "None"}"
`
  });

  return result.object;
}
