import { notFound } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import fs from "fs"
import path from "path"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params

  let Post!: React.ComponentType
  let metadata: { title?: string; description?: string; category?: string; year?: string } = {}

  try {
    const mod = await import(`@/content/work/${slug}.mdx`)
    Post = mod.default
    metadata = mod.metadata ?? {}
  } catch {
    notFound()
  }

  return (
    <>
      <Header />
      <main id="main-content" className="pt-[72px]">
        {/* Case study header */}
        <div className="max-w-[720px] mx-auto px-6 md:px-12 pt-20 pb-16">
          <Link
            href="/#work"
            className="font-mono text-[0.875rem] text-ink-muted link-underline hover:text-ink transition-colors duration-150 inline-block mb-12"
          >
            ← back to work
          </Link>

          {metadata.category && (
            <p className="font-mono text-[0.875rem] text-accent mb-4" aria-hidden>
              $ cat {metadata.category}/{slug}.md
            </p>
          )}

          {metadata.title && (
            <h1 className="font-serif text-[clamp(2rem,5vw,3.5rem)] font-medium text-ink leading-tight tracking-[-0.02em] mb-6">
              {metadata.title}
            </h1>
          )}

          {metadata.description && (
            <p className="font-serif text-[1.125rem] text-ink-muted leading-[1.7] mb-8">
              {metadata.description}
            </p>
          )}

          {metadata.year && (
            <p className="font-mono text-[0.875rem] text-ink-muted border-t border-border pt-6">
              {metadata.year}
            </p>
          )}
        </div>

        {/* MDX content */}
        <div className="max-w-[720px] mx-auto px-6 md:px-12 pb-32">
          <Post />
        </div>
      </main>
      <Footer />
    </>
  )
}

export function generateStaticParams() {
  const workDir = path.join(process.cwd(), "content/work")
  const files = fs.readdirSync(workDir).filter((f) => f.endsWith(".mdx"))
  return files.map((f) => ({ slug: f.replace(/\.mdx$/, "") }))
}

export const dynamicParams = false
