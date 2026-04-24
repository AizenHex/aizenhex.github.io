interface SectionHeaderProps {
  command: string
  title: string
  className?: string
}

export function SectionHeader({ command, title, className = "" }: SectionHeaderProps) {
  return (
    <header className={`mb-14 ${className}`}>
      <p className="font-mono text-[0.875rem] text-accent mb-3 select-none" aria-hidden>
        {command}
      </p>
      <h2 className="font-serif text-[clamp(1.75rem,4vw,2.5rem)] font-medium text-ink leading-tight">
        {title}
      </h2>
    </header>
  )
}
