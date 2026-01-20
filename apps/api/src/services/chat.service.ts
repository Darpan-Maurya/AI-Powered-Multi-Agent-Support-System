import { prisma } from "@repo/db/client";
import { routeMessageAI } from "@repo/agents/router.agent";
import {
  SupportAgentAI,
  OrderAgentAI,
  BillingAgentAI
} from "@repo/agents";
import { compactContext } from "./context.util";

/**
 * Core orchestration service for chat
 */
export async function handleChatMessage(params: {
  userId: string;
  conversationId?: string;
  message: string;
}) {
  const { userId, conversationId, message } = params;

  /* -------------------------
     1. Get or create conversation
     ------------------------- */
  const conversation =
    conversationId
      ? await prisma.conversation.findUnique({
          where: { id: conversationId }
        })
      : await prisma.conversation.create({
          data: { userId }
        });

  if (!conversation) {
    throw new Error("Conversation not found");
  }

  /* -------------------------
     2. Persist user message
     ------------------------- */
  await prisma.message.create({
    data: {
      conversationId: conversation.id,
      role: "user",
      content: message
    }
  });

  /* -------------------------
     3. Fetch conversation context
     ------------------------- */
  const messages = await prisma.message.findMany({
    where: { conversationId: conversation.id },
    orderBy: { createdAt: "asc" }
  });

  const rawcontextText = messages.map(
  m => `${m.role}: ${m.content}`
  );
  const contextText = await compactContext(rawcontextText);
  /* -------------------------
     4. Route using AI Router
     ------------------------- */
  const { agent } = await routeMessageAI(message, contextText);

  /* -------------------------
     5. Delegate to sub-agent
     ------------------------- */
  let responseText = "";

  if (agent === "support") {
    responseText = await SupportAgentAI(conversation.id, message);
  }

  if (agent === "order") {
    const orderIdMatch = message.match(/ORD-\d+/i);
    responseText = orderIdMatch
      ? await OrderAgentAI(orderIdMatch[0], contextText)
      : "Please provide your order ID.";
  }

  if (agent === "billing") {
    const orderIdMatch = message.match(/ORD-\d+/i);
    responseText = orderIdMatch
      ? await BillingAgentAI(orderIdMatch[0], contextText)
      : "Please provide your order ID for billing assistance.";
  }

  /* -------------------------
     6. Persist agent response
     ------------------------- */
  await prisma.message.create({
    data: {
      conversationId: conversation.id,
      role: "agent",
      content: responseText,
      agentType: agent
    }
  });

  /* -------------------------
     7. Return response
     ------------------------- */
  return {
    conversationId: conversation.id,
    agent,
    response: responseText
  };
}
