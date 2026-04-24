export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border py-10">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <p className="font-mono text-[0.875rem] text-ink-muted text-center">
          {"// built with care by Made Reeyza · last updated "}
          <time dateTime={String(year)}>{year}</time>
          {" · "}
          <a
            href="https://github.com/Eyazrim/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline hover:text-ink transition-colors duration-150"
          >
            view source →
          </a>
        </p>
      </div>
    </footer>
  )
}
