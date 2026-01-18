import { prisma } from "@repo/db/client";

export const BillingTools = {
  getPaymentByOrderId: async (orderId: string) => {
    return prisma.payment.findFirst({
      where: { orderId }
    });
  }
};
