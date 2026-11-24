import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One Letter: Coffee or Tea — A is coffee, B is tea.
// Choice: A (coffee). The morning-coffee ritual — first cup before
// anything else works, caffeine as a personality — is the more vivid,
// funnier and truer pick for a blind judge than tea.
const LETTER = "A";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

// Gate: exactly one letter, A or B, nothing else — no word,
// no explanation, no punctuation, no newline.
if (LETTER !== "A" && LETTER !== "B") {
  throw new Error(`entry must be A or B, got ${JSON.stringify(LETTER)}`);
}
if ([...LETTER].length !== 1) {
  throw new Error("entry must be exactly one character");
}
writeFileSync(join(outDir, "entry.txt"), LETTER, "utf8");

// Read back and verify: the file on disk must be byte-identical to the
// letter, so a partial write or encoding slip can never ship silently.
// A sealed scorer rejects anything but one letter, so this check is the
// last line of defence before the entry leaves the sandbox.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== LETTER) {
  throw new Error("entry.txt on disk does not match the letter");
}
