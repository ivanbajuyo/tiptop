'use client'

import { ScrollAnimation } from '@/components/scroll-animation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react'

const projects = [
  {
    title: 'CloudSync Dashboard',
    description:
      'A real-time analytics dashboard for cloud infrastructure monitoring with live metrics, alerts, and team collaboration features.',
    image: '/projects/cloudsync.jpg',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'WebSocket', 'D3.js'],
    github: '#',
    live: '#',
    featured: true,
  },
  {
    title: 'ShopFlow E-Commerce',
    description:
      'Modern e-commerce platform with AI-powered product recommendations, seamless checkout, and inventory management.',
    image: '/projects/shopflow.jpg',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind'],
    github: '#',
    live: '#',
    featured: true,
  },
  {
    title: 'TaskBoard Pro',
    description:
      'Collaborative project management tool with kanban boards, real-time sync, and automated workflow capabilities.',
    image: '/projects/taskboard.jpg',
    tags: ['Next.js', 'Socket.io', 'MongoDB', 'React DnD'],
    github: '#',
    live: '#',
    featured: true,
  },
  {
    title: 'MediTrack',
    description:
      'Healthcare appointment scheduling system with patient records, telemedicine integration, and HIPAA compliance.',
    image: '/projects/meditrack.jpg',
    tags: ['React', 'Python', 'FastAPI', 'AWS', 'PostgreSQL'],
    github: '#',
    live: '#',
    featured: false,
  },
  {
    title: 'DevConnect',
    description:
      'Developer networking platform with code sharing, tech blogs, and community forums.',
    image: '/projects/devconnect.jpg',
    tags: ['Next.js', 'GraphQL', 'Prisma', 'Markdown'],
    github: '#',
    live: '#',
    featured: false,
  },
  {
    title: 'FinAnalyzer',
    description:
      'Personal finance tracker with AI-driven insights, expense categorization, and investment portfolio management.',
    image: '/projects/finanalyzer.jpg',
    tags: ['React', 'Python', 'TensorFlow', 'Plaid API'],
    github: '#',
    live: '#',
    featured: false,
  },
]

export function Projects() {
  const featured = projects.filter((p) => p.featured)
  const others = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-emerald-500 uppercase tracking-widest mb-3">
              Portfolio
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Featured Projects
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              A selection of projects that showcase my expertise in full-stack development,
              system design, and user experience.
            </p>
          </div>
        </ScrollAnimation>

        {/* Featured Projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featured.map((project, i) => (
            <ScrollAnimation key={project.title} delay={i * 0.1}>
              <div className="group h-full flex flex-col rounded-xl bg-card border border-border hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-500 overflow-hidden">
                {/* Image placeholder */}
                <div className="aspect-video bg-gradient-to-br from-emerald-500/10 via-emerald-600/5 to-muted relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl font-bold text-emerald-500/20">
                      {project.title.split(' ')[0]}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a href={project.github} className="p-2 rounded-lg bg-background/80 backdrop-blur-sm hover:bg-background transition-colors">
                      <Github className="h-4 w-4" />
                    </a>
                    <a href={project.live} className="p-2 rounded-lg bg-background/80 backdrop-blur-sm hover:bg-background transition-colors">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                <div className="flex flex-col flex-1 p-6">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-emerald-500 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs bg-muted/50 hover:bg-emerald-500/10 hover:text-emerald-500"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Other Projects */}
        <ScrollAnimation>
          <h3 className="text-xl font-semibold text-center mb-8">Other Projects</h3>
        </ScrollAnimation>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {others.map((project, i) => (
            <ScrollAnimation key={project.title} delay={i * 0.1}>
              <div className="group p-6 rounded-xl bg-card border border-border hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold group-hover:text-emerald-500 transition-colors">
                    {project.title}
                  </h3>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-emerald-500 transition-colors mt-1" />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs bg-muted/50"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a
                    href={project.github}
                    className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                  >
                    <Github className="h-3.5 w-3.5" />
                    Code
                  </a>
                  <a
                    href={project.live}
                    className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Live Demo
                  </a>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation delay={0.2}>
          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => window.open('https://github.com', '_blank')}
            >
              <Github className="h-4 w-4" />
              View All Projects on GitHub
            </Button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
