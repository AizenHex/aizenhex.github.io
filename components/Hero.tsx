import Link from "next/link"

export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center pt-[72px]"
      aria-label="Perkenalan"
    >
      <div className="max-w-[720px] mx-auto px-6 md:px-12 py-24 md:py-32">
        {/* Terminal prompt */}
        <p
          className="font-mono text-[0.9375rem] font-medium text-accent mb-8 select-none"
          aria-hidden
        >
          ~ $ whoami
        </p>

        {/* Name — serif only for display */}
        <h1 className="font-serif text-[clamp(3rem,8vw,6rem)] font-medium text-ink leading-[1.05] tracking-[-0.02em] mb-6">
          Made Reeyza
        </h1>

        {/* Tagline — mono, not italic, ink-muted */}
        <p className="font-mono text-[clamp(1rem,2.5vw,1.2rem)] text-ink-muted leading-relaxed mb-8">
          Mahasiswa Elektro yang coba membangun hal-hal yang unik.
          <span
            className="cursor-blink ml-0.5"
            aria-hidden
          >
            _
          </span>
        </p>

        {/* Intro prose — mono */}
        <p className="font-mono text-[0.9375rem] text-ink leading-[1.75] mb-12 max-w-[540px]">
          Mendalami cross-domain Elektro × Machine Learning × IoT —
          membuat sistem yang menghubungkan sensor fisik ke model cerdas,
          dan mencoba menjadikan data yang berantakan menjadi sesuatu yang
          berguna.
        </p>

        {/* CTAs — accent default, hover → accent-hover */}
        <div className="flex flex-wrap gap-x-8 gap-y-4">
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
