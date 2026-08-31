import fs from "fs";
import path from "path";

/**
 * Read a day's markdown file and return its raw content.
 * SSG-compatible: uses fs.readFileSync at build time.
 */
export function getDayContent(slug: string): string {
  const filePath = path.join(
    process.cwd(),
    "src/content/2-week-intensive",
    `${slug}.md`
  );
  return fs.readFileSync(filePath, "utf-8");
}

/**
 * Return all day slugs sorted (day-01 through day-14).
 */
export function getAllDaySlugs(): string[] {
  const dir = path.join(
    process.cwd(),
    "src/content/2-week-intensive"
  );
  return fs
    .readdirSync(dir)
    .filter((f) => f.startsWith("day-") && f.endsWith(".md"))
    .map((f) => f.replace(".md", ""))
    .sort();
}
