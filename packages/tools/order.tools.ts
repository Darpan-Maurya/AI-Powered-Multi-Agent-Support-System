import { prisma } from "@repo/db/client";

export const OrderTools = {
  getOrderById: async (orderId: string) => {
    return prisma.order.findUnique({
      where: { id: orderId }
    });
  }
};
