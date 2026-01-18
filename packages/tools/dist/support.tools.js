"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportTools = void 0;
const client_1 = require("@repo/db/client");
exports.SupportTools = {
    getConversationMessages: async (conversationId) => {
        return client_1.prisma.message.findMany({
            where: { conversationId },
            orderBy: { createdAt: "asc" }
        });
    }
};
