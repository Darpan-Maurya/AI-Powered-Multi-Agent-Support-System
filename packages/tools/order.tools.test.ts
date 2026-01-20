import { describe, it, expect } from "vitest";
import { OrderTools } from "./order.tools";

describe("OrderTools", () => {
  it("fetches existing order correctly", async () => {
    const order = await OrderTools.getOrderById("ORD-1001");

    expect(order).toBeDefined();
    expect(order?.id).toBe("ORD-1001");
    expect(order?.status).toBeDefined();
  });

  it("returns null for non-existent order", async () => {
    const order = await OrderTools.getOrderById("ORD-9999");
    expect(order).toBeNull();
  });
});
