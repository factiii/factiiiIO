'use client';

import { motion } from 'framer-motion';
import { Rocket, Package, Cloud, Globe } from 'lucide-react';

import { Container } from '@/components/ui/container';

export function Roadmap() {
  const phases = [
    {
      phase: 'Phase 1',
      timeline: 'Current - Q2 2025',
      title: 'Configless Stack',
      icon: Rocket,
      color: 'from-blue-400 to-cyan-400',
      status: 'In Progress',
      goals: [
        'Launch @factiii/core with Prisma ingestion',
        'Release @factiii/stack CLI scaffolding tool',
        'Build core adapter ecosystem (OpenAI, Next.js)',
        'Achieve 1,000+ GitHub stars',
        'Onboard 100+ early adopters',
      ],
      metrics: {
        users: '100+',
        revenue: 'Open Source',
        focus: 'Product-Market Fit',
      },
    },
    {
      phase: 'Phase 2',
      timeline: 'Q3 2025 - Q4 2025',
      title: 'Adapter Marketplace',
      icon: Package,
      color: 'from-purple-400 to-pink-400',
      status: 'Planned',
      goals: [
        'Launch adapter marketplace with 20+ adapters',
        'Introduce premium enterprise adapters',
        'Add team collaboration features',
        'Reach 10,000+ developers',
        'Generate first $100K ARR',
      ],
      metrics: {
        users: '10K+',
        revenue: '$100K ARR',
        focus: 'Monetization',
      },
    },
    {
      phase: 'Phase 3',
      timeline: 'Q1 2026 - Q4 2026',
      title: 'Cloudless Platform',
      icon: Cloud,
      color: 'from-green-400 to-emerald-400',
      status: 'Vision',
      goals: [
        'Launch cloudless orchestration platform',
        'Enable deploy-to-own-infrastructure',
        'Compete with Vercel/Netlify on sovereignty',
        'Expand to 100,000+ developers',
        'Scale to $2M ARR',
      ],
      metrics: {
        users: '100K+',
        revenue: '$2M ARR',
        focus: 'Scale & Compete',
      },
    },
    {
      phase: 'Phase 4',
      timeline: '2027+',
      title: 'Global Infrastructure',
      icon: Globe,
      color: 'from-orange-400 to-red-400',
      status: 'Future',
      goals: [
        'Multi-cloud orchestration',
        'Edge computing integration',
        'Enterprise self-hosted solutions',
        'Global developer community',
        'Series A funding round',
      ],
      metrics: {
        users: '1M+',
        revenue: '$10M+ ARR',
        focus: 'Market Leader',
      },
    },
  ];

  return (
    <section className="py-24 bg-background relative">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
              Roadmap & Vision
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our path from configless stack to cloudless infrastructure platform
          </p>
        </motion.div>

        <div className="space-y-8">
          {phases.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative"
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${phase.color} rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500`} />
              <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-10">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className={`inline-flex p-4 bg-gradient-to-r ${phase.color} rounded-xl`}>
                      <phase.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-foreground">
                            {phase.phase}: {phase.title}
                          </h3>
                          <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                            phase.status === 'In Progress'
                              ? 'bg-green-400/10 text-green-400'
                              : phase.status === 'Planned'
                              ? 'bg-blue-400/10 text-blue-400'
                              : 'bg-purple-400/10 text-purple-400'
                          }`}>
                            {phase.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {phase.timeline}
                        </p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-bold text-foreground mb-3">Key Goals:</h4>
                      <ul className="space-y-2">
                        {phase.goals.map((goal, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className={`inline-block w-1.5 h-1.5 rounded-full bg-gradient-to-r ${phase.color} mt-1.5`} />
                            {goal}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-background/50 rounded-lg p-3">
                        <div className="text-xs text-muted-foreground mb-1">Users</div>
                        <div className="text-lg font-bold text-foreground">{phase.metrics.users}</div>
                      </div>
                      <div className="bg-background/50 rounded-lg p-3">
                        <div className="text-xs text-muted-foreground mb-1">Revenue</div>
                        <div className="text-lg font-bold text-foreground">{phase.metrics.revenue}</div>
                      </div>
                      <div className="bg-background/50 rounded-lg p-3">
                        <div className="text-xs text-muted-foreground mb-1">Focus</div>
                        <div className="text-sm font-bold text-foreground">{phase.metrics.focus}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 rounded-2xl p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            The Cloudless Vision
          </h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
            We're not just building a config tool—we're creating the infrastructure platform where developers own their deployment destiny. Deploy to your cloud, your servers, your terms.
          </p>
          <div className="inline-flex items-center gap-2 text-primary font-medium">
            <Rocket className="h-5 w-5" />
            <span>From configless to cloudless, we're redefining infrastructure</span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
