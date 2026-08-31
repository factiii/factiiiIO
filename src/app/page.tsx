import { CTA } from "@/components/sections/cta";
import { Features } from "@/components/sections/features";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Runner } from "@/components/sections/runner";
import { Status } from "@/components/sections/status";
import { UsedBy } from "@/components/sections/used-by";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <UsedBy />
      <Features />
      <HowItWorks />
      <Runner />
      <Status />
      <CTA />
      <Footer />
    </main>
  );
}
