import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Services } from "@/components/Services";
import { Pricing } from "@/components/Pricing";
import { HowIWork } from "@/components/HowIWork";
import { CaseStudies } from "@/components/CaseStudies";
import { FAQ } from "@/components/FAQ";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { BackToTop, CustomCursor, ScrollProgress } from "@/components/ScrollUtilities";

const title = "Devender Singh | Full Stack Web Developer";
const description =
  "Portfolio of Devender Singh — Full Stack Web Developer building modern web applications with JavaScript, Node.js, Express.js, MongoDB and MySQL.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Devender Singh",
          jobTitle: "Full Stack Web Developer",
          email: "mailto:singhdevender0079@gmail.com",
          address: { "@type": "PostalAddress", addressLocality: "Jaipur", addressCountry: "IN" },
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "Global Institute of Technology, Jaipur",
          },
          knowsAbout: [
            "JavaScript",
            "Node.js",
            "Express.js",
            "MongoDB",
            "MySQL",
            "Full Stack Development",
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Services />
        <Pricing />
        <HowIWork />
        <Projects />
        <CaseStudies />
        <Experience />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
