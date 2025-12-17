'use client';

import { motion } from 'framer-motion';
import { Check, Minus, X } from 'lucide-react';

import { Container } from '@/components/ui/container';

type FeatureValue = 'yes' | 'no' | 'partial' | 'unknown' | string;

interface Competitor {
  name: string;
  category: string;
  highlight?: boolean;
}

interface Feature {
  name: string;
  values: Record<string, FeatureValue>;
}

export function CompetitorTable() {
  const competitors: Competitor[] = [
    { name: 'c9h', category: 'Node.js' },
    { name: 'convict', category: 'Node.js' },
    { name: 'node-config', category: 'Node.js' },
    { name: 'nconf', category: 'Node.js' },
    { name: 'dotenv-*', category: 'Node.js' },
    { name: 'cosmiconfig', category: 'Node.js' },
    { name: 'rc', category: 'Node.js' },
    { name: 'Viper', category: 'Go' },
    { name: 'koanf', category: 'Go' },
    { name: 'factiii.io', category: 'Node.js', highlight: true },
  ];

  const features: Feature[] = [
    {
      name: 'Zero-config setup',
      values: {
        'c9h': 'yes',
        'convict': 'no',
        'node-config': 'no',
        'nconf': 'partial',
        'dotenv-*': 'yes',
        'cosmiconfig': 'partial',
        'rc': 'yes',
        'Viper': 'partial',
        'koanf': 'partial',
        'factiii.io': 'yes',
      },
    },
    {
      name: 'Schema validation',
      values: {
        'c9h': 'unknown',
        'convict': 'yes',
        'node-config': 'no',
        'nconf': 'no',
        'dotenv-*': 'no',
        'cosmiconfig': 'no',
        'rc': 'no',
        'Viper': 'yes',
        'koanf': 'yes',
        'factiii.io': 'Auto-inferred',
      },
    },
    {
      name: 'Env var binding',
      values: {
        'c9h': 'yes',
        'convict': 'yes',
        'node-config': 'yes',
        'nconf': 'yes',
        'dotenv-*': 'yes',
        'cosmiconfig': 'no',
        'rc': 'yes',
        'Viper': 'yes',
        'koanf': 'yes',
        'factiii.io': 'Auto-bound',
      },
    },
    {
      name: 'Multi-format support',
      values: {
        'c9h': 'unknown',
        'convict': 'JSON',
        'node-config': 'JSON/YAML',
        'nconf': 'JSON/YAML/JS',
        'dotenv-*': '.env',
        'cosmiconfig': 'JSON/YAML/JS',
        'rc': 'JSON/INI',
        'Viper': 'JSON/YAML/TOML',
        'koanf': 'JSON/YAML/TOML',
        'factiii.io': 'Code-first',
      },
    },
    {
      name: 'Secret masking',
      values: {
        'c9h': 'unknown',
        'convict': 'yes',
        'node-config': 'no',
        'nconf': 'no',
        'dotenv-*': 'no',
        'cosmiconfig': 'no',
        'rc': 'no',
        'Viper': 'no',
        'koanf': 'no',
        'factiii.io': 'yes',
      },
    },
    {
      name: 'Hot reload',
      values: {
        'c9h': 'unknown',
        'convict': 'no',
        'node-config': 'yes',
        'nconf': 'no',
        'dotenv-*': 'no',
        'cosmiconfig': 'no',
        'rc': 'no',
        'Viper': 'yes',
        'koanf': 'no',
        'factiii.io': 'yes',
      },
    },
    {
      name: 'File structure required',
      values: {
        'c9h': 'unknown',
        'convict': 'no',
        'node-config': 'yes',
        'nconf': 'partial',
        'dotenv-*': 'partial',
        'cosmiconfig': 'partial',
        'rc': 'partial',
        'Viper': 'partial',
        'koanf': 'no',
        'factiii.io': 'no',
      },
    },
    {
      name: 'Boilerplate code',
      values: {
        'c9h': 'Low',
        'convict': 'High',
        'node-config': 'Med',
        'nconf': 'Med',
        'dotenv-*': 'Low',
        'cosmiconfig': 'Med',
        'rc': 'Low',
        'Viper': 'Med',
        'koanf': 'Low',
        'factiii.io': 'None',
      },
    },
    {
      name: 'Type safety',
      values: {
        'c9h': 'unknown',
        'convict': 'partial',
        'node-config': 'no',
        'nconf': 'no',
        'dotenv-*': 'no',
        'cosmiconfig': 'no',
        'rc': 'no',
        'Viper': 'yes',
        'koanf': 'yes',
        'factiii.io': 'Full TS',
      },
    },
    {
      name: 'Adapter ecosystem',
      values: {
        'c9h': 'no',
        'convict': 'no',
        'node-config': 'no',
        'nconf': 'no',
        'dotenv-*': 'no',
        'cosmiconfig': 'no',
        'rc': 'no',
        'Viper': 'no',
        'koanf': 'no',
        'factiii.io': 'yes',
      },
    },
    {
      name: 'Cloudless deployment',
      values: {
        'c9h': 'no',
        'convict': 'no',
        'node-config': 'no',
        'nconf': 'no',
        'dotenv-*': 'no',
        'cosmiconfig': 'no',
        'rc': 'no',
        'Viper': 'no',
        'koanf': 'no',
        'factiii.io': 'yes',
      },
    },
  ];

  const renderCell = (value: FeatureValue, isHighlight: boolean) => {
    if (value === 'yes') {
      return (
        <div className={`flex justify-center ${isHighlight ? 'text-primary' : 'text-green-500'}`}>
          <Check className="h-5 w-5" />
        </div>
      );
    }
    if (value === 'no') {
      return (
        <div className="flex justify-center text-red-500">
          <X className="h-5 w-5" />
        </div>
      );
    }
    if (value === 'partial') {
      return (
        <div className="flex justify-center text-yellow-500">
          <Minus className="h-5 w-5" />
        </div>
      );
    }
    if (value === 'unknown') {
      return (
        <div className="flex justify-center text-muted-foreground text-sm">
          ?
        </div>
      );
    }
    return (
      <div className={`text-center text-sm ${isHighlight ? 'text-primary font-bold' : 'text-foreground'}`}>
        {value}
      </div>
    );
  };

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
              Competitive Analysis
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            How factiii.io stacks up against existing configuration management solutions
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-x-auto"
        >
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden border border-border rounded-2xl">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-card/50 backdrop-blur-sm">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-foreground sticky left-0 bg-card/50 backdrop-blur-sm z-10">
                      Feature
                    </th>
                    {competitors.map((comp, i) => (
                      <th
                        key={i}
                        className={`px-6 py-4 text-center text-sm font-bold ${
                          comp.highlight
                            ? 'bg-primary/10 text-primary'
                            : 'text-foreground'
                        }`}
                      >
                        <div>{comp.name}</div>
                        <div className="text-xs font-normal text-muted-foreground mt-1">
                          {comp.category}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card/30">
                  {features.map((feature, i) => (
                    <tr
                      key={i}
                      className="hover:bg-card/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-foreground sticky left-0 bg-card/30 backdrop-blur-sm">
                        {feature.name}
                      </td>
                      {competitors.map((comp, j) => (
                        <td
                          key={j}
                          className={`px-6 py-4 ${
                            comp.highlight ? 'bg-primary/5' : ''
                          }`}
                        >
                          {renderCell(feature.values[comp.name], comp.highlight || false)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            {
              title: 'Code-First',
              desc: 'Ingest code structure, generate configs automatically',
            },
            {
              title: 'Adapter Ecosystem',
              desc: 'Extensible plugin system for any integration',
            },
            {
              title: 'Cloudless Vision',
              desc: 'Users own infrastructure, we orchestrate',
            },
            {
              title: 'Zero Boilerplate',
              desc: 'No schema definitions, no config files, just code',
            },
          ].map((diff, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 rounded-xl p-6"
            >
              <h4 className="text-lg font-bold text-primary mb-2">
                {diff.title}
              </h4>
              <p className="text-sm text-muted-foreground">{diff.desc}</p>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
