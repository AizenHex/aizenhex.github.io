import type { MDXComponents } from "mdx/types"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="font-serif text-[clamp(1.75rem,4vw,2.5rem)] font-medium text-ink leading-tight tracking-[-0.02em] mb-6 mt-12">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-serif text-[1.375rem] md:text-[1.5rem] font-medium text-ink leading-snug tracking-[-0.015em] mb-4 mt-10">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-[1.125rem] md:text-[1.1875rem] font-medium text-ink leading-snug mb-3 mt-8">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="font-serif text-[1.0625rem] text-ink-muted leading-[1.8] mb-5">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="font-serif text-[1.0625rem] text-ink-muted leading-[1.8] mb-5 list-disc pl-6 space-y-1">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="font-serif text-[1.0625rem] text-ink-muted leading-[1.8] mb-5 list-decimal pl-6 space-y-1">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="font-serif text-[1.0625rem] text-ink-muted leading-[1.8]">
        {children}
      </li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-accent pl-5 my-6 font-serif text-[1.0625rem] text-ink-muted leading-[1.8] italic">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="font-mono text-[0.875rem] bg-surface text-accent px-1.5 py-0.5 rounded">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="font-mono text-[0.875rem] bg-surface text-ink-muted leading-[1.7] rounded-[4px] p-5 overflow-x-auto mb-6 border border-border">
        {children}
      </pre>
    ),
    hr: () => (
      <hr className="border-none border-t border-border my-10" />
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-ink">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-accent link-underline hover:text-accent-hover transition-colors duration-150"
      >
        {children}
      </a>
    ),
    ...components,
  }
}
