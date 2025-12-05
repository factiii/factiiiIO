"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Calendar, ExternalLink, Terminal } from "lucide-react";
import Image from "next/image";
import Script from "next/script";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function Hero() {
  const [showPopup, setShowPopup] = useState(false);
  const command = "npx @factiii/stack@latest my-app";

  const GOOGLE_MEET_LINK = "https://meet.google.com/yqb-tcku-ssc";
  const CALENDAR_LINK = "https://calendar.app.google/m64JDs9xxErp1iSW7";

  const handleCommandClick = () => {
    window.open("https://github.com/factiii/core", "_blank");
  };

  return (
    <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
        charSet="utf-8"
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

      <Container className="flex flex-col items-center text-center">
        <div className="flex flex-row items-center justify-center gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20, rotate: -5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ rotate: [5, -5, 5] }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <Image 
              src="/logo.jpg" 
              alt="Factiii Logo" 
              width={50}
              height={50}
              className="rounded-xl"
              priority
            />
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2" />
            v0.0 Early Engineering
          </div>
        </motion.div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70"
        >
          Configless Stack<br className="hidden md:block" /> Write Code, <br className="hidden md:block" />
          <span className="text-primary">Not configrations.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
        >
          Write code, Deploy. No configurations needed. No build issues found. No forgotten envs. Perfect for production.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <div 
              className="relative flex items-center bg-background rounded-lg border border-border px-4 py-3 cursor-pointer hover:bg-accent/5 transition-colors"
              onMouseEnter={() => setShowPopup(true)}
              onMouseLeave={() => setShowPopup(false)}
              onClick={handleCommandClick}
            >
              <div className="flex items-center font-mono text-sm text-foreground">
                <Terminal className="mr-2 h-4 w-4 text-muted-foreground" />
                {command}
              </div>
            </div>
            <AnimatePresence>
              {showPopup && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50"
                >
                  <div className="bg-background border border-primary/20 rounded-lg px-6 py-4 shadow-lg backdrop-blur-sm whitespace-nowrap">
                    <p className="text-lg font-semibold text-primary">Star the repo and help us build the future of configless stack</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <div className="relative bg-background rounded-lg border border-primary/20 px-6 py-4 shadow-lg backdrop-blur-sm">
              <p className="text-sm font-semibold text-primary mb-4 text-center">
                Join us for the kickoff brainstorm!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
                <a
                  href={GOOGLE_MEET_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Join Google Meet
                </a>
                <a
                  href={CALENDAR_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Calendar className="h-4 w-4" />
                    Add to Calendar
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-8 flex flex-col items-center"
        >
          <blockquote className="twitter-tweet" data-theme="dark">
            <p lang="en" dir="ltr">
              Will be meeting 9AM CST on Tuesday to go over engineering details for initial version. Feel free to join at{" "}
              <a href="https://t.co/a52EQRJ1O7">https://t.co/a52EQRJ1O7</a> would love to hear from everyone on this OSS idea.{" "}
              <a href="https://t.co/m5BgSP6vP4">pic.twitter.com/m5BgSP6vP4</a>
            </p>
            &mdash; Jon (@JonSnyderHQ){" "}
            <a href="https://twitter.com/JonSnyderHQ/status/1996968241688653892?ref_src=twsrc%5Etfw">December 5, 2025</a>
          </blockquote>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 text-left"
        >
          {[
            {
              title: "Runtime Magic",
              desc: "factiii/core ingests your Prisma folder and auto-extends auth.",
            },
            {
              title: "Instant Scaffold",
              desc: "npx @factiii/stack generates a pre-wired T3 app in seconds.",
            },
            {
              title: "Modular Power",
              desc: "Code-only adapters handle integrations—from OpenAI to Next.js.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm"
            >
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
