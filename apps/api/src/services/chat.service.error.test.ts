import { describe, it, expect } from "vitest";
import { handleChatMessage } from "./chat.service";

describe("Chat Service Error Handling", () => {
  it("handles missing order ID gracefully", async () => {
    const result = await handleChatMessage({
      userId: "user-1",
      message: "Where is my order?"
    });

    expect(result.agent).toBe("order");
    expect(result.response.toLowerCase()).toContain("order id");
  });
});
