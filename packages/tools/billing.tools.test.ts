import { describe, it, expect } from "vitest";
import { BillingTools } from "./billing.tools";

describe("BillingTools", () => {
  it("fetches payment details for an order", async () => {
    const payment = await BillingTools.getPaymentByOrderId("ORD-1001");

    expect(payment).toBeDefined();
    expect(payment?.status).toBeDefined();
    expect(payment?.amount).toBeGreaterThan(0);
  });
});
