export declare const BillingTools: {
    getPaymentByOrderId: (orderId: string) => Promise<{
        id: string;
        status: string;
        orderId: string;
        amount: number;
    } | null>;
};
