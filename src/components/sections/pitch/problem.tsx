'use client';

import { motion } from 'framer-motion';
import { AlertCircle, Clock, Code, Wrench } from 'lucide-react';

import { Container } from '@/components/ui/container';

export function Problem() {
  const problems = [
    {
      icon: Wrench,
      title: 'Config Hell',
      description: 'Developers juggle dotenv, manual validation, and file management across fragmented tools.',
      stat: '5-10 tools',
    },
    {
      icon: Clock,
      title: 'Wasted Time',
      description: 'Teams spend 20-30% of development time on configuration instead of building features.',
      stat: '30% time',
    },
    {
      icon: Code,
      title: 'No Unified Solution',
      description: 'Node.js lacks a mature config library like Go\'s Viper or koanf—forcing ad-hoc solutions.',
      stat: 'No standard',
    },
    {
      icon: AlertCircle,
      title: 'Deployment Anxiety',
      description: 'Forgotten env vars, mismatched configs, and build failures plague production deployments.',
      stat: '40% failures',
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
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-400">
              The Problem
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Configuration management is broken in the Node.js ecosystem. Developers are drowning in complexity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {problems.map((problem, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 h-full">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-500/10 rounded-xl">
                    <problem.icon className="h-6 w-6 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-foreground">
                        {problem.title}
                      </h3>
                      <span className="text-sm font-mono text-red-400 bg-red-500/10 px-3 py-1 rounded-full">
                        {problem.stat}
                      </span>
                    </div>
                    <p className="text-muted-foreground">
                      {problem.description}
                    </p>
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
          className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-8 md:p-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center">
            The Real Cost
          </h3>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-8">
            Every day, developers worldwide lose countless hours to configuration issues. The Node.js ecosystem desperately needs a unified, zero-config solution.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '20M+', label: 'Affected Devs' },
              { value: '$12B', label: 'Lost Productivity' },
              { value: '40%', label: 'Deploy Failures' },
              { value: '0', label: 'Good Solutions' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-red-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
