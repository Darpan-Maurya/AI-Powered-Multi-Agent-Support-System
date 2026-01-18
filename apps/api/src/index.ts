import { Hono } from "hono";
import chatRoutes from "./routes/chat.routes";
import agentRoutes from "./routes/agent.routes";
import healthRoutes from "./routes/health.routes";
import { errorMiddleware } from "./middleware/error.middleware";
import { rateLimit } from "./middleware/rateLimit.middleware";

const app = new Hono();

app.use("*", errorMiddleware);
app.use("*", rateLimit);

app.route("/api/chat", chatRoutes);
app.route("/api/agents", agentRoutes);
app.route("/api/health", healthRoutes);

export default app;
