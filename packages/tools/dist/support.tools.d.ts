export declare const SupportTools: {
    getConversationMessages: (conversationId: string) => Promise<{
        id: string;
        content: string;
        role: string;
        createdAt: Date;
        conversationId: string;
        agentType: string | null;
    }[]>;
};
