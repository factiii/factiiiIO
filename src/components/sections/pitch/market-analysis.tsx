'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, Target } from 'lucide-react';

import { Container } from '@/components/ui/container';

export function MarketAnalysis() {
  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400">
              Market Opportunity
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A massive, underserved market with clear pain points and strong demand signals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: DollarSign,
              label: 'TAM',
              value: '$8.2B',
              description: 'DevOps Tools Market',
              color: 'from-green-400 to-emerald-400',
            },
            {
              icon: Target,
              label: 'SAM',
              value: '$2.1B',
              description: 'Config Management Segment',
              color: 'from-blue-400 to-cyan-400',
            },
            {
              icon: TrendingUp,
              label: 'SOM',
              value: '$180M',
              description: 'Serviceable Obtainable (3 years)',
              color: 'from-purple-400 to-pink-400',
            },
          ].map((market, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative"
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${market.color} rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500`} />
              <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 text-center h-full">
                <div className={`inline-flex p-4 bg-gradient-to-r ${market.color} rounded-xl mb-4`}>
                  <market.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-sm font-medium text-muted-foreground mb-2">
                  {market.label}
                </div>
                <div className="text-4xl font-bold text-foreground mb-3">
                  {market.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {market.description}
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
          <h3 className="text-3xl font-bold text-center mb-8">Target Audience</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Users,
                title: 'Node.js Developers',
                value: '20M+',
                description: 'Global developer base struggling with config management',
                growth: '+15% YoY',
              },
              {
                icon: TrendingUp,
                title: 'T3 Stack Adopters',
                description: 'Fast-growing full-stack TypeScript community',
                growth: '+200% YoY',
              },
              {
                icon: Target,
                title: 'Enterprise Teams',
                description: 'Companies seeking configless solutions for scale',
                growth: 'High intent',
              },
              {
                icon: DollarSign,
                title: 'DevOps Engineers',
                description: 'Teams spending 30% of time on configuration issues',
                growth: 'Pain point',
              },
            ].map((audience, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <audience.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-bold text-foreground">
                        {audience.title}
                      </h4>
                      {audience.value && (
                        <span className="text-sm font-bold text-primary">
                          {audience.value}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {audience.description}
                    </p>
                    <span className="inline-flex items-center text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                      {audience.growth}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-8 md:p-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Market Trends Driving Adoption
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Cloudless Movement',
                description: 'Companies seeking data sovereignty and cost control',
                impact: 'High',
              },
              {
                title: 'Developer Experience',
                description: 'Zero-config tools gaining massive traction (Vite, Next.js)',
                impact: 'Critical',
              },
              {
                title: 'TypeScript Adoption',
                description: 'Type-safe tooling becoming industry standard',
                impact: 'Essential',
              },
            ].map((trend, i) => (
              <div key={i} className="text-center">
                <h4 className="text-lg font-bold text-foreground mb-2">
                  {trend.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {trend.description}
                </p>
                <span className="inline-flex items-center text-xs font-bold text-green-400 bg-green-400/10 px-3 py-1 rounded-full">
                  Impact: {trend.impact}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
