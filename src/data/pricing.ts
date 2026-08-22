/**
 * Pricing / packages configuration.
 * Edit anything here to update the Pricing section — no component changes needed.
 */

export type PricingPlan = {
  name: string;
  description: string;
  /** Audience this package is best suited for. */
  audience: string;
  price: string;
  priceNote: string;
  /** Leave empty for no badge. Use "MOST POPULAR" to highlight a plan. */
  badge: string;
  features: string[];
  buttonText: string;
};

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    description: "Basic professional portfolio website",
    audience:
      "For students, developers and individuals who need a professional portfolio website.",
    price: "₹2,999",
    priceNote: "Starting from",
    badge: "",
    features: [
      "Modern responsive design",
      "Up to 5 sections",
      "Mobile responsive",
      "Smooth scroll animations",
      "Contact form",
      "Social media links",
      "Basic SEO setup",
      "Deployment assistance",
    ],
    buttonText: "Get Started",
  },
  {
    name: "Professional",
    description: "Premium business website",
    audience:
      "For freelancers, professionals, small businesses and startups.",
    price: "₹5,999",
    priceNote: "Starting from",
    badge: "MOST POPULAR",
    features: [
      "Everything in Starter",
      "Up to 8–10 sections",
      "Premium modern UI",
      "Custom animations",
      "Contact form",
      "WhatsApp / contact integration",
      "SEO-friendly structure",
      "Google Maps integration if required",
      "Deployment",
      "Basic performance optimization",
    ],
    buttonText: "Choose Professional",
  },
  {
    name: "Advanced",
    description: "Complete full-stack web application",
    audience: "For clients who need a complete web application.",
    price: "₹12,999",
    priceNote: "Starting from",
    badge: "",
    features: [
      "Custom frontend",
      "Backend development",
      "REST API",
      "Database integration",
      "Authentication",
      "Admin dashboard if required",
      "MongoDB / MySQL",
      "Responsive design",
      "Deployment",
      "Basic security practices",
      "Performance optimization",
    ],
    buttonText: "Discuss Your Project",
  },
];
