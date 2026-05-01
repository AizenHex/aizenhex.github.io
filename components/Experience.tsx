import { SectionHeader } from "@/components/SectionHeader"
import { FadeIn } from "@/components/FadeIn"
import { experienceTracks, type ExperienceTrackId } from "@/content/experience"

const trackTone: Record<ExperienceTrackId, string> = {
  education: "exp-track-education",
  competition: "exp-track-competition",
  organization: "exp-track-organization",
  work: "exp-track-work",
}

function TrackIcon({ id }: { id: ExperienceTrackId }) {
  if (id === "education") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M22 10v6" />
        <path d="M2 10l10-5 10 5-10 5-10-5Z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    )
  }

  if (id === "competition") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </svg>
    )
  }

  if (id === "work") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="py-16 md:py-36 border-t border-border"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <FadeIn>
          <SectionHeader command="$ cat experience.log" title="Experience" />
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="exp-tracks-wrap">
            <div className="exp-tracks">
              {experienceTracks.map((track) => (
                <article
                  key={track.id}
                  className={`exp-track ${trackTone[track.id]}`}
                  aria-labelledby={`experience-${track.id}`}
                >
                  <div className="exp-track-line" aria-hidden />

                  <div className="exp-track-head">
                    <span className="exp-track-icon">
                      <TrackIcon id={track.id} />
                    </span>
                    <h3 id={`experience-${track.id}`} className="exp-track-name">
                      {track.label}
                    </h3>
                  </div>

                  <ol className="exp-node-list">
                    {track.items.map((item) => (
                      <li key={`${track.id}-${item.period}-${item.role}`} className="exp-node">
                        <span className="exp-node-dot" aria-hidden />
                        <div className="exp-node-body">
                          <p className="exp-node-period">{item.period}</p>
                          <div className="exp-node-card">
                            <h4>{item.role}</h4>
                            <p>
                              {item.org}
                              {item.location ? ` · ${item.location}` : ""}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </article>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
