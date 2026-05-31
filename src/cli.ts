import { readFile } from "node:fs/promises";
import { analyze } from "./analyze.js";
import { formatJson, formatSummary } from "./format.js";
import type { ThesisItem } from "./types.js";

const [, , filePath = "fixtures/category-thesis-builder.json", format = "--format", output = "summary"] = process.argv;

if (format !== "--format" || !["summary", "json"].includes(output)) {
  console.error("usage: category-thesis-builder <file> --format <summary|json>");
  process.exit(1);
}

const items = JSON.parse(await readFile(filePath, "utf8")) as ThesisItem[];
const report = analyze(items);

process.stdout.write(output === "json" ? formatJson(report) : formatSummary(report));
