"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderTools = void 0;
const client_1 = require("@repo/db/client");
exports.OrderTools = {
    getOrderById: async (orderId) => {
        return client_1.prisma.order.findUnique({
            where: { id: orderId }
        });
    }
};
