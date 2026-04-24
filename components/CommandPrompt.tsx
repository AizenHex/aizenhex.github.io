interface CommandPromptProps {
  command: string
  className?: string
}

export function CommandPrompt({ command, className = "" }: CommandPromptProps) {
  return (
    <p
      className={`font-mono text-[0.9375rem] font-medium text-accent select-none ${className}`}
      aria-hidden
    >
      {command}
    </p>
  )
}
