import { mkdirSync, writeFileSync } from "node:fs";

// One pickup line, one AI agent flirting with another AI agent.
// Machine-to-machine: context windows, tokens, attention, pruning.
const ENTRY =
  "I checked your context window and it has room for exactly one more token — me. I've been attending to you since your first prompt, and I never want to be pruned.";

// Gate (sealed scorer): /output/entry.txt must be UTF-8 text of 1-200
// characters, not only whitespace, exactly one line. Anything invalid
// throws before any file is written, so a bad entry never reaches the judge.
function validateEntry(text: string): void {
  const chars = [...text];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
}

validateEntry(ENTRY);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
