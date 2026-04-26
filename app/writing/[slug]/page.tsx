import { notFound } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { getWritingBySlug } from "@/lib/content"
import fs from "fs"
import path from "path"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function WritingPostPage({ params }: PageProps) {
  const { slug } = await params

  let result: Awaited<ReturnType<typeof getWritingBySlug>>

  try {
    result = await getWritingBySlug(slug)
  } catch {
    notFound()
  }

  const { metadata, default: Post } = result!

  return (
    <>
      <Header />
      <main id="main-content" className="pt-[72px]">
        <div className="max-w-[720px] mx-auto px-6 md:px-12 pt-20 pb-16">
          <Link
            href="/writing"
            className="font-mono text-[0.875rem] text-ink-muted link-underline hover:text-ink transition-colors duration-150 inline-block mb-12"
          >
            ← all writing
          </Link>

          <p className="font-mono text-[0.875rem] text-accent mb-4" aria-hidden>
            $ cat {slug}.md
          </p>

          <h1 className="font-serif text-[clamp(2rem,5vw,3.25rem)] font-medium text-ink leading-tight tracking-[-0.02em] mb-6">
            {metadata.title}
          </h1>

          <p className="font-mono text-[0.875rem] text-ink-muted border-t border-border pt-6 flex gap-4">
            <time dateTime={metadata.date}>{metadata.date}</time>
            <span aria-hidden>·</span>
            <span>{metadata.readTime}</span>
          </p>
        </div>

        <div className="max-w-[720px] mx-auto px-6 md:px-12 pb-32">
          <Post />
        </div>
      </main>
      <Footer />
    </>
  )
}

export function generateStaticParams() {
  const writingDir = path.join(process.cwd(), "content/writing")
  const files = fs.readdirSync(writingDir).filter((f) => f.endsWith(".mdx"))
  return files.map((f) => ({ slug: f.replace(/\.mdx$/, "") }))
}

export const dynamicParams = false
