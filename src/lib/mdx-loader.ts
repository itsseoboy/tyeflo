import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

/**
 * MDX Content Loader — reads .mdx files from content/ directories.
 * Supports both content/sections/ and content/homepage/ directories.
 *
 * NOTE: We use gray-matter to strip YAML frontmatter, then `marked` to
 * parse the remaining markdown body into HTML. The result is safe to
 * render with `dangerouslySetInnerHTML` because all content is written
 * by us (no user input).
 */

const SECTIONS_DIR = path.join(process.cwd(), "content", "sections");
const HOMEPAGE_DIR = path.join(process.cwd(), "content", "homepage");

// Configure marked once — GFM, breaks for single-newline <br>
marked.setOptions({
  gfm: true,
  breaks: false,
});

export interface SectionData {
  title: string;
  slug: string;
  icon?: string;
  eyebrow?: string;
  /** Raw markdown content (after frontmatter stripped) */
  content: string;
  /** Parsed HTML — safe to render via dangerouslySetInnerHTML */
  html: string;
}

/** Load a section from content/sections/{slug}.mdx */
export function loadSection(slug: string): SectionData | null {
  return loadFromDir(SECTIONS_DIR, slug);
}

/** Load a homepage section from content/homepage/{slug}.mdx */
export function loadHomepageSection(slug: string): SectionData | null {
  return loadFromDir(HOMEPAGE_DIR, slug);
}

/** Load a page from content/pages/{slug}.mdx */
export function loadPage(slug: string): SectionData | null {
  const PAGES_DIR = path.join(process.cwd(), "content", "pages");
  return loadFromDir(PAGES_DIR, slug);
}

function loadFromDir(dir: string, slug: string): SectionData | null {
  const filePath = path.join(dir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  // Parse markdown body → HTML. `marked` is synchronous by default.
  const html = marked.parse(content) as string;

  return {
    title: data.title || slug,
    slug: data.slug || slug,
    icon: data.icon,
    eyebrow: data.eyebrow,
    content,
    html,
  };
}

/** Get all section slugs from content/sections/ */
export function getSectionSlugs(): string[] {
  return getSlugsFromDir(SECTIONS_DIR);
}

/** Get all homepage section slugs from content/homepage/ */
export function getHomepageSectionSlugs(): string[] {
  return getSlugsFromDir(HOMEPAGE_DIR);
}

function getSlugsFromDir(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
