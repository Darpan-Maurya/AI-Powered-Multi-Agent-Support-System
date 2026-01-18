import "dotenv/config";


import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  }),
});

async function seed() {
  console.log("🌱 Seeding database with rich dataset...");

  /* -----------------------
     USERS (implicit)
     ----------------------- */
  const users = ["user-1", "user-2", "user-3"];

  /* -----------------------
     ORDERS
     ----------------------- */
  await prisma.order.createMany({
    data: [
      {
        id: "ORD-1001",
        userId: "user-1",
        status: "shipped",
        trackingId: "TRK-123"
      },
      {
        id: "ORD-1002",
        userId: "user-1",
        status: "delivered",
        trackingId: "TRK-456"
      },
      {
        id: "ORD-2001",
        userId: "user-2",
        status: "cancelled"
      },
      {
        id: "ORD-3001",
        userId: "user-3",
        status: "processing"
      }
    ]
  });

  /* -----------------------
     PAYMENTS
     ----------------------- */
  await prisma.payment.createMany({
    data: [
      {
        id: "PAY-1001",
        orderId: "ORD-1001",
        status: "paid",
        amount: 999
      },
      {
        id: "PAY-1002",
        orderId: "ORD-1002",
        status: "paid",
        amount: 1499
      },
      {
        id: "PAY-2001",
        orderId: "ORD-2001",
        status: "refunded",
        amount: 799
      },
      {
        id: "PAY-3001",
        orderId: "ORD-3001",
        status: "failed",
        amount: 1299
      }
    ]
  });

  /* -----------------------
     CONVERSATION: ORDER SUPPORT
     ----------------------- */
  const convoOrder = await prisma.conversation.create({
    data: { userId: "user-1" }
  });

  await prisma.message.createMany({
    data: [
      {
        conversationId: convoOrder.id,
        role: "user",
        content: "Hi, can you check where my order ORD-1001 is?"
      },
      {
        conversationId: convoOrder.id,
        role: "agent",
        content: "Sure, let me check the status of your order.",
        agentType: "order"
      },
      {
        conversationId: convoOrder.id,
        role: "agent",
        content:
          "Your order ORD-1001 has been shipped and is currently in transit.",
        agentType: "order"
      },
      {
        conversationId: convoOrder.id,
        role: "user",
        content: "When is it expected to arrive?"
      },
      {
        conversationId: convoOrder.id,
        role: "agent",
        content:
          "Based on the tracking information, it should arrive within 2 days.",
        agentType: "order"
      }
    ]
  });

  /* -----------------------
     CONVERSATION: BILLING ISSUE
     ----------------------- */
  const convoBilling = await prisma.conversation.create({
    data: { userId: "user-2" }
  });

  await prisma.message.createMany({
    data: [
      {
        conversationId: convoBilling.id,
        role: "user",
        content: "I was charged but my order was cancelled."
      },
      {
        conversationId: convoBilling.id,
        role: "agent",
        content: "Let me review your payment details.",
        agentType: "billing"
      },
      {
        conversationId: convoBilling.id,
        role: "agent",
        content:
          "I see the charge for ORD-2001. A refund has already been processed.",
        agentType: "billing"
      },
      {
        conversationId: convoBilling.id,
        role: "user",
        content: "When will I receive the refund?"
      },
      {
        conversationId: convoBilling.id,
        role: "agent",
        content:
          "Refunds usually take 5–7 business days to reflect in your account.",
        agentType: "billing"
      }
    ]
  });

  /* -----------------------
     CONVERSATION: GENERAL SUPPORT
     ----------------------- */
  const convoSupport = await prisma.conversation.create({
    data: { userId: "user-3" }
  });

  await prisma.message.createMany({
    data: [
      {
        conversationId: convoSupport.id,
        role: "user",
        content: "I am unable to log in to my account."
      },
      {
        conversationId: convoSupport.id,
        role: "agent",
        content:
          "I’m sorry you’re facing this issue. Let me help you troubleshoot.",
        agentType: "support"
      },
      {
        conversationId: convoSupport.id,
        role: "agent",
        content:
          "Have you tried resetting your password using the ‘Forgot Password’ option?",
        agentType: "support"
      },
      {
        conversationId: convoSupport.id,
        role: "user",
        content: "No, I haven’t tried that yet."
      },
      {
        conversationId: convoSupport.id,
        role: "agent",
        content:
          "I’ve sent a password reset link to your registered email address.",
        agentType: "support"
      }
    ]
  });

  console.log("✅ Rich database seed completed successfully");
}

seed()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
