import { Adapters } from "@/components/sections/adapters";
import { CTA } from "@/components/sections/cta";
import { Features } from "@/components/sections/features";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Proof } from "@/components/sections/proof";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <Features />
      <HowItWorks />
      <Adapters />
      {/* <Proof /> */}
      <CTA />
      <Footer />
    </main>
  );
}
