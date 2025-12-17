'use client';

import { motion } from 'framer-motion';
import { GitBranch, Users, Building, Zap } from 'lucide-react';

import { Container } from '@/components/ui/container';

export function Strategy() {
  const strategies = [
    {
      icon: GitBranch,
      title: 'Open Source First',
      description: 'Build in public, grow community, establish trust',
      tactics: [
        'MIT license for core library',
        'Active GitHub presence and engagement',
        'Developer advocacy and content marketing',
        'Conference talks and workshops',
      ],
    },
    {
      icon: Users,
      title: 'Developer Adoption',
      description: 'Bottom-up adoption through superior DX',
      tactics: [
        'Exceptional documentation and examples',
        'Zero friction onboarding (npx command)',
        'Active Discord community support',
        'Integration with popular stacks (T3, Remix)',
      ],
    },
    {
      icon: Building,
      title: 'Enterprise Monetization',
      description: 'Premium adapters and self-hosted solutions',
      tactics: [
        'Freemium model: core free, premium adapters paid',
        'Enterprise features: SSO, audit logs, SLA',
        'Self-hosted cloudless platform licensing',
        'Professional services and consulting',
      ],
    },
    {
      icon: Zap,
      title: 'Rapid Iteration',
      description: 'Ship fast, learn faster, adapt quickly',
      tactics: [
        'Weekly releases and updates',
        'User feedback loops and feature voting',
        'A/B testing for onboarding flows',
        'Data-driven product decisions',
      ],
    },
  ];

  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
              Go-to-Market Strategy
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A multi-pronged approach to capture market share and build sustainable revenue
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {strategies.map((strategy, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 h-full">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <strategy.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {strategy.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {strategy.description}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  {strategy.tactics.map((tactic, j) => (
                    <div key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                      {tactic}
                    </div>
                  ))}
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
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center mb-8">Revenue Model</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                tier: 'Free',
                price: '$0',
                description: 'Core library and basic adapters',
                features: [
                  '@factiii/core (MIT)',
                  '@factiii/stack CLI',
                  'Basic adapters',
                  'Community support',
                ],
                color: 'from-gray-400 to-gray-600',
              },
              {
                tier: 'Pro',
                price: '$49/mo',
                description: 'Premium adapters and features',
                features: [
                  'All Free features',
                  'Premium adapters',
                  'Priority support',
                  'Advanced analytics',
                ],
                color: 'from-primary to-purple-400',
              },
              {
                tier: 'Enterprise',
                price: 'Custom',
                description: 'Self-hosted cloudless platform',
                features: [
                  'All Pro features',
                  'Self-hosted deployment',
                  'SSO & audit logs',
                  'SLA & dedicated support',
                ],
                color: 'from-green-400 to-emerald-400',
              },
            ].map((tier, i) => (
              <div
                key={i}
                className="group relative"
              >
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${tier.color} rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500`} />
                <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 h-full">
                  <div className="text-center mb-6">
                    <h4 className="text-2xl font-bold text-foreground mb-2">
                      {tier.tier}
                    </h4>
                    <div className="text-4xl font-bold text-primary mb-2">
                      {tier.price}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {tier.description}
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {tier.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className={`inline-block w-1.5 h-1.5 rounded-full bg-gradient-to-r ${tier.color} mt-1.5`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 rounded-2xl p-8 md:p-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Competitive Advantages
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'First-Mover in Configless',
                description: 'No direct competitor in Node.js ecosystem with our approach',
              },
              {
                title: 'Cloudless Positioning',
                description: 'Unique value prop: own your infrastructure, we orchestrate',
              },
              {
                title: 'Developer Experience',
                description: 'Zero-config setup beats all existing solutions',
              },
              {
                title: 'Extensibility',
                description: 'Adapter ecosystem creates network effects and moat',
              },
            ].map((advantage, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">{i + 1}</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">{advantage.title}</h4>
                  <p className="text-sm text-muted-foreground">{advantage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
