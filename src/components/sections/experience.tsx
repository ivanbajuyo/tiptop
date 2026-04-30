'use client'

import { ScrollAnimation } from '@/components/scroll-animation'
import { Briefcase, GraduationCap } from 'lucide-react'

const experiences = [
  {
    type: 'work',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    period: '2023 - Present',
    description:
      'Leading the frontend architecture for a SaaS platform serving 100K+ users. Implemented design system, improved performance by 40%, and mentored junior developers.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GraphQL'],
  },
  {
    type: 'work',
    title: 'Full-Stack Developer',
    company: 'StartupXYZ',
    period: '2021 - 2023',
    description:
      'Built and scaled the core product from MVP to production. Designed REST APIs, implemented real-time features with WebSocket, and managed CI/CD pipelines.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
  },
  {
    type: 'work',
    title: 'Frontend Developer',
    company: 'Digital Agency Co.',
    period: '2020 - 2021',
    description:
      'Developed responsive web applications for diverse clients across e-commerce, healthcare, and education sectors. Collaborated closely with design teams.',
    tech: ['React', 'JavaScript', 'SASS', 'WordPress'],
  },
  {
    type: 'education',
    title: 'B.S. Computer Science',
    company: 'University of Technology',
    period: '2016 - 2020',
    description:
      'Graduated with honors. Focus on software engineering and human-computer interaction. Active in coding clubs and hackathons.',
    tech: ['Algorithms', 'Data Structures', 'HCI', 'Software Engineering'],
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-emerald-500 uppercase tracking-widest mb-3">
              Experience
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              My Journey
            </h2>
          </div>
        </ScrollAnimation>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />

          {experiences.map((exp, i) => (
            <ScrollAnimation
              key={exp.title}
              delay={i * 0.1}
              direction={i % 2 === 0 ? 'left' : 'right'}
            >
              <div
                className={`relative flex items-start gap-6 mb-12 last:mb-0 ${
                  i % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 -translate-x-1/2 w-4 h-4 rounded-full bg-emerald-500 border-4 border-background z-10 md:left-1/2" />

                {/* Content */}
                <div
                  className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                    i % 2 === 0 ? 'md:mr-auto md:pr-0 md:pl-8' : 'md:ml-auto md:pl-0 md:pr-8'
                  }`}
                >
                  <div className="p-6 rounded-xl bg-card border border-border hover:border-emerald-500/30 transition-colors">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 rounded-md bg-emerald-500/10">
                        {exp.type === 'work' ? (
                          <Briefcase className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <GraduationCap className="h-4 w-4 text-emerald-500" />
                        )}
                      </div>
                      <span className="text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        {exp.period}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg">{exp.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{exp.company}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs font-medium px-2 py-1 rounded bg-muted text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
