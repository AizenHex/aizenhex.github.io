import { ThemeToggle } from "@/components/ThemeToggle"
import Link from "next/link"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-[72px] flex items-center backdrop-blur-sm bg-bg/80 border-b border-border">
      <div className="w-full max-w-[1100px] mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-[0.875rem] text-accent hover:text-accent-hover transition-colors duration-150"
          aria-label="Kembali ke halaman utama"
        >
          ~/portfolio
        </Link>

        <nav className="flex items-center gap-6">
          {(["work", "writing", "now", "contact"] as const).map((item) => (
            <Link
              key={item}
              href={item === "now" ? "/now" : `#${item}`}
              className="font-mono text-[0.8125rem] text-ink-muted hover:text-accent transition-colors duration-150 link-underline hidden sm:block"
            >
              {item}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
