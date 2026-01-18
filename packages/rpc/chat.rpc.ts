/* ============================================================
   CHAT RPC CONTRACT
   Single source of truth for:
   - Requests
   - Responses
   - Streaming events
   - Agent metadata
   ============================================================ */

/* =======================
   COMMON TYPES
   ======================= */

export type UUID = string
export type Timestamp = string

/* =======================
   AGENTS
   ======================= */

export type AgentType = 'support' | 'order' | 'billing'

export type AgentCapabilitiesResponse = {
  agent: AgentType
  capabilities: string[]
}

/* =======================
   CHAT MESSAGE (STREAMING)
   ======================= */

/**
 * POST /api/chat/messages
 */
export type SendMessageRequest = {
  conversationId: UUID | null
  message: string
}

/**
 * Streaming response events
 */
export type ChatStreamEvent =
  | {
      type: 'typing'
    }
  | {
      type: 'chunk'
      content: string
    }
  | {
      type: 'done'
      content: string
    }

/* =======================
   CONVERSATIONS
   ======================= */

/**
 * GET /api/chat/conversations
 */
export type ConversationSummary = {
  id: UUID
  createdAt: Timestamp
}

/**
 * GET /api/chat/conversations/:id
 */
export type ConversationMessage = {
  role: 'user' | 'agent'
  content: string
  agentType?: AgentType
}

export type ConversationDetailResponse = {
  id: UUID
  messages: ConversationMessage[]
}

/**
 * DELETE /api/chat/conversations/:id
 */
export type DeleteConversationResponse = {
  success: boolean
}

/* =======================
   AGENT LIST
   ======================= */

/**
 * GET /api/agents
 */
export type AgentListResponse = AgentType[]

/* =======================
   HEALTH
   ======================= */

/**
 * GET /api/health
 */
export type HealthResponse = {
  status: 'ok'
}

export type SendMessageInput = {
  conversationId?: string;
  message: string;
};

export type SendMessageOutput = {
  response: string;
  agent: "support" | "order" | "billing";
};

