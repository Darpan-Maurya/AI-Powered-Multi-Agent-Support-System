import { Hono } from "hono";
import { chatController } from "../controllers/chat.controller";
import { prisma } from "@repo/db/client";

const chat = new Hono();

chat.post("/messages", async (c) => {
  const result = await chatController(c as any);
  return result.toTextStreamResponse(); 
});

chat.get("/conversations", async (c) => {
  const userId = "user-1";
  const conversations = await prisma.conversation.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: { id: true, createdAt: true }
  });
  return c.json(conversations);
});

chat.get("/conversations/:id", async (c) => {
  const id = c.req.param("id");
  const messages = await prisma.message.findMany({
    where: { conversationId: id },
    orderBy: { createdAt: "asc" }
  });
  return c.json({ conversationId: id, messages });
});

chat.delete("/conversations/:id", async (c) => {
  const id = c.req.param("id");
  await prisma.message.deleteMany({ where: { conversationId: id } });
  await prisma.conversation.delete({ where: { id } });
  return c.json({ success: true });
});

export default chat;
