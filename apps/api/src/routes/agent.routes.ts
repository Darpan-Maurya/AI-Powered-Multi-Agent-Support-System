import { Hono } from "hono";

const agents = new Hono();

agents.get("/", (c) =>
  c.json(["support", "order", "billing"])
);

agents.get("/:type/capabilities", (c) => {
  const type = c.req.param("type");

  const capabilities: Record<string, string[]> = {
    support: ["FAQs", "Troubleshooting"],
    order: ["Order status", "Tracking", "Cancellation"],
    billing: ["Payments", "Refunds", "Invoices"]
  };

  return c.json({
    agent: type,
    capabilities: capabilities[type] ?? []
  });
});

export default agents;
