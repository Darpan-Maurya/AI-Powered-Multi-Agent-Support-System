import "dotenv/config";
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors"; 
import chatRoutes from "./routes/chat.routes";
import agentRoutes from "./routes/agent.routes";
import healthRoutes from "./routes/health.routes";
import { errorMiddleware } from "./middleware/error.middleware";
import { rateLimit } from "./middleware/rateLimit.middleware";

const app = new Hono();

app.use("*", cors({
  origin: "http://localhost:5173", // Your frontend URL
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Accept"],
  exposeHeaders: ["X-Agent-Status", "X-Agent-Phase"],
  credentials: true,
}));

app.use("*", errorMiddleware);
app.use("*", rateLimit);

app.route("/api/chat", chatRoutes);
app.route("/api/agents", agentRoutes);
app.route("/api/health", healthRoutes);

// ADD THIS CODE:
const port = parseInt(process.env.PORT || '3000');

console.log(`🚀 Server running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});

export default app;