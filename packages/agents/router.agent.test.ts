import { describe, it, expect } from "vitest";
import { routeMessageAI } from "./router.agent";

describe("Router Agent (AI-based)", () => {
  it("routes order-related queries to Order Agent", async () => {
    const result = await routeMessageAI(
      "Where is my order ORD-1001?"
    );

    expect(result.agent).toBe("order");
    expect(result.confidence).toBeGreaterThan(0.5);
  });

  it("routes billing-related queries to Billing Agent", async () => {
    const result = await routeMessageAI(
      "I was charged twice for my payment"
    );

    expect(result.agent).toBe("billing");
  });

  it("falls back to Support Agent for ambiguous queries", async () => {
    const result = await routeMessageAI(
      "Hi there"
    );

    expect(result.agent).toBe("support");
  });
});
