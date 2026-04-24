import Link from "next/link"

interface ProjectCardProps {
  slug: string
  title: string
  description: string
  category: string
  year: string
  color: string
}

export function ProjectCard({
  slug,
  title,
  description,
  category,
  year,
  color,
}: ProjectCardProps) {
  return (
    <article className="group">
      <Link href={`/work/${slug}`} className="block" aria-label={`Baca case study: ${title}`}>
        {/* Cover swatch — hover: border accent-hover, -translateY-2px */}
        <div
          className="aspect-[4/3] rounded-[4px] mb-5 border border-border transition-all duration-150 group-hover:border-accent-hover group-hover:-translate-y-0.5"
          style={{ backgroundColor: color }}
          aria-hidden
        />

        {/* Meta */}
        <p className="font-mono text-[0.8125rem] text-ink-muted mb-2">
          {category} · {year}
        </p>

        {/* Title — serif display */}
        <h3 className="font-serif text-[1.375rem] font-medium text-ink leading-snug mb-2 transition-colors duration-150 group-hover:text-accent">
          {title}
        </h3>

        {/* Description — mono body */}
        <p className="font-mono text-[0.9375rem] text-ink-muted leading-[1.75] mb-4">
          {description}
        </p>

        {/* Read link */}
        <span className="font-mono text-[0.8125rem] text-accent link-underline group-hover:text-accent-hover transition-colors duration-150">
          → read case study
        </span>
      </Link>
    </article>
  )
}
