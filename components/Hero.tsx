import Link from "next/link"

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-screen flex flex-col justify-center pt-20"
      aria-label="Perkenalan"
    >
      {/* Floating grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 70% 60% at 30% 40%, #000 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 30% 40%, #000 40%, transparent 100%)",
        }}
      />

      <div className="relative max-w-[720px] mx-auto px-6 md:px-12 py-24 md:py-32">
        {/* Boot sequence lines */}
        <div className="mb-7 hero-line" aria-hidden style={{ animationDelay: "200ms" }}>
          <p className="font-mono text-[0.8125rem] text-ink-muted leading-[1.8]">
            <span className="text-ink-muted">Last login: Fri Apr 18 09:42:11 on ttys001</span>
          </p>
          <p className="font-mono text-[0.8125rem] text-ink-muted leading-[1.8]">
            ~ $ <span className="text-ink">ssh reeyza@portfolio.dev</span>
          </p>
          <p className="font-mono text-[0.8125rem] leading-[1.8]">
            <span className="text-accent">✓</span>{" "}
            <span className="text-ink-muted">connected · bali-node-01</span>
          </p>
          <p className="font-mono text-[0.8125rem] leading-[1.8]">
            <span className="text-accent">✓</span>{" "}
            <span className="text-ink-muted">loading profile...</span>
          </p>
          <p className="font-mono text-[0.8125rem] text-ink-muted leading-[1.8]">~ $ whoami</p>
        </div>

        {/* Name — serif only for display */}
        <h1
          className="font-serif text-[clamp(3rem,8vw,6rem)] font-medium text-ink leading-[1.05] tracking-[-0.02em] mb-6 hero-line"
          style={{ animationDelay: "600ms" }}
        >
          Made Reeyza
        </h1>

        {/* Tagline — mono, ink-muted, cursor blink */}
        <p
          className="font-mono text-[clamp(1rem,2.5vw,1.2rem)] text-ink-muted leading-relaxed mb-8 hero-line"
          style={{ animationDelay: "900ms" }}
        >
          Mahasiswa Elektro yang coba membangun hal-hal yang unik.
          <span className="cursor-blink ml-0.5" aria-hidden>_</span>
        </p>

        {/* Intro prose — mono */}
        <p
          className="font-mono text-[0.9375rem] text-ink leading-[1.75] mb-12 max-w-[540px] hero-line"
          style={{ animationDelay: "1100ms" }}
        >
          Mendalami cross-domain Elektro × Machine Learning × IoT —
          membuat sistem yang menghubungkan sensor fisik ke model cerdas,
          dan mencoba menjadikan data yang berantakan menjadi sesuatu yang
          berguna.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-wrap gap-x-8 gap-y-4 hero-line"
          style={{ animationDelay: "1300ms" }}
        >
          <Link
            href="#work"
            className="font-mono text-[0.9375rem] text-accent link-underline hover:text-accent-hover transition-colors duration-150"
          >
            [view work →]
          </Link>
          <Link
            href="#contact"
            className="font-mono text-[0.9375rem] text-accent link-underline hover:text-accent-hover transition-colors duration-150"
          >
            [send message →]
          </Link>
          <Link
            href="/now"
            className="font-mono text-[0.9375rem] text-accent link-underline hover:text-accent-hover transition-colors duration-150"
          >
            [what I&apos;m doing now →]
          </Link>
        </div>
      </div>
    </section>
  )
}
