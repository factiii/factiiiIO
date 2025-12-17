'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Cpu, Layers, Zap } from 'lucide-react';

import { Container } from '@/components/ui/container';

export function Solution() {
  const features = [
    {
      icon: Zap,
      title: 'Zero Configuration',
      description: 'No config files, no schema definitions, no boilerplate. Just write code and deploy.',
      highlight: 'Write code, not configs',
    },
    {
      icon: Layers,
      title: 'Code-First Architecture',
      description: 'Adapters ingest your code structure and auto-generate everything—configs, types, validations.',
      highlight: 'Auto-generated everything',
    },
    {
      icon: Cpu,
      title: 'Adapter Ecosystem',
      description: 'Extensible plugin system for any integration—OpenAI, databases, auth, and more.',
      highlight: 'Infinite extensibility',
    },
    {
      icon: CheckCircle2,
      title: 'Type-Safe by Default',
      description: 'Full TypeScript support with auto-inferred types from Prisma schema to tRPC routes.',
      highlight: 'End-to-end type safety',
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
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-primary">
              Our Solution
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            factiii.io is the configless infrastructure platform that eliminates configuration complexity and puts developers back in control.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {features.map((feature, i) => (
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
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      {feature.description}
                    </p>
                    <span className="inline-flex items-center text-sm font-medium text-primary">
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      {feature.highlight}
                    </span>
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
          className="bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 rounded-2xl p-8 md:p-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            How It Works: The Adapter Flow
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-2">
            {[
              { step: '1', title: 'Ingest Code', desc: 'Scan your codebase' },
              { step: '2', title: 'Validate', desc: 'Check structure' },
              { step: '3', title: 'Generate', desc: 'Create configs' },
              { step: '4', title: 'Hook Core', desc: 'Wire everything' },
              { step: '5', title: 'Deploy', desc: 'Ship to production' },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-primary">{item.step}</span>
                  </div>
                  <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                {i < 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-primary/30" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">The Viper for Node.js, but Better</h3>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Go developers have Viper and koanf. We're bringing that same elegance to Node.js—with zero configuration required.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
