import { routeMessageAI } from "./router.agent";

async function test() {
  const result = await routeMessageAI(
    "Where is my order ORD-1001?"
  );

  console.log(result);
}

test();
