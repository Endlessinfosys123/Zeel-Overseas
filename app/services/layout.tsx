import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | Study, Work & PR Visa Consultancy – Zeel Overseas",
  description: "Explore Zeel Overseas' full range of visa and immigration services — study visas, work permits, PR pathways, business & tourist visas, and complete documentation support.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
