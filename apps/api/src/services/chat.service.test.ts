import { describe, it, expect } from "vitest";
import { handleChatMessage } from "./chat.service";
import { prisma } from "@repo/db/client";

describe("Chat Service Integration", () => {
  it("processes an order query end-to-end", async () => {
    const result = await handleChatMessage({
      userId: "user-1",
      message: "Where is my order ORD-1001?"
    });

    expect(result.agent).toBe("order");
    expect(result.response.length).toBeGreaterThan(10);

    const messages = await prisma.message.findMany({
      where: { conversationId: result.conversationId }
    });

    expect(messages.length).toBeGreaterThan(1);
  });
});
