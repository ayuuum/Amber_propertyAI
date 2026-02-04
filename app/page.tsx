import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { Numbers } from "@/components/sections/Numbers";
import { Features } from "@/components/sections/Features";
import { Flow } from "@/components/sections/Flow";
import { Target } from "@/components/sections/Target";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <Numbers />
      <Features />
      <Flow />
      <Target />
      <FAQ />
      <CTA demoPhoneNumber={process.env.NEXT_PUBLIC_DEMO_PHONE_NUMBER} />
    </>
  );
}
