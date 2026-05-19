/**
 * Mapping from content IDs to icon names used by the Icon component.
 * Keeps content collections clean (no icon field) while still allowing
 * pages to render a relevant icon per item.
 */

export const SERVICE_ICONS: Record<string, string> = {
  "cloud-platforms": "cloud",
  "application-modernization": "modernization",
  "end-to-end-security": "security",
  "operations": "operations",
};

export const INDUSTRY_ICONS: Record<string, string> = {
  "banking-financial-services": "bank",
  "insurance": "umbrella",
  "healthcare": "compliance",
  "telecom": "telecom",
  "manufacturing": "operations",
  "energy": "chip",
  "public-sector": "government",
  "development-sector": "globe",
  "defense": "defense",
};

export const PRACTICE_ICONS: Record<string, string> = {
  security: "security",
  ai: "ai",
  data: "data",
};

export const PARTNER_CATEGORY_ICONS: Record<string, string> = {
  Platform: "cloud",
  "AI / GPU": "chip",
  "Networking / Security": "network",
  "Platform / Security": "security",
  "Identity / Integration": "identity",
  Identity: "identity",
  Cloud: "cloud",
  Observability: "observability",
  Integration: "workflow",
  Workflow: "workflow",
};

export const PHASE_ICONS: Record<string, string> = {
  "01": "magnifier",
  "02": "design",
  "03": "rocket",
  "04": "operate",
  "05": "handover",
};

export const TAB_ICONS: Record<string, string> = {
  // security tabs
  overview: "globe",
  soc: "observability",
  vapt: "magnifier",
  network: "network",
  iam: "identity",
  appsec: "security",
  compliance: "compliance",
  // ai tabs
  strategy: "design",
  platforms: "cloud",
  inference: "chip",
  rag: "ai-model",
  mlops: "workflow",
  governance: "compliance",
  // data tabs
  streaming: "workflow",
  analytics: "observability",
  aidata: "ai-model",
};
