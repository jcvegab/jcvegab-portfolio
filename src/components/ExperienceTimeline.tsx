import { markdownify } from '@/utils';

import type {
  ExperienceEntry,
  ExperienceTimelineProps,
} from './ExperienceTimeline.types';

export default function ExperienceTimeline({
  experiences,
}: ExperienceTimelineProps) {
  if (experiences.length === 0) return null;

  const companies = Map.groupBy(
    experiences,
    (experience) => experience.company_url || experience.company,
  );

  return (
    <section className="experience-timeline" aria-labelledby="experience-title">
      <h2 id="experience-title">Experiencia profesional</h2>
      <ol className="experience-timeline__list">
        {[...companies].map(([companyKey, roles]) => {
          const [{ id, company, company_url: companyUrl }] = roles;

          return (
            <li className="experience-timeline__item" key={companyKey}>
              <article
                className="experience-timeline__content"
                aria-labelledby={`experience-company-${id}`}
              >
                <header className="experience-timeline__company-row">
                  <span className="experience-timeline__company-icon">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" />
                      <path d="M2 22h20M10 6h4M10 10h4M10 14h4M10 18h4" />
                    </svg>
                  </span>
                  <p
                    id={`experience-company-${id}`}
                    className="experience-timeline__company"
                  >
                    {companyUrl ? (
                      <a
                        href={companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {company}
                      </a>
                    ) : (
                      company
                    )}
                  </p>
                </header>
                {roles.map((experience) => (
                  <ExperienceRole key={experience.id} experience={experience} />
                ))}
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function ExperienceRole({ experience }: { experience: ExperienceEntry }) {
  const roleId = `experience-role-${experience.id}`;

  return (
    <section className="experience-timeline__role" aria-labelledby={roleId}>
      <h3 id={roleId}>{experience.role}</h3>
      <div className="experience-timeline__dates">
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M7 3v4M17 3v4M3 10h18" />
        </svg>
        <div className="experience-timeline__periods">
          {experience.periods.map((period) => (
            <p key={period.start}>
              <time dateTime={period.start}>{period.start_label}</time> –{' '}
              {period.end ? (
                <time dateTime={period.end}>{period.end_label}</time>
              ) : (
                period.end_label
              )}
            </p>
          ))}
        </div>
      </div>
      <p className="experience-timeline__location">{experience.location}</p>
      <p className="experience-timeline__summary">{experience.summary}</p>
      <ul
        className="experience-timeline__technologies"
        aria-label={`Tecnologías utilizadas como ${experience.role} en ${experience.company}`}
      >
        {experience.technologies.map((technology) => (
          <li className="experience-timeline__badge" key={technology}>
            {technology}
          </li>
        ))}
      </ul>
      <details className="experience-timeline__details">
        <summary>Ver logros destacados</summary>
        <ul className="experience-timeline__highlights">
          {experience.highlights.map((highlight) => (
            <li key={highlight}>{markdownify(highlight)}</li>
          ))}
        </ul>
      </details>
    </section>
  );
}
