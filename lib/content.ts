import fs from "fs"
import path from "path"

// ── Types ──────────────────────────────────────────────────────────────────

export interface WorkMeta {
  slug: string
  title: string
  description: string
  category: string
  year: string
  color?: string
}

export interface WritingMeta {
  slug: string
  date: string
  title: string
  excerpt: string
  readTime: string
}

// ── Helpers ────────────────────────────────────────────────────────────────

function requireField<T>(
  obj: Record<string, unknown>,
  field: string,
  file: string
): T {
  if (obj[field] === undefined || obj[field] === null || obj[field] === "") {
    throw new Error(
      `[content] Missing required field "${field}" in ${file}. Fix before building.`
    )
  }
  return obj[field] as T
}

/**
 * Extract `export const metadata = { ... }` from an MDX file by evaluating
 * the JS object literal. Handles multi-line objects by tracking brace depth.
 */
function parseMetadata(filePath: string): Record<string, unknown> {
  const src = fs.readFileSync(filePath, "utf8")
  const startIndex = src.indexOf("export const metadata")
  if (startIndex === -1) {
    throw new Error(`[content] No metadata export found in ${filePath}`)
  }
  const braceStart = src.indexOf("{", startIndex)
  if (braceStart === -1) {
    throw new Error(`[content] Malformed metadata in ${filePath}`)
  }
  // Walk forward tracking brace depth to find the closing brace
  let depth = 0
  let braceEnd = -1
  for (let i = braceStart; i < src.length; i++) {
    if (src[i] === "{") depth++
    else if (src[i] === "}") {
      depth--
      if (depth === 0) {
        braceEnd = i
        break
      }
    }
  }
  if (braceEnd === -1) {
    throw new Error(`[content] Unclosed metadata object in ${filePath}`)
  }
  const objSrc = src.slice(braceStart, braceEnd + 1)
  // Use Function constructor to evaluate the object literal.
  // eslint-disable-next-line no-new-func
  const obj = new Function(`return (${objSrc})`)() as Record<string, unknown>
  return obj
}

// ── Work ───────────────────────────────────────────────────────────────────

const workDir = path.join(process.cwd(), "content/work")

export function getAllWork(): WorkMeta[] {
  const files = fs.readdirSync(workDir).filter((f) => f.endsWith(".mdx"))

  const items: WorkMeta[] = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "")
    const meta = parseMetadata(path.join(workDir, file))

    return {
      slug,
      title: requireField<string>(meta, "title", file),
      description: requireField<string>(meta, "description", file),
      category: requireField<string>(meta, "category", file),
      year: requireField<string>(meta, "year", file),
      color: meta.color as string | undefined,
    }
  })

  return items.sort((a, b) => Number(b.year) - Number(a.year))
}

export async function getWorkBySlug(
  slug: string
): Promise<{ metadata: WorkMeta; default: React.ComponentType }> {
  const mod = await import(`@/content/work/${slug}.mdx`)
  const rawMeta = mod.metadata as Record<string, unknown>

  const metadata: WorkMeta = {
    slug,
    title: requireField<string>(rawMeta, "title", `${slug}.mdx`),
    description: requireField<string>(rawMeta, "description", `${slug}.mdx`),
    category: requireField<string>(rawMeta, "category", `${slug}.mdx`),
    year: requireField<string>(rawMeta, "year", `${slug}.mdx`),
    color: rawMeta.color as string | undefined,
  }

  return { metadata, default: mod.default }
}

// ── Writing ────────────────────────────────────────────────────────────────

const writingDir = path.join(process.cwd(), "content/writing")

export function getAllWriting(): WritingMeta[] {
  const files = fs.readdirSync(writingDir).filter((f) => f.endsWith(".mdx"))

  const items: WritingMeta[] = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "")
    const meta = parseMetadata(path.join(writingDir, file))

    return {
      slug,
      date: requireField<string>(meta, "date", file),
      title: requireField<string>(meta, "title", file),
      excerpt: requireField<string>(meta, "excerpt", file),
      readTime: requireField<string>(meta, "readTime", file),
    }
  })

  // Compare "YYYY-MM" strings — lexicographic sort works correctly
  return items.sort((a, b) => b.date.localeCompare(a.date))
}

export async function getWritingBySlug(
  slug: string
): Promise<{ metadata: WritingMeta; default: React.ComponentType }> {
  const mod = await import(`@/content/writing/${slug}.mdx`)
  const rawMeta = mod.metadata as Record<string, unknown>

  const metadata: WritingMeta = {
    slug,
    date: requireField<string>(rawMeta, "date", `${slug}.mdx`),
    title: requireField<string>(rawMeta, "title", `${slug}.mdx`),
    excerpt: requireField<string>(rawMeta, "excerpt", `${slug}.mdx`),
    readTime: requireField<string>(rawMeta, "readTime", `${slug}.mdx`),
  }

  return { metadata, default: mod.default }
}
