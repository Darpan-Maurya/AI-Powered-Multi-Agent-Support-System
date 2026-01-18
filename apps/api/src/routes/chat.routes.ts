import { Hono } from "hono";
import type { SendMessageInput, SendMessageOutput } from "@repo/rpc";
import { handleChatMessage } from "../services/chat.service";
import { prisma } from "@repo/db/client";

const chat = new Hono();

/**
 * POST /api/chat/messages
 */
chat.post("/messages", async (c) => {
  const body = await c.req.json<SendMessageInput>();
  const { message, conversationId } = body;

  // Mock user (replace with auth later)
  const userId = "user-1";

  const result = await handleChatMessage({
    userId,
    conversationId,
    message
  });

  const response: SendMessageOutput = {
    response: result.response,
    agent: result.agent
  };

  return c.json(response);
});

/**
 * GET /api/chat/conversations
 * List user conversations
 */
chat.get("/conversations", async (c) => {
  const userId = "user-1";

  const conversations = await prisma.conversation.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      createdAt: true
    }
  });

  return c.json(conversations);
});

/**
 * GET /api/chat/conversations/:id
 * Get full conversation history
 */
chat.get("/conversations/:id", async (c) => {
  const id = c.req.param("id");

  const messages = await prisma.message.findMany({
    where: { conversationId: id },
    orderBy: { createdAt: "asc" }
  });

  return c.json({
    conversationId: id,
    messages
  });
});

/**
 * DELETE /api/chat/conversations/:id
 * Delete a conversation
 */
chat.delete("/conversations/:id", async (c) => {
  const id = c.req.param("id");

  // Delete messages first (FK safety)
  await prisma.message.deleteMany({
    where: { conversationId: id }
  });

  await prisma.conversation.delete({
    where: { id }
  });

  return c.json({ success: true });
});

export default chat;
