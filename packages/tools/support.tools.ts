import { prisma } from "@repo/db/client";

export const SupportTools = {
  getConversationMessages: async (conversationId: string) => {
    return prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" }
    });
  }
};
