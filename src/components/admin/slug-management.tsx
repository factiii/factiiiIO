'use client';

import { motion } from 'framer-motion';
import { Plus, Trash2, Copy, Check, Shuffle, Star } from 'lucide-react';
import { useState, useTransition } from 'react';
import { addPitchSlug, removePitchSlug, generateRandomSlug, setDefaultPitchSlug } from '@/app/adminl33t/actions';
import { Button } from '@/components/ui/button';

interface SlugManagementProps {
  slugs: string[];
  defaultSlug: string | null;
}

export function SlugManagement({ slugs: initialSlugs, defaultSlug: initialDefault }: SlugManagementProps) {
  const [slugs, setSlugs] = useState(initialSlugs);
  const [defaultSlug, setDefaultSlugState] = useState(initialDefault);
  const [showAddModal, setShowAddModal] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleAddSlug = async (formData: FormData) => {
    const slug = formData.get('slug') as string;
    startTransition(async () => {
      const result = await addPitchSlug(slug);
      if (result.success && result.slug) {
        setSlugs([...slugs, result.slug]);
        setShowAddModal(false);
      }
    });
  };

  const handleGenerateSlug = async () => {
    startTransition(async () => {
      const result = await generateRandomSlug();
      if (result.success && result.slug) {
        setSlugs([...slugs, result.slug]);
      }
    });
  };

  const handleRemoveSlug = async (slug: string) => {
    if (!confirm(`Delete slug "${slug}"?`)) return;
    
    startTransition(async () => {
      const result = await removePitchSlug(slug);
      if (result.success) {
        setSlugs(slugs.filter(s => s !== slug));
      }
    });
  };

  const handleSetDefault = async (slug: string) => {
    startTransition(async () => {
      const result = await setDefaultPitchSlug(slug);
      if (result.success) {
        setDefaultSlugState(slug);
      }
    });
  };

  const copyUrl = (slug: string) => {
    const url = `${window.location.origin}/p/${slug}`;
    navigator.clipboard.writeText(url);
    setCopied(slug);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Pitch Deck URLs</h2>
        <div className="flex gap-2">
          <Button
            onClick={handleGenerateSlug}
            disabled={isPending}
            className="flex items-center gap-2 bg-background hover:bg-background/80"
          >
            <Shuffle className="h-4 w-4" />
            Generate Random
          </Button>
          <Button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            Add Slug
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {slugs.map((slug) => (
          <motion.div
            key={slug}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <code className="text-sm font-mono text-foreground">{slug}</code>
                  {defaultSlug === slug && (
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground break-all">
                  /p/{slug}
                </p>
              </div>
              {slugs.length > 1 && (
                <button
                  onClick={() => handleRemoveSlug(slug)}
                  disabled={isPending}
                  className="p-1 hover:bg-background rounded transition-colors disabled:opacity-50"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4 text-red-400" />
                </button>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={() => copyUrl(slug)}
                className="flex-1 text-xs bg-background hover:bg-background/80"
              >
                {copied === slug ? (
                  <>
                    <Check className="h-3 w-3 mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3 mr-1" />
                    Copy URL
                  </>
                )}
              </Button>
              {defaultSlug !== slug && (
                <Button
                  onClick={() => handleSetDefault(slug)}
                  disabled={isPending}
                  className="text-xs bg-background hover:bg-background/80"
                  title="Set as default"
                >
                  <Star className="h-3 w-3" />
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Slug Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-xl p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold text-foreground mb-4">Add New Slug</h3>
            <form action={handleAddSlug} className="space-y-4">
              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-foreground mb-2">
                  Slug
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  required
                  pattern="[a-z0-9-]+"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  placeholder="investor-deck-2025"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Lowercase letters, numbers, and hyphens only
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-background hover:bg-background/80"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  {isPending ? 'Adding...' : 'Add Slug'}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
