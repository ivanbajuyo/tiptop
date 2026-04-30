'use client'

import { ScrollAnimation } from '@/components/scroll-animation'

const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React / Next.js', level: 95 },
      { name: 'TypeScript', level: 92 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Framer Motion', level: 85 },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'PostgreSQL / Prisma', level: 88 },
      { name: 'REST & GraphQL', level: 87 },
      { name: 'Python / FastAPI', level: 80 },
    ],
  },
  {
    title: 'DevOps & Tools',
    skills: [
      { name: 'Docker / CI/CD', level: 85 },
      { name: 'AWS / Vercel', level: 82 },
      { name: 'Git / GitHub', level: 95 },
      { name: 'Linux / Bash', level: 80 },
    ],
  },
  {
    title: 'Design & Other',
    skills: [
      { name: 'Figma', level: 78 },
      { name: 'UI/UX Principles', level: 85 },
      { name: 'Agile / Scrum', level: 88 },
      { name: 'Technical Writing', level: 82 },
    ],
  },
]

const techStack = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'Python',
  'PostgreSQL', 'MongoDB', 'Redis', 'Tailwind CSS', 'Prisma', 'GraphQL',
  'Docker', 'AWS', 'Vercel', 'Figma', 'Git', 'Linux',
]

export function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-emerald-500 uppercase tracking-widest mb-3">
              Skills & Expertise
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Technologies I Work With
            </h2>
          </div>
        </ScrollAnimation>

        {/* Skill Bars */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, catIdx) => (
            <ScrollAnimation key={category.title} delay={catIdx * 0.1}>
              <div className="p-6 rounded-xl bg-card border border-border">
                <h3 className="font-semibold text-lg mb-6">{category.title}</h3>
                <div className="space-y-5">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm text-emerald-500 font-medium">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Tech Stack Tags */}
        <ScrollAnimation delay={0.3}>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-6">Full Technology Stack</p>
            <div className="flex flex-wrap justify-center gap-3">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-card border border-border hover:border-emerald-500/30 hover:text-emerald-500 transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
