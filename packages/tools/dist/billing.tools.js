"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingTools = void 0;
const client_1 = require("@repo/db/client");
exports.BillingTools = {
    getPaymentByOrderId: async (orderId) => {
        return client_1.prisma.payment.findFirst({
            where: { orderId }
        });
    }
};
