import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import Link from "next/link"
import { now } from "@/content/now"

export const metadata = {
  title: "Now — Made Reeyza",
  description: "Apa yang sedang saya kerjakan sekarang.",
}

export default function NowPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-[72px]">
        <div className="max-w-[720px] mx-auto px-6 md:px-12 pt-20 pb-32">
          <Link
            href="/"
            className="font-mono text-[0.875rem] text-ink-muted link-underline hover:text-ink transition-colors duration-150 inline-block mb-12"
          >
            ← home
          </Link>

          <p className="font-mono text-[0.875rem] text-accent mb-4" aria-hidden>
            $ cat now.md
          </p>

          <h1 className="font-serif text-[clamp(2rem,5vw,3.5rem)] font-medium text-ink leading-tight tracking-[-0.02em] mb-6">
            Now
          </h1>

          <p className="font-mono text-[0.9375rem] text-ink-muted leading-[1.75] mb-2 max-w-[58ch]">
            Halaman ini terinspirasi dari{" "}
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent link-underline hover:text-accent-hover"
            >
              /now movement
            </a>
            {" "}— apa yang sedang saya fokuskan, diupdate secara berkala.
          </p>
          <p className="font-mono text-[0.8125rem] text-ink-muted border-t border-border pt-4 mt-8 mb-12">
            last updated: {now.updated}
          </p>

          <dl className="space-y-8">
            {now.items.map((item) => (
              <div
                key={item.label}
                className="grid grid-cols-[auto_1fr] gap-x-6 md:gap-x-10 border-b border-border pb-8 last:border-b-0"
              >
                <dt className="font-mono text-[0.8125rem] text-accent shrink-0 w-24 md:w-32 pt-1 uppercase tracking-wider">
                  {item.label}
                </dt>
                <dd className="font-mono text-[0.9375rem] text-ink leading-[1.75]">
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>

          <p className="font-mono text-[0.8125rem] text-ink-muted mt-16">
            // kalau ingin ngobrol tentang salah satu dari ini —{" "}
            <a
              href="mailto:madereeyza@gmail.com"
              className="text-accent link-underline hover:text-accent-hover"
            >
              kirim email
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
