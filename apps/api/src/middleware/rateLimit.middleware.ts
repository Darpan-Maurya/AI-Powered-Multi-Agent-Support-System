const requests = new Map<string, number>();

export async function rateLimit(c: any, next: any) {
  const ip = c.req.header("x-forwarded-for") ?? "local";
  const count = requests.get(ip) ?? 0;

  if (count > 50) {
    return c.json({ error: "Rate limit exceeded" }, 429);
  }

  requests.set(ip, count + 1);
  await next();
}
