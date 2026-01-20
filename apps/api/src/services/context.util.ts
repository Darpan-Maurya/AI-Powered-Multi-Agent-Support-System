import { generateText } from "ai";
import { ollama } from "ai-sdk-ollama";

export async function compactContext(
  messages: string[],
  keepLast = 6
): Promise<string> {
  if (messages.length <= keepLast) {
    return messages.join("\n");
  }

  const recent = messages.slice(-keepLast).join("\n");
  const old = messages.slice(0, -keepLast).join("\n");

  const summary = await generateText({
    model: ollama("llama3"),
    prompt: `
Summarize the following conversation briefly, preserving intent and facts:

${old}
`
  });

  return `
Conversation summary:
${summary.text}

Recent messages:
${recent}
`;
}
