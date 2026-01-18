export declare const OrderTools: {
    getOrderById: (orderId: string) => Promise<{
        id: string;
        status: string;
        userId: string;
        trackingId: string | null;
    } | null>;
};
