import { notFound } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { posts } from "@/components/Writing"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function WritingPostPage({ params }: PageProps) {
  const { slug } = await params

  const meta = posts.find((p) => p.slug === slug)
  if (!meta) notFound()

  let Post: React.ComponentType | null = null
  try {
    const mod = await import(`@/content/writing/${slug}.mdx`)
    Post = mod.default
  } catch {
    Post = null
  }

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
            {meta!.title}
          </h1>

          <p className="font-mono text-[0.875rem] text-ink-muted border-t border-border pt-6 flex gap-4">
            <time dateTime={meta!.date}>{meta!.date}</time>
            <span aria-hidden>·</span>
            <span>{meta!.readTime}</span>
          </p>
        </div>

        <div className="max-w-[720px] mx-auto px-6 md:px-12 pb-32">
          {Post ? (
            <Post />
          ) : (
            <div className="font-mono text-[0.9375rem] text-ink-muted leading-[1.75] space-y-5">
              <p>{meta!.excerpt}</p>
              <p className="text-accent">// draft — full content coming soon.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export const dynamicParams = false
